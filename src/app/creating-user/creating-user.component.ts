import { 
  Component, 
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
import { User } from '../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-creating-user',
  templateUrl: './creating-user.component.html',
  styleUrls: ['./creating-user.component.scss']
})

export class CreatingUserComponent implements OnInit {

  @Output() onAdd: EventEmitter<User> = new EventEmitter<User>()

  creatingForm: FormGroup

  ngOnInit() { 
    this.creatingForm = new FormGroup ({ 
      email: new FormControl('', [
        Validators.email, 
        Validators.required ]),
      first_name: new FormControl('', [
        Validators.required ]),
      last_name: new FormControl('', [
        Validators.required
      ]),
      avatar: new FormControl('https://avatars2.githubusercontent.com/u/51831069?s=460&v=4://')
    })
  }

  addUser() {
    if (this.creatingForm.valid) {     
      console.log('Form submited: ', this.creatingForm)
      const newUser = {...this.creatingForm.value}          
      console.log('New User Created: ', newUser)  
      this.onAdd.emit(newUser)
      this.creatingForm.reset()
      this.creatingForm.setValue({
        email: '',
        first_name: '',
        last_name: '',
        avatar: 'https://avatars2.githubusercontent.com/u/51831069?s=460&v=4://'
      })
      $('#createModal').modal('hide')
    }
  }
}