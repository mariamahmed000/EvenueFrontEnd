import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  constructor(private _HttpClient: HttpClient) { }
  getEvents(): Observable<any> {
    return this._HttpClient.get('http://localhost:7005/events')
  }
  getAllReservations(): Observable<any> {
    return this._HttpClient.get('http://localhost:7005/reservations');
  }
  getAllUsers():Observable<any>{
    return this._HttpClient.get('http://localhost:7005/users')
  }

  // getEventByname(name: string): Observable<any> {
  //   return this._HttpClient.get(`http://localhost:7005/events/getname/${name}`)
  // }
  getOneEvents(id: Number): Observable<any> {
    return this._HttpClient.get(`http://localhost:7005/events/${id}`)
  }
  deleteUser(id: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:7005/users/${id}`)
  }
  deleteEvent(id: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:7005/events/${id}`)
  }
  // updateEvents(id: Number, data: any): Observable<any> {
  //   return this._HttpClient.put(`http://localhost:7005/events/${id}`, data);
  // }
}
