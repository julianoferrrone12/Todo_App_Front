import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormSignComponent } from './form-sign/form-sign.component';
import { FormsModule } from '@angular/forms';
import { FormLoginComponent } from './form-login/form-login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormSignComponent, FormLoginComponent, FormsModule, TodoListComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';

  
}
