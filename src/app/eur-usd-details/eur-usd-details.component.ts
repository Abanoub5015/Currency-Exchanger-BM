import { Component } from '@angular/core';
import { CRatesApiService } from '../services/c-rates-api.service';
import { Router } from '@angular/router';
import { CExDetailsService } from '../services/c-ex-details.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-eur-usd-details',
  templateUrl: './eur-usd-details.component.html',
  styleUrls: ['./eur-usd-details.component.css']
})
export class EURUSDDetailsComponent {
  cJson: any = [];
  subscription_to_destroy: Subscription = new Subscription;

  currencies:any = [];

  c_price_chart: any;
  c_name_chart: any;
  chart: any = [];

  USD = [1.077319, 1.047735, 1.022547, 1.002471, 0.980478, 0.995406, 1.042372, 1.072673, 1.084945, 1.057686, 1.090441, 1.101055];
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
              data: this.USD,
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

    if (this.B2 == 'USD') {
      this.result = this.cJson.rates.USD  * (this.amount);
    }

    if (this.B2 == 'EUR') {
      this.result = this.cJson.rates.EUR * (this.amount);
    }
   
   //**********************************************************************

    if (this.A1 == 'USD' && this.B2 == 'EUR') {
      this.result = (this.cJson.rates.EUR /this.cJson.rates.USD)  * (this.amount);
    }

  }


  //unless using this one the [subscription (subscribe)] will stack to infinity and beyond😌
  ngOnDestroy(): void {
    this.subscription_to_destroy.unsubscribe();
  }


}
