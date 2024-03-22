import { Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { LoginComponent } from './components/login/login.component';
import { protectGuard } from './guard/protect.guard';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { adminProtectGuard } from './guard/admin-protect.guard';
import { AllReservationsComponent } from './components/all-reservations/all-reservations.component';
import { GoogleAPIComponent } from './components/google-api/google-api.component';
import { AboutComponentComponent } from './components/about-component/about-component.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AdminAlleventsComponent } from './components/admin-allevents/admin-allevents.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    children: [{ path: '', component: GoogleAPIComponent }],
  },
  { path: 'events', component: SearchComponent },
  { path: 'checkout/payment', component: PaymentComponent },
  { path: 'details/:id', component: EventDetailsComponent },
  // { path: 'details',component: EventDetailsComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'adminHome',
    canActivate: [adminProtectGuard],
    component: AdminHomeComponent,
  },
  {
    path: 'reservations',
    canActivate: [adminProtectGuard],
    component: AllReservationsComponent,
  },
  {
    path: 'adminevents',
    canActivate: [adminProtectGuard],
    component: AdminAlleventsComponent,
  },
  {
    path: 'allusers',
    canActivate: [adminProtectGuard],
    component: AllUsersComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'addEvent',
    canActivate: [adminProtectGuard],
    component: CreateEventComponent,
  },

  { path: 'about', component: AboutComponent },
  { path: 'cart', canActivate: [protectGuard], component: CartComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'profile/:id',
    canActivate: [protectGuard],
    component: UserProfileComponent,
  },
  {
    path: 'review/:id',
    canActivate: [protectGuard],
    component: ReviewsComponent,
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },

  // ,canActivate:[adminProtectGuard]
];
