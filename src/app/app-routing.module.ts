import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangeDetailsComponent } from './currency-exchange-details/currency-exchange-details.component';
import { CurrencyExchangerComponent } from './currency-exchanger/currency-exchanger.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: CurrencyExchangerComponent}, // object encapsulate , root path
  {path: 'currency-exchange-details', component: CurrencyExchangeDetailsComponent}, //new object , wz new path...

   //{path: '**', redirectTo: '/'}, // wild card (redirectTo homepage automatically)
   {path: '**',  component: PageNotFoundComponent}, // wild card (with 404-page)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
