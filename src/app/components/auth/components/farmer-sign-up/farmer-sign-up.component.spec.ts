import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSignUpComponent } from './farmer-sign-up.component';

describe('FarmerSignUpComponent', () => {
  let component: FarmerSignUpComponent;
  let fixture: ComponentFixture<FarmerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
