import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../interface/event';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-next-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-next-events.component.html',
  styleUrl: './our-next-events.component.css',
})
export class OurNextEventsComponent implements OnInit {
  eventPage: Event[] = [];
  imageName: any;
  imageUrl?: string;
  min: any[] = [];
  constructor(private router: Router, private EventModel: EventService) {}

  ngOnInit(): void {
    this.EventModel.getEvents().subscribe({
      next: (res: any) => {
        if (res.message == 'success' && res.data) {
          this.eventPage = res.data;
          let lengthOfEvent = this.eventPage.length;
          this.eventPage = this.eventPage.splice(0, 3);
          this.getData();
        } else {
          console.log("Can't fetch API or data is undefined");
        }
      },
    });
  }

  getData() {
    this.eventPage.forEach((event) => {
      if (event.image) {
        this.imageName = event?.image;
        this.imageUrl = this.EventModel.getImageUrl(this.imageName);

        event.image = this.imageUrl;
      }
      // console.log(this.imageName,"this.imageName");

      if (event.dates && event.dates.length > 0) {
        let mindate = event.dates[0].date;

        event.dates.forEach((dat) => {
          // Check if dat.date is defined
          if (dat.date) {
            // console.log(dat.date);

            // Check if dat.date is smaller than mindate
            if (mindate && dat.date < mindate) {
              mindate = dat.date;
            }
          }
        });
        this.min.push(mindate);
      }
    });
  }

  Viewmore(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
}
