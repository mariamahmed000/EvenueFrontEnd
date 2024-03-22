import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _HttpClient: HttpClient) { }
  getEvents(): Observable<any> {
    return this._HttpClient.get('http://localhost:7005/events')
  }
  getEventByname(name: string): Observable<any> {
    return this._HttpClient.get(`http://localhost:7005/events/getname/${name}`)
  }
  getOneEvents(id: Number): Observable<any> {
    return this._HttpClient.get(`http://localhost:7005/events/${id}`)
  }
  deleteEvents(id: Number): Observable<any> {
    return this._HttpClient.delete(`http://localhost:7005/events/${id}`)
  }
  updateEvents(id: Number, data: any): Observable<any> {
    return this._HttpClient.put(`http://localhost:7005/events/${id}`, data);
  }
  getImageUrl(filename: any):string {

    return `http://localhost:7005/uploads/${filename}`;
  }
}
