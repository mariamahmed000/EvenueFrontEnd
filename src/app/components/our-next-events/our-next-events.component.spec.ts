import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurNextEventsComponent } from './our-next-events.component';

describe('OurNextEventsComponent', () => {
  let component: OurNextEventsComponent;
  let fixture: ComponentFixture<OurNextEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurNextEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurNextEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
