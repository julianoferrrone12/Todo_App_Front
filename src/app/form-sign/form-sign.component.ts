import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-form-sign',
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './form-sign.component.html',
  styleUrls: ['./form-sign.component.css']
})
export class FormSignComponent {

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private userService: UserService,) {}

  get f(){
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      
        this.userService.createUser(formData).subscribe(
          response => {
            console.log('User created successfully:', response);
          },
          error => {
            console.error('Error creating user:', error);
          }
        );
    }
  }
}
