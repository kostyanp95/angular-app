import { 
  Component, 
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
import { User } from '../app.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-creating-user',
  templateUrl: './creating-user.component.html',
  styleUrls: ['./creating-user.component.scss']
})

export class CreatingUserComponent implements OnInit {
  
  @Output() onAdd: EventEmitter<User> = new EventEmitter<User>()

  userEmail = ''
  userFirstName = ''
  userLastName = ''

  ngOnInit() { 

  }  

  addUser() {
    if (this.userFirstName.trim() && this.userLastName.trim() && this.userEmail.trim()) {
      const newUser: User = {  
        id: 0,    
        email: this.userEmail,
        first_name: this.userFirstName,
        last_name: this.userLastName,
        avatar: ''
      }
    
      console.log('New User Created: ', newUser)

      this.onAdd.emit(newUser)
      this.userEmail = this.userFirstName = this.userLastName = ''
    }
  }

  // submit() {

  // }
}
