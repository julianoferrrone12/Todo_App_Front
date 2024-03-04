import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';



@Component({
  selector: 'app-form-login',
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: UserService, private router: Router) {}

  get f(){
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (formData.email && formData.password) {
        const user = {
          email: formData.email,
          password: formData.password
        };
    
        this.authService.loginUser(user).subscribe(
          response => {
            console.log('User logged in successfully:', response);
            localStorage.setItem('token', response.user_logged.access_token)
            console.log('Is logged in:', this.authService.loggedIn());
            this.router.navigateByUrl('/task-list');
          },
          error => {
            console.error('Error logging in:', error);
          }
        );
      } else {
        console.error('Email or password is null or undefined');
      }
    }
  }
}
