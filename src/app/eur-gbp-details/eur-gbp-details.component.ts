import { Component } from '@angular/core';
import { CRatesApiService } from '../services/c-rates-api.service';
import { Router } from '@angular/router';
import { CExDetailsService } from '../services/c-ex-details.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-eur-gbp-details',
  templateUrl: './eur-gbp-details.component.html',
  styleUrls: ['./eur-gbp-details.component.css']
})
export class EURGBPDetailsComponent {
  cJson: any = [];
  subscription_to_destroy: Subscription = new Subscription;

  currencies:any = [];


  c_price_chart: any;
  c_name_chart: any;
  chart: any = [];

  GBP = [0.851315, 0.86161, 0.838897, 0.865567, 0.879353, 0.862095, 0.862944, 0.886653, 0.88232, 0.879017, 0.880646, 0.876841];
  value: any;

  A1 = 'EUR';
  B2 = 'USD';
  amount = 0;
  result: any;
  title = '';
  fulltitle = 'Currency Full-Name';

  
  changeA(A: string) {
    this.A1 = A;
    console.log(this.A1);
  }
  changeB(B: string) {
    this.B2 = B;
    console.log(this.B2);
  }


  constructor(private c: CRatesApiService, private CExDetailsService: CExDetailsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.A1 = this.CExDetailsService.getgetc_exDetails();
    this.B2 = this.CExDetailsService.getgetc_exDetails2();
    this.amount = this.CExDetailsService.getgetc_c_exAmount();
    this.title = this.A1;


    this.subscription_to_destroy = this.c.getCurrencyRates().subscribe(response => { //Subcribe to observable [in ProductService] (to get response (stream of data)) 
      this.cJson = response;
      for (var key in this.cJson.rates) {
        this.currencies.push(key);

        // console.log(this.currencies.push(currency));
      }
    })

    this.subscription_to_destroy = this.c.getCurrencyhistorical().subscribe(response => { //Subcribe to observable [in ProductService] (to get response (stream of data)) 
      this.chart = response;
      for (var key in this.cJson.rates) {

        this.currencies.push(key);
        this.c_name_chart = key;
        //console.log(key);

        this.value = this.cJson.rates[key];
        this.currencies.push(this.value);
        this.c_price_chart = this.value;
        //console.log(this.value);


      }


      //show chart data
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: [5.22, 6.22, 7.22, 8.22, 9.22, 10.22, 11.22, 12.22, 1.23, 2.23, 3.23, 4.23],
          datasets: [
            {
              label: 'currency rate',
              data: this.GBP,
              borderWidth: 3,
              fill: true,
              backgroundColor: 'rgba(93,175,89,0.1)',
              borderColor: '#3e95cd'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 3, //(width/height)
        }
      })

      /*   this.c_price_chart = value;
         this.c_name_chart = this.chart.map((rates: any) => { rates.key });
         console.log(this.chart);
         console.log(this.c_price_chart);
         console.log(this.c_name_chart);   */


    })



  }



   //convert btn[event]
   convert() {
    this.subscription_to_destroy = this.c.getCurrencyRates().subscribe(response => { //Subcribe to observable [in ProductService] (to get response (stream of data)) 
      this.cJson = JSON.stringify(response);
      this.cJson = JSON.parse(this.cJson);
      console.log(this.cJson);

      this.convertA1_B2();

    })

   
     
    
   
  }

  swap() {
    let temp = this.B2;
    this.B2 = (this.A1);
    this.A1 = (temp);

    this.convert();
  }


  convertA1_B2(){

    if (this.B2 == 'GBP') {
      this.result = this.cJson.rates.GBP  * (this.amount);
    }

    if (this.B2 == 'EUR') {
      this.result = this.cJson.rates.EUR * (this.amount);
    }
   
   //**********************************************************************

    if (this.A1 == 'GBP' && this.B2 == 'EUR') {
      this.result = (this.cJson.rates.EUR /this.cJson.rates.GBP)  * (this.amount);
    }

  }


  //unless using this one the [subscription (subscribe)] will stack to infinity and beyond😌
  ngOnDestroy(): void {
    this.subscription_to_destroy.unsubscribe();
  }


}
