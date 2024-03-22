import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
  ],
})
export class ReviewsComponent implements OnInit{
  constructor(
    private myActivate: ActivatedRoute,
    private usrModel: UserService,
    private _Router:Router
  ) {}
  ngOnInit(): void {
    this.ReviewForms = new FormGroup({
      userId:new FormControl(this.userId),
      eventId:new FormControl(this.eventId),
      comment: new FormControl(null,[Validators.required]),
    });
  }
  ReviewForms!:FormGroup;
  userId=localStorage.getItem('userId');
  eventId=this.myActivate.snapshot.params['id'];

  addReview(data:any){
    console.log(data.value);
    this.usrModel.setReveiw(this.userId,data.value).subscribe({
      next:(res)=>{
        if(res.message=='success'){
          console.log("here",res.data);
          
          this._Router.navigate([`/profile/${this.userId}`]);
        }
    
      }
    })



}
}