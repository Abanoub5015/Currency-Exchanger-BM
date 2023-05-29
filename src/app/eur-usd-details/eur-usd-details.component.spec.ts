import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EURUSDDetailsComponent } from './eur-usd-details.component';

describe('EURUSDDetailsComponent', () => {
  let component: EURUSDDetailsComponent;
  let fixture: ComponentFixture<EURUSDDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EURUSDDetailsComponent]
    });
    fixture = TestBed.createComponent(EURUSDDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
