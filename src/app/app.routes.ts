import { Routes } from '@angular/router';
import { FormSignComponent } from './form-sign/form-sign.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: FormSignComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'task-list', component: TodoListComponent, canActivate: [AuthGuard]},
];

