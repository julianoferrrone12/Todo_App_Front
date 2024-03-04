import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  createUser(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, userData);
  }

  loginUser(userData: any) { 
    return this.http.post<any>(`${this.apiUrl}/auth/login`, userData);
  }

  logoutUser() {
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {});
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
