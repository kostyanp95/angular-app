import {Component, OnInit, Input} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {delay} from 'rxjs/operators'
import {FormGroup} from '@angular/forms'

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
  loading = false
  editId: number

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
    console.log(id)

  }

  editActiveUser(editUser: User) {
    this.editUser(editUser, this.editId)
  }

  editUser(editUser: User, id:number) {    
    
    let users_index: number

    this.users.forEach((u, index) => {
      if (u.id == id) {
        users_index = index
      }
    })
    
    let modifiedUser = this.users[users_index]
    modifiedUser.first_name = editUser.first_name
    modifiedUser.last_name = editUser.last_name
    modifiedUser.email = editUser.email

    this.observableTimer(
      this.http.put<User>(`https://reqres.in/api/users/${id}`, modifiedUser),
      (response, time) => {
        this.users[users_index] = response
        console.log(`Edited user id ${response.id} in ${time}ms`)
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

}