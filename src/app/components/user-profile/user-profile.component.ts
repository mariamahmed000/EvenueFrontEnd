import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  userId: any;
  user: any;
  imageUrl: any;
  userReservations: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.userService.getOneUser(this.userId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.user = data.data;
        this.showPhoto();

        this.reservationService
          .getAllReservationByUserId(this.userId)
          .subscribe({
            next: (res: any) => {
              console.log('user res', res.data);
              this.userReservations = res.data;
            },
          });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  showPhoto() {
    this.imageUrl = this.userService.getImageUrl(this.user.image);
  }

  findTicketPrice(tickets: any[], type: string): number {
    const ticket = tickets.find((t) => t.type === type);
    return ticket ? ticket.price : 0;
  }

  showEventDetails(eventId: any) {
    console.log('Showing details for reservation:', eventId);
    this.router.navigate([`review/${eventId}`]);
  }
}
