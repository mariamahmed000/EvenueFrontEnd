import { UserService } from './../../services/user.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { BadgeService } from '../../services/badge.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private badgeService: BadgeService
  ) {
    this.badgeService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }
  // isSignClicked: boolean = false;
  showBadge = false; // Initially, the badge is hidden
  badgeCount = 0;
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
  isHomeRoute: boolean = false;
  path: any;
  role: any;
  hasaphoto: boolean = false;
  imageUrl?: string;
  imageName?: string;
  userName?: any;
  loggedIn: boolean = false;
  cartItemCount: number = 0;
  user: any;

  private userSub?: Subscription;
  @ViewChild('exampleModal') modal: ElementRef | undefined;
  ngOnInit(): void {
    this.loggedIn = !!UserService.getUser();
    if (localStorage.getItem('userName') != null) {
      this.userName = localStorage.getItem('userName');

      this.hasaphoto = false;
    }
    if (localStorage.getItem('userId') != null) {
      this._UserService.getOneUser(localStorage.getItem('userId')).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.user = res.data;
            this.imageName = res.data.image;
            this.userName = res.data.name;
            this.role = res.data.role;
            this.showPhoto();
          }
        },
      });
    }
    this.userSub = UserService.user.subscribe((user) => {
      this.loggedIn = !!user;
      if (localStorage.getItem('userName') != null) {
        this.userName = localStorage.getItem('userName');

        this.hasaphoto = false;
      }
      if (localStorage.getItem('userId') != null) {
        this.showPhoto();
        this._UserService.getOneUser(localStorage.getItem('userId')).subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.imageName = res.data.image;
              this.userName = res.data.name;
              this.role = res.data.role;
              this.showPhoto();
            }
          },
        });
      }
    });

    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isHomeRoute = event.url === '/home';
      }
    });

    this.badgeService.cartItemCount$.subscribe(
      (count) => (this.cartItemCount = count)
    );
  }
  logOut() {
    this._UserService.logOut();
    this.hasaphoto = false;
    this.imageName = undefined; // Reset image name
    this.userName = undefined; // Reset user name
    this.role = undefined;
  }

  showPhoto() {
    this.imageUrl = this._UserService.getImageUrl(this.imageName);
    this.hasaphoto = true;
  }
  openCart() {
    this._Router.navigate(['/cart']);
  }

  routeToProfile() {
    let myId = localStorage.getItem('userId');
    this._Router.navigate([`/profile/${myId}`]);
  }
}
