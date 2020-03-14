import {Component, OnInit, Output, EventEmitter} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {delay} from 'rxjs/operators'
declare var $: any

export interface User {
  id?: number
  email: string
  first_name: string
  last_name: string
  avatar?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  users: User[] = []
  loading: boolean = false
  editId: number
  checkAuth: boolean = true

  time: number
  id: number
  status: string

  constructor(private http: HttpClient) { }

  observableTimer(observable, callback) {
    this.time = Date.now()
    observable.subscribe(response => {
      this.time = (Date.now() - this.time) / 1000
      callback(response, this.time)
    })
  }

  ngOnInit() {
    this.loading = true
    this.observableTimer(
      this.http.get('https://reqres.in/api/users')
        .pipe(delay(2000)),
      (response, time) => {
        this.status = 'The table of users is received'
        this.users = response.data
        this.loading = false
        this.showToasts(time, this.status)
      }
    )
  }

  addUser(newUser: User) {
    console.log('New User Get: ', newUser)
    this.observableTimer(
      this.http.post<Object>('https://reqres.in/api/users', newUser),
      (user, time) => {
        this.users.unshift(user)
        this.status = `New user with id ${user.id} added`
        this.showToasts(time, status)
      }
    )
  }

  changeActiveUser(id: number) {
    this.editId = id
    this.status = `CuThe current user with the id ${id}`
    this.showToasts(this.time, status)
  }

  editActiveUser(editUser: User) {
    this.editUser(editUser, this.editId)
    console.log(`Edit active user`, editUser, this.editId)
  }

  editUser(editUser: User, id:number) {
    let usersIndex: number
    console.log('Users: ', this.users)
    this.users.forEach((u, index) => {
      if (u.id == id) {
        usersIndex = index
      }
    })

    console.log('EditUser Get: ', editUser)

    let modifiedUser = this.users[usersIndex]
    modifiedUser.email = editUser.email
    modifiedUser.first_name = editUser.first_name
    modifiedUser.last_name = editUser.last_name
    modifiedUser.avatar = editUser.avatar

    console.log('User a Changed: ', modifiedUser)

    this.observableTimer(
      this.http.put<User>(`https://reqres.in/api/users/${id}`, modifiedUser),
      (response, time) => {
        this.users[usersIndex] = response
        console.log('Edited user ', modifiedUser)
        this.status = `The user with id ${id} changed`
        this.showToasts(time, status)
      }
    )
  }

  removeUser(id: number) {
    this.observableTimer(
      this.http.delete<void>(`https://reqres.in/api/users/${id}`),
      (response, time) => {
        this.users = this.users.filter( u => u.id !== id)
        this.status = `The user id ${id} deleted`
        this.showToasts(time, status)
      }
    )
  }

  loginUser(authUser: User) {
    console.log('User Login Get: ', authUser)
    this.checkAuth = true
    this.observableTimer(
      this.http.post<Object>('https://reqres.in/api/login', authUser),
      (response, time) => {
       console.log('Get Response: ', response, `in ${time}ms`)
       if (response.token != '') {
          this.checkAuth = false
          this.status = 'Authentication passed!'
          this.showToasts(time, status)
        }
      }
    )
  }

  logoutUser() {
    this.checkAuth = true
    this.status = 'You are logout...'
    this.time = 0
    $('.toast').toast('show')
  }

  showToasts(time: number, status: string) {
    // $('.toast').on('show.bs.toast', function () {
    // })
    $('.toast').toast('show')
  }

  // ifLogout() {
  //   this.status = 'Please, login in system.'
  // $('.toast').toast('show')
  // }

}
