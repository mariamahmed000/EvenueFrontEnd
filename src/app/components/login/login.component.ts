import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { GoogleAPIComponent } from '../google-api/google-api.component';
import Swal from 'sweetalert2';
import { NgZone, inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

const authToken = localStorage.getItem('authToken');
const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
declare var google: any;
@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    GoogleAPIComponent,
    RegisterComponent,
  ],
})
export class LoginComponent implements OnInit {
  success = false;
  failure = false;
  constructor(
    private usrsrv: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  imgpath = '';
  imgsrc = '';
  //  constructor( private usrsrv: UserService,private router: Router){}
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '652762239068-v1m8fl5b3cl4uckkns2lcmvtojtlt56e.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_violet',
      size: 'large',
      shape: 'rectangle',
      width: 200,
    });
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      localStorage.setItem('userName', payLoad.name);

      // remove the modal after loging with google
      document.querySelector('body > div.modal-backdrop.fade.show')?.remove();

      //navigate to home/browse
      UserService.user.next(true);
      this.zone.run(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  emailErrorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl(null, [Validators.required]),
  });
  //Validators.pattern("^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$")
  DisplayImage() {
    this.imgsrc = this.usrsrv.getImageUrl(this.imgpath);
    console.log(this.imgsrc);
  }
  Login(submitData: FormGroup) {
    this.success = false;
    this.failure = false;
    // Call a method in the UserService to check if the user exists
    this.usrsrv.sendUser(submitData.value).subscribe({
      next: (user) => {
        console.log('user', user);
        if (user.message == 'success') {
          localStorage.setItem('token', user.token);
          this.success = true;
          console.log(localStorage.getItem('userRole'));
          if (localStorage.getItem('userRole') == 'user') {
            console.log('userrrrrr');
            this.router.navigate(['/home']);
          } else if (localStorage.getItem('userRole') == 'admin') {
            this.router.navigate(['/adminHome']); // Replace with your desired route
          }
        } else {
          console.log('User does not exist');

          // Handle the case where the user does not exist
        }
      },
      error: (err) => {
        // Swal.fire(err.error.message);
        Swal.fire({
          title: `<strong>${err.error.message}</strong>`,
          icon: 'error',
          html: `
            Try again.
          `,
          showCloseButton: true,
          // showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
             OK
          `,
          confirmButtonColor: '#5c127e',
        });
      },
    });
  }
}
