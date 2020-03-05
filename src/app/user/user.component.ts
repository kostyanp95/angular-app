import { User } from '../app.component';
import { 
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  
  @Input() user: User
  @Input() checkAuth: boolean
  @Output() onRemove: EventEmitter<number> = new EventEmitter<number>()
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit(): void { }

  ngOnChanges() {
    this.checkAuth = !this.checkAuth
  }

  removeUser() {
    this.onRemove.emit(this.user.id)
    console.log('Remove user ', this.user.id)
  }

  changeActiveUser() {
    this.onEdit.emit(this.user.id)
    console.log('Edited user ', this.user.id)
  }

}
