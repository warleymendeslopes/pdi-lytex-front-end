import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private http: HttpClient) {}

    register(data:Object): Observable<any> {
        return this.http.post('https://warleypdi.herokuapp.com/auth/register',data)
    }
}
