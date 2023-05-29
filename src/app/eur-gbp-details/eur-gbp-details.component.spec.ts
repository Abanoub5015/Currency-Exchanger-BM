import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EURGBPDetailsComponent } from './eur-gbp-details.component';

describe('EURGBPDetailsComponent', () => {
  let component: EURGBPDetailsComponent;
  let fixture: ComponentFixture<EURGBPDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EURGBPDetailsComponent]
    });
    fixture = TestBed.createComponent(EURGBPDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
