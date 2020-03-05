import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from 'src/app/app.component';
import { CreatingUserComponent } from './creating-user/creating-user.component';
import { UserComponent } from './user/user.component';
import { EditingUserComponent } from './editing-user/editing-user.component';
import { AuthUserComponent } from './auth-user/auth-user.component'

@NgModule({
  declarations: [
    AppComponent,
    CreatingUserComponent,
    UserComponent,
    EditingUserComponent,
    AuthUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
