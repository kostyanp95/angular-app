import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {delay} from 'rxjs/operators'

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

  constructor(private http: HttpClient) { }
  
  observableTimer(observable, callback) {
    let time = Date.now()
    observable.subscribe(response => {
      time = Date.now() - time
      callback(response, time)
    })
  }

  ngOnInit() {
    this.loading = true
    this.observableTimer(
      this.http.get('https://reqres.in/api/users')
        .pipe(delay(2000)),
      (response, time) => {
        console.log('Response get in ', `${time}ms`, response)
        this.users = response.data
        this.loading = false
      }
    )
  }

  addUser(newUser: User) {
    console.log('New User Get: ', newUser)
    this.observableTimer(
      this.http.post<Object>('https://reqres.in/api/users', newUser),
      (user, time) => {
        this.users.unshift(user)
        console.log('Added in ',`${time}ms`, 'a new user', user)
      }
    )
  }

  changeActiveUser(id: number) {
    this.editId = id    
    console.log(`Active user ${id}`)
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
        console.log('Edited user ', modifiedUser, `in ${time}ms`)
      }
    )
  }

  removeUser(id: number) {
    this.observableTimer(
      this.http.delete<void>(`https://reqres.in/api/users/${id}`),
      (response, time) => {
        this.users = this.users.filter( u => u.id !== id)
        console.log(`Deleted in ${time}ms user id ${id}`)
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
          console.log(`Check Auth Complete! In ${time}ms`)
          this.checkAuth = false
        }
      }
    )
  }
  
  logoutUser() {
    this.checkAuth = true
    console.log('Logout User, checkAuth = ', this.checkAuth)
  }

}