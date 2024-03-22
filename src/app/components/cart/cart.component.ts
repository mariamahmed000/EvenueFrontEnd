import { Component, OnInit } from '@angular/core';
import { CartInfo } from '../../interface/cart-info';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { EventDetailsService } from '../../services/event-details.service';
import { EventService } from '../../services/event.service';
import { Router, RouterModule } from '@angular/router';
import { loadScript } from '@paypal/paypal-js';
import { PaymentService } from '../../services/payment.service';
import Swal from 'sweetalert2';
import { BadgeService } from '../../services/badge.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartInfo: any;
  ticketsQ: any;
  regular: any = 0;
  gold: any = 0;
  vip: any = 0;
  sum: any = 0;
  totalQuantity: any = 0;
  cartSum: any = 0;
  eventPrice: any = 0;
  cartPrice: any = 0;

  paypal: any;
  reserveData: any = [];

  userId = '';

  constructor(
    private evtsrv: EventService,
    private evdsrv: EventDetailsService,
    private paymentServeice: PaymentService,
    private badgeService: BadgeService,
    private router: Router
  ) {
    this.initPaypal();
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.cartInfo = this.evdsrv.reservationDetails;
    this.totalQuantity = this.cartInfo.length;
    this.eventPrice = this.totalEventPrice();

    // console.log(this.cartPrice);
    console.log('mariam', this.totalEventPrice());
  }
  totalEventPrice() {
    this.sum = 0;
    this.cartInfo.forEach((event: any) => {
      event.tickets.forEach((ticket: any) => {
        this.sum += ticket.price;
      });
      console.log('sum gowa for each el kbeera', this.sum);
    });
    return this.sum;
  }

  minus(index: any, type: any) {
    // this.ticketsQ--;
    this.cartInfo[index].tickets.forEach((ticket: any) => {
      console.log(ticket.type);
      if (ticket.type == type) {
        ticket.quantity--;
        ticket.price = ticket.price - ticket.SingleTicketPrice;
        this.eventPrice = this.totalEventPrice();
      }
    });
  }
  add(index: any, type: any) {
    // this.ticketsQ++;
    this.cartInfo[index].tickets.forEach((ticket: any) => {
      console.log(ticket.type);
      if (ticket.type == type) {
        ticket.quantity++;
        ticket.price = ticket.price + ticket.SingleTicketPrice;
        this.eventPrice = this.totalEventPrice();
      }
    });
  }
  delete(evt: any) {
    let cartItem = evt.target.closest('.cartItem');
    let cartItemId = evt.target.getAttribute('data-event-id');
    console.log(cartItemId);
    cartItem.remove();
    this.badgeService.decrementCartItemCount();

    let updatedcart = this.cartInfo.filter(
      (event: any) => event.eventID !== cartItemId
    );

    this.cartInfo = updatedcart;
    this.evdsrv.reservationDetails = updatedcart;
  }
  resetCounter() {
    this.badgeService.reset();
  }

  // payment
  async initPaypal() {
    try {
      this.paypal = await loadScript({
        clientId:
          'AQvAp1GxU6ySWe3jyMpiRsKiw0tmFY52qPZkobaUnVtfJ-6X-8JPgVFZFZFrLBEWXGbb8cYvwRYcYRxD',
        currency: 'USD',
      });
    } catch (error) {
      console.error('failed to load the PayPal JS SDK script', error);
    }

    if (this.paypal) {
      try {
        await this.paypal
          .Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'paypal',
              height: 50,
            },
            onInit: (data: any) => {
              console.log(this.cartInfo);
            },
            onApprove: (data: any) => {
              this.resetCounter();
              this.evdsrv.clearCart();

              this.cartInfo.forEach((ele: any) => {
                const ticketsArr: any = [];
                ele.tickets.forEach((ticket: any) => {
                  const objTicket = {
                    type: ticket.type,
                    quantity: ticket.quantity,
                  };
                  ticketsArr.push(objTicket);
                });

                const reservation = {
                  eventId: ele.eventID,
                  tickets: ticketsArr,
                  dateTime: ele.dateTime,
                };
                this.reserveData.push(reservation);
                // console.log('cart objectttt', reservation);
                console.log('cart res array', this.reserveData);
              });
              console.log('RESERVEDATA', this.reserveData);
              this.paymentServeice.pay(this.reserveData).subscribe({
                next: (res: any) => {
                  console.log('sweeeet alert');
                  console.log(res);

                  Swal.fire({
                    title: `<strong></strong>`,
                    icon: 'success',
                    html: `
                          
                    <div> <video class="mt-3 rounded border broder-2" style="max-height: 300px" src="../../../assets/imgs/payment_success_video.mp4" autoplay></video>
                    </div>
                    <div><p class='fs-3 fw-bold text-success'>Your ticket is reserved successfully</p> </div>
                        `,
                    showCloseButton: true,
                    // showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: `
                           OK
                        `,
                    confirmButtonColor: '#5c127e',
                  }).then((result) => {
                    // Check if the user clicked the "OK" button
                    if (result.isConfirmed) {
                      // Navigate to another page using Angular Router
                      this.router.navigate([`home`]); // Make sure to inject Router in your component
                    }
                  });
                },
                error: (err: any) => {
                  console.log(err);
                },
              });
            },
            onError: (err: any) => {
              // this.isFail = true;
            },
            currency: 'USD',
            value: this.eventPrice,
          })
          .render('#myPaypalButtons');
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  }
}

[
  {
    eventID: '65d9b922fc352601512835f0',
    title: 'Amr Diab 22',
    location: 'cairo',
    tickets: [
      {
        type: 'regular',
        quantity: 4,
        SingleTicketPrice: 105,
        price: 420,
      },
      {
        type: 'gold',
        quantity: 4,
        SingleTicketPrice: 1000,
        price: 4000,
      },
    ],
    dateTime: {
      day: '2024-02-23',
      start: '8',
      end: '0',
    },
  },
];
