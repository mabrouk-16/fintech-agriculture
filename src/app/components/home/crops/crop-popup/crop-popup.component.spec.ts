import { TestBed } from '@angular/core/testing';

import { CropPopupComponent } from './crop-popup.component';

describe('CropPopupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropPopupComponent],
    }).compileComponents();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
