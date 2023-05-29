import { Component } from '@angular/core';
import { CRatesApiService } from '../services/c-rates-api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CExDetailsService } from '../services/c-ex-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  A1 = 'EUR';
  B2 = 'USD';
  amount = 1;

  B22 = 'GBP';
  constructor(private router: Router, private c: CRatesApiService, private CExDetailsService: CExDetailsService) {
  }

  moreDetails_EUR_USD(): void {
    this.CExDetailsService.addToCExDetails(this.A1);
    this.CExDetailsService.addToCExDetails2(this.B2);
    this.CExDetailsService.addToc_exAmount(this.amount);

    this.router.navigate(['/EUR-USD_Details/']);
  }


  moreDetails_EUR_GBP(): void {
    this.CExDetailsService.addToCExDetails(this.A1);
    this.CExDetailsService.addToCExDetails2(this.B22);
    this.CExDetailsService.addToc_exAmount(this.amount);

    this.router.navigate(['/EUR-GBP_Details/']);
  }




}
