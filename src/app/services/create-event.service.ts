import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEvent } from '../interfaces/my-event';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private _HttpClient:HttpClient) { }
  addEvent(data:any):Observable<any>{
    return this._HttpClient.post('http://localhost:7005/events/add',data)
  }
}
