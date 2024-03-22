import { AfterViewInit, Component } from '@angular/core';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';
import { PaymentFailComponent } from '../payment-fail/payment-fail.component';

import { loadScript } from '@paypal/paypal-js';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentSuccessComponent, PaymentFailComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  isFail: boolean = false;
  paypal: any;

  // \\\\\\\\\\| VERY SECURE INFORMATION |//////////
  // ##Credit Card information:
  // 4032038489822472
  // 03/2029
  // 11112
  // (222) 554-6236
  // John Doe

  // ##Account information:
  // Email: sb-wqgqw29666077@business.example.com
  // Password: Neu7>7)Y

  constructor() {
    this.initPaypal();
  }

  processPayment() {}

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
            onInit: (data: any) => {},
            onApprove: (data: any) => {
              this.isSubmitted = true;
              this.isSuccess = true;
            },
            onError: (err: any) => {
              this.isFail = true;
            },
            currency: 'USD',
            value: '10.00',
          })
          .render('#myPaypalButtons');
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  }
}
