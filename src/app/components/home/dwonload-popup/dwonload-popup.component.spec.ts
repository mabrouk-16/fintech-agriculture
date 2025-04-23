import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwonloadPopupComponent } from './dwonload-popup.component';

describe('DwonloadPopupComponent', () => {
  let component: DwonloadPopupComponent;
  let fixture: ComponentFixture<DwonloadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwonloadPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DwonloadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
