import { 
  Component, 
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})

export class AuthUserComponent implements OnInit {

  constructor() { }

  @Output() onAuth: EventEmitter<Object> = new EventEmitter<Object>()

  loginForm: FormGroup

  ngOnInit() { 
    this.loginForm = new FormGroup ({ 
      email: new FormControl('eve.holt@reqres.in', [
        Validators.email, 
        Validators.required ]),
      password: new FormControl('cityslicka', [
        Validators.required ])
    })
  }

  loginUser() {
    if (this.loginForm.valid) {     
      console.log('Form submited: ', this.loginForm)
      const authUser = {...this.loginForm.value}          
      console.log('User Login Sent To App.Component ', authUser)  
      this.onAuth.emit(authUser)
      this.loginForm.reset()
      this.loginForm.setValue({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      })
      $('#loginModal').modal('hide')
    }
  }  

}
