import { Component, AfterViewInit } from '@angular/core';
import { EventsPartnersComponent } from '../events-partners/events-partners.component';
import { RouterModule } from '@angular/router';

// import Swiper from 'swiper';

// Configure Swiper to use modules
// Swiper.use([Navigation, Pagination]);
@Component({
  selector: 'app-regional-events',
  standalone: true,
  imports: [EventsPartnersComponent, RouterModule],
  templateUrl: './regional-events.component.html',
  styles: ['./regional-events.component.css'],
})
export class RegionalEventsComponent {
  slides = Array.from({ length: 5 }, (v, k) => k + 1);

  constructor() {}

  // ngAfterViewInit(): void {
  //   const swiper = new Swiper('.swiper-container', {
  //     // Swiper options
  //     loop: true,
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //   });
  // }
}
