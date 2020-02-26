import { 
  Component, 
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
  import { User } from '../app.component';

@Component({
  selector: 'app-editing-user',
  templateUrl: './editing-user.component.html',
  styleUrls: ['./editing-user.component.scss']
})

export class EditingUserComponent implements OnInit {

  // @Input() user: User
  @Output() onEdit: EventEmitter<User> = new EventEmitter<User>()

  editEmail = ''
  editFirstName = ''
  editLastName = ''

  ngOnInit():void { }

  changeUser() {
    if (this.editFirstName.trim() && this.editLastName.trim() && this.editEmail.trim()) {
      const editUser: User = {
        email: this.editEmail,
        first_name: this.editFirstName,
        last_name: this.editLastName
      }

      console.log('Edited User: ', editUser)

      this.onEdit.emit(editUser)
      this.editEmail = this.editFirstName = this.editLastName = ''      
    }
  }  
}
