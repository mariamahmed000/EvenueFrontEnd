import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url = 'http://localhost:7005/users';
  constructor(private http: HttpClient, private _Router: Router) {}

  pay(data: any): Observable<any> {
    let id = window.localStorage.getItem('userId');
    console.log("Paymeettt", data);
    return this.http.post('http://localhost:7005/users/' + id + '/res', data);
    
  }
}
