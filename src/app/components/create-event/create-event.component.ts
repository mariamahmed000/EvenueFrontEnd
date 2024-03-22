import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEventService } from '../../services/create-event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent implements OnInit {
  emailErrorMessage: string = '';
  @ViewChild('link')
  link?: ElementRef;
  @ViewChild('inst')
  inst?: ElementRef;
  @ViewChild('totalTickets')
  totalTickets?: ElementRef;
  @ViewChild('price')
  price?: ElementRef;
  @ViewChild('reservedTicket')
  reservedTicket?: ElementRef;
  @ViewChild('ticketType')
  ticketType?: ElementRef;
  tickets?: {
    type?: string;
    totalTickets?: number;
    reserved?: number;
    price?: number;
  }[] = [];
  showTicketInfo: boolean = false;
  type: string[] = ['Regular', 'Vip', 'Gold'];
  @ViewChild('start')
  start?: ElementRef;
  @ViewChild('end')
  end?: ElementRef;
  @ViewChild('date')
  date?: ElementRef;
  eventTime?: {
    date?: string;
    times?: { start?: number; end?: number }[];
  }[] = [];
  timeRange: { start?: number; end?: number }[] = [];
  user: any;
  facilities: string[] = [];
  instructions: string[] = [];
  registerForm!: FormGroup;
  image: any;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      organizer: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      facilities: new FormControl([]),
      instructions: new FormControl([]),
      dates: new FormControl([]),
      tickets: new FormControl([]),
      image: new FormControl(null),
    });
  }
  submitForm(data: any) {
    console.log('dataa', data.value);
    data.controls.dates.setValue(this.eventTime);
    data.controls.tickets.setValue(this.tickets);
    data.controls.facilities.setValue(this.facilities);
    data.controls.instructions.setValue(this.instructions);
    const formData = new FormData();
    console.log('image', this.image);
    formData.append('image', this.image);
    formData.append('title', data.get('title').value);
    formData.append('location', data.get('location').value);
    this.facilities.forEach((value: string) => {
      formData.append('facilities[]', value);
    });
    this.instructions.forEach((value: string) => {
      formData.append('instructions[]', value);
    });
    this.eventTime?.forEach((dateEntry, outerIndex) => {
      if (dateEntry.date) {
        formData.append(`dates[${outerIndex}][date]`, dateEntry.date);
      }
      if (dateEntry.times && dateEntry.times.length > 0) {
        dateEntry.times.forEach((time, innerIndex) => { // Using 'innerIndex' for the inner loop
          if (time.start !== undefined && time.end !== undefined) {
            formData.append(
              `dates[${outerIndex}][times][${innerIndex}][start]`, // Using both 'outerIndex' and 'innerIndex'
              time.start.toString()
            );
            formData.append(
              `dates[${outerIndex}][times][${innerIndex}][end]`, // Using both 'outerIndex' and 'innerIndex'
              time.end.toString()
            );
          }
        });
      }
    });

    // this.eventTime?.forEach((dateEntry, index) => {
    //   if (dateEntry.date) {
    //     formData.append(`dates[${index}][date]`, dateEntry.date);
    //   }
    //   if (dateEntry.times && dateEntry.times.length > 0) {
    //     dateEntry.times.forEach((time, index) => {
    //       if (time.start !== undefined && time.end !== undefined) {
    //         formData.append(
    //           `dates[${index}][times][${index}][start]`,
    //           time.start.toString()
    //         );
    //         formData.append(
    //           `dates[${index}][times][${index}][end]`,
    //           time.end.toString()
    //         );
    //       }
    //     });
    //   }

    // });
    this.tickets?.forEach((ticket, index) => {
      if (ticket.type) {
        formData.append(`tickets[${index}][type]`, ticket.type);
      }
      if (ticket.totalTickets !== undefined) {
        formData.append(
          `tickets[${index}][totalTickets]`,
          ticket.totalTickets.toString()
        );
      }
      if (ticket.reserved !== undefined) {
        formData.append(
          `tickets[${index}][reserved]`,
          ticket.reserved.toString()
        );
      }
      if (ticket.price !== undefined) {
        formData.append(`tickets[${index}][price]`, ticket.price.toString());
      }
    });
    formData.append('organizer', data.get('organizer').value);
    formData.append('Description', data.get('Description').value);
    console.log('form data', formData.get('tickets[][]'));
    console.log('form data', formData.get('dates[]'));
    this._CreateEventService.addEvent(formData).subscribe({
      next: (res: any) => {
        console.log('result from api', res);
        if (res.message == 'success') {
          console.log('success');
        } else {
          this.emailErrorMessage = res.message;
        }
      },
    });
   // this.toastr.success('Form submitted successfully!', 'Success');
   this._Router.navigate(['/events']);
  }

  constructor(
    private _Router: Router,
    private _CreateEventService: CreateEventService,

  ) {}

  AddFacility() {
    let link = '';
    link = this.link?.nativeElement.value;
    console.log(link);
    this.facilities?.push(link);
    console.log('profile links', this.facilities);
  }
  removeFacility(index: number) {
    this.facilities.splice(index, 1);
    // console.log(this.user.facilities);
  }
  AddInstruction() {
    let inst = '';
    inst = this.inst?.nativeElement.value;
    console.log(inst);
    this.instructions?.push(inst);
    console.log('instructions', this.instructions);
  }
  removeInstruction(index: number) {
    this.instructions.splice(index, 1);
    // console.log(this.user.instructions);
  }
  remove(index: number) {
    // this.user.time_range.splice(index,1);
    // this.user.time_range.splice(index,1);
    // console.log(this.user.time_range);
  }
  removeTimeRange(index: number) {
    this.timeRange.splice(index, 1);
  }
  removeEvent(index: number) {
    this.eventTime?.splice(index, 1);
  }
  removeTicket(index: number) {
    this.tickets?.splice(index, 1);
  }
  addTimeRange() {
    const startValue = this.start?.nativeElement.value;
    const endValue = this.end?.nativeElement.value;
    if (startValue && endValue) {
      this.timeRange.push({ start: startValue, end: endValue });
      if (
        this.start &&
        this.start.nativeElement &&
        this.end &&
        this.end.nativeElement
      ) {
        this.start.nativeElement.value = '';
        this.end.nativeElement.value = '';
      } else {
        console.error('Cannot access start or end elements.');
      }
    } else {
      console.error('Please fill in start and end time.');
    }
  }
  AddTicket() {
    console.log(this.price?.nativeElement.value);
    console.log(this.reservedTicket?.nativeElement.value);
    console.log(this.totalTickets?.nativeElement.value);
    console.log(this.ticketType?.nativeElement.value);
    const price = this.price?.nativeElement.value;
    const totalTickets = this.totalTickets?.nativeElement.value;
    const reservedTicket = this.reservedTicket?.nativeElement.value;
    const ticketType = this.ticketType?.nativeElement.value;

    this.tickets?.push({
      type: ticketType,
      price: price,
      totalTickets: totalTickets,
      reserved: reservedTicket,
    });
    console.log('my tickets', this.tickets);
  }
  Add() {
    console.log(this.timeRange);
    var element: any;
    const dateValue = this.date?.nativeElement.value;
    const startValue = this.start?.nativeElement.value;
    const endValue = this.end?.nativeElement.value;
    if ((dateValue && startValue && endValue) || this.timeRange.length != 0) {
      if (!startValue && !endValue && this.timeRange.length != 0) {
        element = {
          date: dateValue,
          times: [...this.timeRange],
        };
      } else if (startValue && endValue && this.timeRange.length != 0) {
        this.timeRange.push({ start: startValue, end: endValue });
        element = {
          date: dateValue,
          times: [...this.timeRange],
        };
      } else if (startValue && endValue && this.timeRange.length == 0) {
        element = {
          date: dateValue,
          times: [
            {
              start: startValue,
              end: endValue,
            },
          ],
        };
      }
      console.log(element);
      this.eventTime?.push(element);
      console.log('timeeeeeeeeeeeeeeeee', this.eventTime);
      this.timeRange = [];
    } else {
      console.error('Please fill in all fields.');
    }
  }

  toggleTicketInfo() {
    this.showTicketInfo = !!this.ticketType?.nativeElement.value; // Check if any option is selected
  }
  onImageFileSelected(event: any) {
    this.image = event.target.files[0];
  }
}
