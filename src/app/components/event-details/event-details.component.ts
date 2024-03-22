import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EventDetailsService } from '../../services/event-details.service';
import { MyEvent } from '../../interfaces/my-event';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket } from '../../interface/event';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { BadgeService } from '../../services/badge.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  @ViewChild('container') containerRef?: ElementRef;
  myEvent: any;
  selectedDate: any;
  ticketsInfo: any;

  title: string = '';
  imageName: string = '';
  imageUrl: string = '';
  hasaphoto: boolean = false;
  description: string = '';
  location: string = '';
  dates: any;
  facilities: string[] = [];
  organizer: string = '';
  instructions: string[] = [];

  firstDate = {};

  allTickets: Ticket[] = [];

  AvailableRegularTickets = 0;
  AvailableGoldTickets = 0;
  AvailableVipTickets = 0;

  ReservedRegularTickets: number = 0;
  ReservedGoldTickets: number = 0;
  ReservedVipTickets: number = 0;

  regularPrice: number = 0;
  goldPrice: number = 0;
  VipPrice: number = 0;

  ID = '0';
  email?:string=''
  feedback?:string=''

  constructor(
    private detailsService: EventDetailsService,
    private myActivate: ActivatedRoute,
    private EventModel: EventService,
    private badgeService : BadgeService,
    private _Router:Router
    // private myActivate: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    this.ID = this.myActivate.snapshot.params['id'];
    this.detailsService.getEventDetails(this.ID).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.myEvent = data.data;
        this.title = this.myEvent.title;
        // this.imageName = this.myEvent.image;
        this.imageName = this.EventModel.getImageUrl(this.myEvent.image);
        this.description = this.myEvent.Description;
        this.location = this.myEvent.location;
        this.dates = this.myEvent.dates;
        this.firstDate = this.dates[0].date;
        this.facilities = this.myEvent.facilities;
        this.organizer = this.myEvent.organizer;
        this.instructions = this.myEvent.instructions;
        this.allTickets = this.myEvent.tickets;
        console.log(this.allTickets);
        for (let i = 0; i < this.allTickets.length; i++) {
          if (
            this.allTickets[i].type == 'regular' ||
            this.allTickets[i].type == 'Regular'
          ) {
            this.AvailableRegularTickets = this.allTickets[i].totalTickets;
            this.regularPrice = this.allTickets[i].price;
          }
          if (
            this.allTickets[i].type == 'gold' ||
            this.allTickets[i].type == 'Gold'
          ) {
            this.AvailableGoldTickets = this.allTickets[i].totalTickets;
            this.goldPrice = this.allTickets[i].price;
          }
          if (
            this.allTickets[i].type == 'vip' ||
            this.allTickets[i].type == 'Vip'
          ) {
            this.AvailableVipTickets = this.allTickets[i].totalTickets;
            this.VipPrice = this.allTickets[i].price;
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.resetScroll();
  }

  addRegular() {
    if (this.ReservedRegularTickets < this.AvailableRegularTickets)
      this.ReservedRegularTickets++;
  }

  minusRegular() {
    if (this.ReservedRegularTickets > 0) {
      this.ReservedRegularTickets--;
    }
  }

  addGold() {
    if (this.ReservedGoldTickets < this.AvailableGoldTickets)
      this.ReservedGoldTickets++;
  }

  minusGold() {
    if (this.ReservedGoldTickets > 0) {
      this.ReservedGoldTickets--;
    }
  }

  addVip() {
    if (this.ReservedVipTickets < this.AvailableVipTickets)
      this.ReservedVipTickets++;
  }

  minusVip() {
    if (this.ReservedVipTickets > 0) {
      this.ReservedVipTickets--;
    }
  }

  addToCart() {
    let loggedIn=localStorage.getItem('userId');
    if(loggedIn!=null){
      let tickets = [];

    if (this.ReservedRegularTickets > 0) {
      tickets.push({
        type: 'regular',
        quantity: this.ReservedRegularTickets,
        SingleTicketPrice: this.regularPrice,
        price: this.regularPrice * this.ReservedRegularTickets,
      });
    }
    if (this.ReservedGoldTickets > 0) {
      tickets.push({
        type: 'gold',
        quantity: this.ReservedGoldTickets,
        SingleTicketPrice: this.goldPrice,
        price: this.goldPrice * this.ReservedGoldTickets,
      });
    }
    if (this.ReservedVipTickets > 0) {
      tickets.push({
        type: 'vip',
        quantity: this.ReservedVipTickets,
        SingleTicketPrice: this.VipPrice,
        price: this.VipPrice * this.ReservedVipTickets,
      });
    }
    const reservation = {
      eventID: this.ID,
      title: this.title,
      location: this.location,
      tickets,
      dateTime: {
        day: this.selectedDate.date,
        start: this.selectedDate.start,
        end: this.selectedDate.end,
      },
    };
    this.detailsService.reservationDetails.push(reservation);
    this.badgeService.incrementCartItemCount();
    console.log(this.detailsService.getReservationDetails());

    }
    else{
      this._Router.navigate(['/login'])
    }
    
  }

  resetScroll() {
    window.scrollTo(0, 0);
  }

}
