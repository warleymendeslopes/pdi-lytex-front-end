import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    login(data:Object): Observable<any> {
        return this.http.post('https://warleypdi.herokuapp.com/auth/login',data);
    }
}
