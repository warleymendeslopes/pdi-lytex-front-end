import { environment } from './../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient) { }

  async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}/auth/login`, user).toPromise();
    console.log(result)
    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      window.localStorage.setItem('user', JSON.stringify(result));
      return true;
    }
    return false;
  }

  async createUser(user:any){
    const result = await this.http.post<any>(`${environment.api}/users`, user).toPromise();
    if(result){
      return true;
    }
    return result;
  }








  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): any {
    const decoded: any = jwt_decode(token);

     if (decoded.exp === undefined) {
       return null;
     }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
