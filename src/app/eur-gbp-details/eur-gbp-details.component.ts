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

  
  //to show all drop-down list currencies
  currencies:any = [];

  chart: any = [];
  rates: any = [];
  Rates_arr_value: any = [];
  //GBP = [0.851315, 0.86161, 0.838897, 0.865567, 0.879353, 0.862095, 0.862944, 0.886653, 0.88232, 0.879017, 0.880646, 0.876841];

  chartList: any = new Array<any>();
  sub: any;


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

    
    //get all rates
    this.rates_func();

    //show chart
    this.chart_Data();
    //1st open of the page => refresh chart to show correctly
    this.sub = setInterval(() => { this.chart.update(); }, 1200);//<-- run every 1.2 second
    this.sub.unsubscribe();//stop-interval


  }



  rates_func() {
    let date = ['2022-06-30', '2022-07-31', '2022-08-31', '2022-09-30', '2022-10-31', '2022-11-30', '2022-12-31', '2023-01-31', '2023-02-28', '2023-03-31', '2023-04-30', '2023-05-31'];

    var i = 0;
    for (i = 0; i <= date.length; i++) {
      this.subscription_to_destroy = this.c.getCurrencyhistorical(date[i], this.B2).subscribe(Currencyhistorical_Object => {
        //this.chartList.push(Currencyhistorical_Object)

        this.chartList = Currencyhistorical_Object;
        //console.log(this.chartList);
        /****The for...in loop is iterate through the keys of an object.****/
        for (var key in this.chartList.rates) {
          //console.log(key);
          this.rates = this.chartList.rates[key];
          //console.log("this.rate =", this.rates);

          this.Rates_arr_value.push(this.rates)

          console.log(this.Rates_arr_value);
        }

      })
    }

    /*  //show chart
     this.chart_Data();
     this.sub = setInterval(() => { this.chart.update(); }, 1200);//<-- run every 1.2 second
     this.sub.unsubscribe();//stop-interval */

  }

  chart_Data() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [6.22, 7.22, 8.22, 9.22, 10.22, 11.22, 12.22, 1.23, 2.23, 3.23, 4.23, 5.23],
        datasets: [
          {
            label: 'currency rate (' + this.B2 + ')',
            data: this.Rates_arr_value,
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

  }

   //convert btn[event]
   convert() {
    this.subscription_to_destroy = this.c.getCurrencyRates().subscribe(response => { //Subcribe to observable [in ProductService] (to get response (stream of data)) 
      this.cJson = JSON.stringify(response);
      this.cJson = JSON.parse(this.cJson);
      console.log(this.cJson);

     
      //Reset all values obtained
      this.Rates_arr_value = [];
      //Reset chart drawing
      this.chart.destroy();
      //call func again to get the new values
      this.rates_func();
      //show new chart
      this.chart_Data();

      if (this.A1 == 'EUR') {
        Object.keys(this.cJson.rates).forEach(() => {
          this.result = this.cJson.rates[this.B2] * (this.amount);
        })
      }

      if (this.A1 != 'EUR') {
        Object.keys(this.cJson.rates).forEach(() => {
          this.result = (this.cJson.rates[this.B2] / this.cJson.rates[this.A1]) * (this.amount);
        })
      }

  
    })
    
  }


  swap() {
    let temp = this.B2;
    this.B2 = (this.A1);
    this.A1 = (temp);

    this.convert();
  }


  //unless using this one the [subscription (subscribe)] will stack to infinity and beyond😌
  ngOnDestroy(): void {
    this.subscription_to_destroy.unsubscribe();
  }

}
