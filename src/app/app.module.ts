import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { CurrencyExchangerComponent } from './currency-exchanger/currency-exchanger.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//*
import { HttpClientModule } from '@angular/common/http';
import { CurrencyExchangeDetailsComponent } from './currency-exchange-details/currency-exchange-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrencyExchangerComponent,
    PageNotFoundComponent,
    CurrencyExchangeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
