import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPartnersComponent } from './events-partners.component';

describe('EventsPartnersComponent', () => {
  let component: EventsPartnersComponent;
  let fixture: ComponentFixture<EventsPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPartnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
