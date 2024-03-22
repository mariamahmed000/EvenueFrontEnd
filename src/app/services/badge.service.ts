import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  incrementCartItemCount() {
    const currentCount = this.cartItemCountSubject.value;
    this.cartItemCountSubject.next(currentCount + 1);
  }

  decrementCartItemCount() {
    const currentCount = this.cartItemCountSubject.value;
    this.cartItemCountSubject.next(currentCount - 1);
  }

  reset() {
    this.cartItemCountSubject.next(0);
  }
}
