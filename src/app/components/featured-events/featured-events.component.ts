import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../interface/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-events.component.html',
  styleUrl: './featured-events.component.css',
})
export class FeaturedEventsComponent implements OnInit {
  eventPage: Event[] = [];
  imageName: any;
  imageUrl?: string;
  // events: Event[];

  constructor(private router: Router, private EventModel: EventService) {
    // imageForm :FormGroup = new FormGroup({image:new FormControl(null)})
  }
  ngOnInit(): void {
    this.EventModel.getEvents().subscribe({
      next: (res: any) => {
        if (res.message == 'success' && res.data) {
          this.eventPage = res.data;
          let lengthOfEvent = this.eventPage.length;
          this.eventPage = this.eventPage.splice(
            lengthOfEvent - 5,
            lengthOfEvent
          );

          this.eventPage.forEach((event) => {
            if (event.image) {
              this.imageName = event?.image;
              this.imageUrl = this.EventModel.getImageUrl(this.imageName);

              event.image = this.imageUrl;
            }
          });
        } else {
          console.log("Can't fetch API or data is undefined");
        }
      },
    });
  }
  Viewmore(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
}
