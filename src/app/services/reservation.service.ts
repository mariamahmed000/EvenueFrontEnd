import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';
import { User } from '../components/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private url = 'http://localhost:7005/reservations/';
  constructor(private http: HttpClient, private _Router: Router) {}

  getAllReservationByUserId(id: any) {
    return this.http.get(`${this.url}${id}`);
  }
}
