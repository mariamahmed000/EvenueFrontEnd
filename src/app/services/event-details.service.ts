import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BadgeService } from './badge.service';

@Injectable({
  providedIn: 'root',
})
export class EventDetailsService {
  reservationDetails: any = [];

  getReservationDetails() {
    return this.reservationDetails;
  }

  constructor(private httpClient: HttpClient,private badgeService: BadgeService) {}

  addReservation(reservation: any) {
    this.reservationDetails.push(reservation);

  }

  getEventDetails(id: string) {
    return this.httpClient.get(`http://localhost:7005/events/${id}`);
  }
 clearCart(){
  this.reservationDetails = [];
 }
}
