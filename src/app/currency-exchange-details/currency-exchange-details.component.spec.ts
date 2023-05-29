import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeDetailsComponent } from './currency-exchange-details.component';

describe('CurrencyExchangeDetailsComponent', () => {
  let component: CurrencyExchangeDetailsComponent;
  let fixture: ComponentFixture<CurrencyExchangeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyExchangeDetailsComponent]
    });
    fixture = TestBed.createComponent(CurrencyExchangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
