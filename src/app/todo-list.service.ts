import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items`);
  }

  updateTask(taskId: number, payload: any): Observable<any> {
    const url = `${this.apiUrl}/item/${taskId}`;
    return this.http.put<any>(url, payload);
  }

  createTask(payload: any): Observable<any> {
    const url = `${this.apiUrl}/item/store`;
    return this.http.post<any>(url, payload);
  }

  editTask(taskId: number, payload: any): Observable<any> {
    const url = `${this.apiUrl}/item/${taskId}`;
    return this.http.put<any>(url, payload);
  }

  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/item/${taskId}`;
    return this.http.delete<any>(url, { responseType: 'text' as 'json' });
  }

}

export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}
