import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    // Users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/users/${id}`);
    }
}
