import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent implements OnInit {
  imageName: string = '';
  imageUrl: string = '';
  reviews: any[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getReviews().subscribe({
      next: (res: any) => {
        if (res.message == 'success' && res.data) {
          this.reviews = res.data;
          this.reviews=this.reviews.slice(this.reviews.length-3,this.reviews.length);
          this.getData();
        } else {
          console.log("Can't fetch API or data is undefined");
        }
      },
    });
    console.log();
  }

  getData() {
    this.reviews.forEach((review) => {
      console.log(review);
      if (review.userId.image) {
        this.imageName = '';
        this.imageName = review?.userId.image;
        this.imageName =
          this.imageName?.split('/')[
            `${this.imageName?.split('/').length - 1}`
          ];

        this.imageUrl = this.userService.getImageUrl(this.imageName);

        review.userId.image = this.imageUrl;
      }
    });
  }
}
