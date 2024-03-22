import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalEventsComponent } from './regional-events.component';

describe('RegionalEventsComponent', () => {
  let component: RegionalEventsComponent;
  let fixture: ComponentFixture<RegionalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionalEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegionalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
