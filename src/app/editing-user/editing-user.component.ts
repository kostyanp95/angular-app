import { 
  Component, 
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
import { User } from '../app.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-editing-user',
  templateUrl: './editing-user.component.html',
  styleUrls: ['./editing-user.component.scss']
})

export class EditingUserComponent implements OnInit {

  @Output() onEdit: EventEmitter<User> = new EventEmitter<User>()

  changeForm: FormGroup

  ngOnInit() { 
    this.changeForm = new FormGroup ({ 
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

  changeUser() {
    if (this.changeForm.valid) {
      console.log('Form submited: ', this.changeForm)
      const edittUser = {...this.changeForm.value}
      console.log('New User Created: ', edittUser)  
      this.onEdit.emit(edittUser)
      this.changeForm.reset()
      this.changeForm.setValue({
        email: '',
        first_name: '',
        last_name: '',
        avatar: 'https://avatars2.githubusercontent.com/u/51831069?s=460&v=4://'
      })
      $('#changeModal').modal('hide')
    }
  }  
}
