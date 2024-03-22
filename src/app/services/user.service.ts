import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';
import { User } from '../components/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static user = new Subject(); //null user if we didnt emit user
  imageName?: string;
  private url = 'http://localhost:7005/users';
  constructor(private http: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token') != null) {
      UserService.user.next(true);
    }
  }
  /////////////////////////////////////
  addUser(data: any) {
    console.log('addUser');

    return this.http.post(this.url + '/add', data);
  }

  sendUser(data: any): Observable<any> {
    return this.http.post<User>('http://localhost:7005/users/login', data).pipe(
      tap((resData) => {
        const user = new User(
          resData.email,
          resData.id,
          resData.role,
          resData.token
        );
        console.log('usserrr fel sservice', user);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        UserService.user.next(true); // emitted loggrd in
        console.log('service', UserService.user);
      })
    );
  }
  static getUser(): User | null | string {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    if (userName) {
      return userName;
    }
    if (userId && userRole) {
      // Create a new User object using the retrieved userId and userRole
      return new User('', userId, userRole, '');
    } else {
      return null;
    }
  }

  // static getUser(): User | null {
  //   const userString = localStorage.getItem('userId');
  //   return userString ? JSON.parse(userString) : null;
  // }

  getReviews(): Observable<any> {
    return this.http.get('http://localhost:7005/users/1/review');
  }
  getImageUrl(filename: any): string {
    return `http://localhost:7005/uploads/${filename}`;
  }

  getOneUser(id: any): Observable<any> {
    return this.http.get(`http://localhost:7005/users/${id}`);
  }

  setReveiw(id: any, data: any): Observable<any> {
    return this.http.post(`http://localhost:7005/users/${id}/review`, data);
  }

  logOut(): void {
    localStorage.clear();
    UserService.user.next(false);
    this._Router.navigate(['/home']);
  }
}
