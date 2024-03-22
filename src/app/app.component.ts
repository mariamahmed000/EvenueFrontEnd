import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatSliderModule } from '@angular/material/slider';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPipe } from './components/searchPipe/search.pipe';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { SearchByPricePipe } from './components/searchPipe/searchByPrice/search-by-price.pipe';
import { SearchLocationPipe } from './components/searchPipe/searchByLocation/search-location.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { GoogleAPIComponent } from './components/google-api/google-api.component';
import { LoginComponent } from './components/login/login.component';
import { SliderComponent } from './components/slider/slider.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSliderModule,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    RouterModule,
    HttpClientModule,
    FooterComponent,
    EventDetailsComponent,
    LoginComponent,
    SearchComponent,
    GoogleAPIComponent,
    HttpClientModule,
    CommonModule,
    SearchPipe,
    EventDetailsComponent,
    TestimonialsComponent,
    SearchByPricePipe,
    SearchLocationPipe,
    SweetAlert2Module,
   
    
  ],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = 'evenue';
}

