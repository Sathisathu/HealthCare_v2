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

    // Patients
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/patients`);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/patients/${id}`);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/patients/${id}`, user);
    }
}
