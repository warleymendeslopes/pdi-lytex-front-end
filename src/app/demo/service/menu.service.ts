import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    constructor(private http: HttpClient) {}

    list(filter:Object): Observable<any> {
        return this.http.get('http://localhost:3001/menu');
    }

    create(data: Object): Observable<any> {
        return this.http.post('http://localhost:3001/menu', data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`http://localhost:3001/menu/${id}`);
    }
}
