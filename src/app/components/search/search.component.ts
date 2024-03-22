import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../interface/event';
import { CommonModule } from '@angular/common';
import { count } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchPipe } from '../searchPipe/search.pipe';
import { SearchByPricePipe } from '../searchPipe/searchByPrice/search-by-price.pipe';
import { SearchLocationPipe } from '../searchPipe/searchByLocation/search-location.pipe';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
// import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchPipe,
    SearchByPricePipe,
    SearchLocationPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  events: Event[] = [];
  min: any[] = [];
  name: string = '';
  location: string = '';
  price: string = '';
  img: string = '';
  eventPage: Event[] = [];
  numberOfPage: number = 0;
  numberOfPageArray: number[] = [];
  counter: number = 0;
  lengthOfData: number = 0;
  imageUrl?: string = '';
  hasaphoto?: boolean;
  imageName?: string;

  constructor(
    private router: Router,
    private EventModel: EventService,
    private UserModel: UserService
  ) {
    // imageForm :FormGroup = new FormGroup({image:new FormControl(null)})
  }

  regSearch() {
    this.EventModel.getEventByname(this.name).subscribe({
      next: (res: any) => {
        if (res.message == 'success' && res.data) {
          console.log(res);
          console.log(res._id);
        }
      },
    });
  }
  Viewmore(id: string) {
    // console.log("viewmore", id);
    this.router.navigate([`/details/${id}`]);
  }

  ngOnInit(): void {
    this.EventModel.getEvents().subscribe({
      next: (res: any) => {
        if (res.message == 'success' && res.data) {
          this.eventPage = res.data;
          // console.log("this.eventPage",this.eventPage);

          // this.imageName=this.eventPage[15].image;
          // console.log("this.imageName",this.imageName);
          this.lengthOfData = this.eventPage.length;
          this.numberOfPage = Math.ceil(this.lengthOfData / 7);
          for (let x = 1; x <= this.numberOfPage; x++) {
            this.numberOfPageArray.push(x);
          }

          let i;

          for (i = 0; i < 7; i++) {
            this.events[i] = this.eventPage[i];
          }
          this.counter = i;
          this.getData();
        } else {
          console.log("Can't fetch API or data is undefined");
        }
      },
    });
  }

  nextpage(page: number) {
    let i;
    this.events = [];
    this.counter = 7 * (page - 1);
    this.imageName = '';

    for (i = this.counter; i < 7 + this.counter && i < this.lengthOfData; i++) {
      this.events[i - this.counter] = this.eventPage[i];
    }

    this.getData();

    this.counter = i;
  }

  getData() {
    this.events.forEach((event) => {
      if (event.image) {
        this.imageName = '';
        this.imageName = event?.image;
        this.imageName =
          this.imageName?.split('/')[
            `${this.imageName?.split('/').length - 1}`
          ];

        this.imageUrl = this.EventModel.getImageUrl(this.imageName);

        event.image = this.imageUrl;
      }

      if (event.dates && event.dates.length > 0) {
        let mindate = event.dates[0].date;

        event.dates.forEach((dat) => {
          if (dat.date) {
            if (mindate && dat.date < mindate) {
              mindate = dat.date;
            }
          }
        });
        this.min.push(mindate);
      }
    });
  }

  showPhoto() {
    this.imageUrl = this.EventModel.getImageUrl(this.imageName);
    this.hasaphoto = true;
  }
}
