import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FeaturedEventsComponent } from '../featured-events/featured-events.component';
import { OurNextEventsComponent } from '../our-next-events/our-next-events.component';
import { RegionalEventsComponent } from '../regional-events/regional-events.component';
import { EventsPartnersComponent } from '../events-partners/events-partners.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TestimonialsComponent,
    FeaturedEventsComponent,
    OurNextEventsComponent,
    RegionalEventsComponent,
    EventsPartnersComponent,
    CarouselComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  path?: String;
  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.path=this._ActivatedRoute.snapshot.url[0].path;
    // console.log("snapshot",this._ActivatedRoute.snapshot.url[0].path);
  }
}
