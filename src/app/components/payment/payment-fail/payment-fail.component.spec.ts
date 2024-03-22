import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailComponent } from './payment-fail.component';

describe('PaymentFailComponent', () => {
  let component: PaymentFailComponent;
  let fixture: ComponentFixture<PaymentFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
