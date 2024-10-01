import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../core/interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:3000/task';
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTaskById(code: number) {
    return this.http.get<Task>(this.baseUrl + '/' + code);
  }

  updateTask(data: Task) {
    return this.http.put(this.baseUrl + '/' + data.id, data);
  }

  completeTask(data: Task) {
    return this.http.patch(this.baseUrl + '/' + data.id, data);
  }

  createTask(data: Task) {
    return this.http.post(this.baseUrl, data);
  }
}
