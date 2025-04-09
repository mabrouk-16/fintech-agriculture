import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerSignUpComponent } from './retailer-sign-up.component';

describe('RetailerSignUpComponent', () => {
  let component: RetailerSignUpComponent;
  let fixture: ComponentFixture<RetailerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailerSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
