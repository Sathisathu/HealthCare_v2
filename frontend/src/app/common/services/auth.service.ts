import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private currentUserSubject = new BehaviorSubject<any>(null);
    private isInitializedSubject = new BehaviorSubject<boolean>(false);
    public currentUser$ = this.currentUserSubject.asObservable();
    public isInitialized$ = this.isInitializedSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.checkSession();
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap(user => {
                this.currentUserSubject.next(user);
            })
        );
    }

    logout(): void {
        this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
            this.currentUserSubject.next(null);
            this.router.navigate(['/login']);
        });
    }

    public checkSession(): void {
        this.http.get(`${this.apiUrl}/me`).subscribe({
            next: (user) => {
                this.currentUserSubject.next(user);
                this.isInitializedSubject.next(true);
            },
            error: () => {
                this.currentUserSubject.next(null);
                this.isInitializedSubject.next(true);
            }
        });
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    get currentUserValue() {
        return this.currentUserSubject.value;
    }
}
