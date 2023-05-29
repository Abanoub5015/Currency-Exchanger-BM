import { Component } from '@angular/core';
import { CRatesApiService } from '../services/c-rates-api.service';
import { Router } from '@angular/router';
import { CExDetailsService } from '../services/c-ex-details.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-currency-exchange-details',
  templateUrl: './currency-exchange-details.component.html',
  styleUrls: ['./currency-exchange-details.component.css']
})
export class CurrencyExchangeDetailsComponent {
  cJson: any = [];
  subscription_to_destroy: Subscription = new Subscription;

  currencies:any = [];



  c_price_chart: any;
  c_name_chart: any;
  chart: any = [];

  USD = [1.077319, 1.047735, 1.022547, 1.002471, 0.980478, 0.995406, 1.042372, 1.072673, 1.084945, 1.057686, 1.090441, 1.101055];
  isEGP: boolean = false;
  EGPRate = [19.971826, 19.699614, 19.334419, 19.303371, 19.156632, 23.901395, 25.590973, 26.498572, 32.778137, 32.39916, 33.384467, 34.058154];

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

    this.fulltitle_f();

 

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

     /*    this.currencies.push(key);
        this.c_name_chart = key;
        //console.log(key);

        this.value = this.cJson.rates[key];
        this.currencies.push(this.value);
        this.c_price_chart = this.value;
        //console.log(this.value);
 */

      }


      //show chart data
      this.chart_Data();
      /*   this.c_price_chart = value;
         this.c_name_chart = this.chart.map((rates: any) => { rates.key });
         console.log(this.chart);
         console.log(this.c_price_chart);
         console.log(this.c_name_chart);   */


    })



  }

  chart_Data(){
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [5.22, 6.22, 7.22, 8.22, 9.22, 10.22, 11.22, 12.22, 1.23, 2.23, 3.23, 4.23],
        datasets: [
          {
            label: 'currency rate',
            data: this.isEGP ? this.EGPRate : this.USD,
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

      this.convertA1_B2();

      if(this.B2 == 'EGP')
      {
        this.isEGP = true;
        this.chart.destroy();
        this.chart_Data();
      }

      
      if(this.B2 == 'USD')
      {
        this.isEGP = false;
        this.chart.destroy();
        this.chart_Data();
      }
    
  
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
    if (this.B2 == 'EGP') {
      this.result = this.cJson.rates.EGP  * (this.amount);
    }
    if (this.B2 == 'EUR') {
      this.result = this.cJson.rates.EUR * (this.amount);
    }
    if (this.B2 == 'GBP') {
      this.result = this.cJson.rates.GBP  * (this.amount);
    }


    if (this.B2 == 'AED') {
      this.result = this.cJson.rates.AED  * (this.amount);
    }
    if (this.B2 == 'AFN') {
      this.result = this.cJson.rates.AFN  * (this.amount);
    }
    if (this.B2 == 'ALL') {
      this.result = this.cJson.rates.ALL * (this.amount);
    }
    if (this.B2 == 'AMD') {
      this.result = this.cJson.rates.AMD  * (this.amount);
    }
    if (this.B2 == 'ANG') {
      this.result = this.cJson.rates.ANG  * (this.amount);
    }
    if (this.B2 == 'AOA') {
      this.result = this.cJson.rates.AOA  * (this.amount);
    }
    if (this.B2 == 'ARS') {
      this.result = this.cJson.rates.ARS  * (this.amount);
    }
    if (this.B2 == 'AUD') {
      this.result = this.cJson.rates.AUD * (this.amount);
    }
    if (this.B2 == 'AWG') {
      this.result = this.cJson.rates.AWG  * (this.amount);
    }
    if (this.B2 == 'AZN') {
      this.result = this.cJson.rates.AZN  * (this.amount);
    }
    if (this.B2 == 'BAM') {
      this.result = this.cJson.rates.BAM * (this.amount);
    }
    if (this.B2 == 'BBD') {
      this.result = this.cJson.rates.BBD  * (this.amount);
    }
    if (this.B2 == 'BDT') {
      this.result = this.cJson.rates.BDT  * (this.amount);
    }
    if (this.B2 == 'BGN') {
      this.result = this.cJson.rates.BGN * (this.amount);
    }
    if (this.B2 == 'BHD') {
      this.result = this.cJson.rates.BHD  * (this.amount);
    }
    if (this.B2 == 'BIF') {
      this.result = this.cJson.rates.BIF  * (this.amount);
    }
    if (this.B2 == 'BMD') {
      this.result = this.cJson.rates.BMD * (this.amount);
    }
    if (this.B2 == 'BND') {
      this.result = this.cJson.rates.BND  * (this.amount);
    }
    if (this.B2 == 'BOB') {
      this.result = this.cJson.rates.BOB  * (this.amount);
    }
    if (this.B2 == 'BRL') {
      this.result = this.cJson.rates.BRL * (this.amount);
    }
    if (this.B2 == 'BSD') {
      this.result = this.cJson.rates.BSD  * (this.amount);
    }
    if (this.B2 == 'BTC') {
      this.result = this.cJson.rates.BTC  * (this.amount);
    }
    if (this.B2 == 'BTN') {
      this.result = this.cJson.rates.BTN * (this.amount);
    }
    if (this.B2 == 'BWP') {
      this.result = this.cJson.rates.BWP  * (this.amount);
    }
    if (this.B2 == 'BYN') {
      this.result = this.cJson.rates.BYN  * (this.amount);
    }
    if (this.B2 == 'BYR') {
      this.result = this.cJson.rates.BYR * (this.amount);
    }
    if (this.B2 == 'BZD') {
      this.result = this.cJson.rates.BZD  * (this.amount);
    }
    if (this.B2 == 'CAD') {
      this.result = this.cJson.rates.CAD  * (this.amount);
    }
    if (this.B2 == 'CDF') {
      this.result = this.cJson.rates.CDF * (this.amount);
    }
    if (this.B2 == 'CHF') {
      this.result = this.cJson.rates.CHF  * (this.amount);
    }
    if (this.B2 == 'CLF') {
      this.result = this.cJson.rates.CLF  * (this.amount);
    }
    if (this.B2 == 'CLP') {
      this.result = this.cJson.rates.CLP * (this.amount);
    }
    if (this.B2 == 'CNY') {
      this.result = this.cJson.rates.CNY  * (this.amount);
    }
    if (this.B2 == 'COP') {
      this.result = this.cJson.rates.COP  * (this.amount);
    }
    if (this.B2 == 'CRC') {
      this.result = this.cJson.rates.CRC * (this.amount);
    }
    if (this.B2 == 'CUC') {
      this.result = this.cJson.rates.CUC  * (this.amount);
    }
    if (this.B2 == 'CUP') {
      this.result = this.cJson.rates.CUP  * (this.amount);
    }
    if (this.B2 == 'CVE') {
      this.result = this.cJson.rates.CVE * (this.amount);
    }
    if (this.B2 == 'CZK') {
      this.result = this.cJson.rates.CZK  * (this.amount);
    }
    if (this.B2 == 'DJF') {
      this.result = this.cJson.rates.DJF  * (this.amount);
    }
    if (this.B2 == 'DKK') {
      this.result = this.cJson.rates.DKK * (this.amount);
    }
    if (this.B2 == 'DOP') {
      this.result = this.cJson.rates.DOP  * (this.amount);
    }
    if (this.B2 == 'DZD') {
      this.result = this.cJson.rates.DZD  * (this.amount);
    }
    if (this.B2 == 'ERN') {
      this.result = this.cJson.rates.ERN * (this.amount);
    }
    if (this.B2 == 'ETB') {
      this.result = this.cJson.rates.ETB  * (this.amount);
    }
    if (this.B2 == 'FJD') {
      this.result = this.cJson.rates.FJD  * (this.amount);
    }
    if (this.B2 == 'FKP') {
      this.result = this.cJson.rates.FKP * (this.amount);
    }
    if (this.B2 == 'GEL') {
      this.result = this.cJson.rates.GEL  * (this.amount);
    }
    if (this.B2 == 'GGP') {
      this.result = this.cJson.rates.GGP * (this.amount);
    }
    if (this.B2 == 'GHS') {
      this.result = this.cJson.rates.GHS  * (this.amount);
    }
    if (this.B2 == 'GIP') {
      this.result = this.cJson.rates.GIP * (this.amount);
    }
    if (this.B2 == 'GMD') {
      this.result = this.cJson.rates.GMD  * (this.amount);
    }
    if (this.B2 == 'GNF') {
      this.result = this.cJson.rates.GNF * (this.amount);
    }
    if (this.B2 == 'GTQ') {
      this.result = this.cJson.rates.GTQ  * (this.amount);
    }
    if (this.B2 == 'GYD') {
      this.result = this.cJson.rates.GYD * (this.amount);
    }
    if (this.B2 == 'HKD') {
      this.result = this.cJson.rates.HKD  * (this.amount);
    }
    if (this.B2 == 'HNL') {
      this.result = this.cJson.rates.HNL * (this.amount);
    }
    if (this.B2 == 'HRK') {
      this.result = this.cJson.rates.HRK  * (this.amount);
    }
    if (this.B2 == 'HTG') {
      this.result = this.cJson.rates.HTG * (this.amount);
    }
    if (this.B2 == 'HUF') {
      this.result = this.cJson.rates.HUF  * (this.amount);
    }
    if (this.B2 == 'IDR') {
      this.result = this.cJson.rates.IDR * (this.amount);
    }
    if (this.B2 == 'ILS') {
      this.result = this.cJson.rates.ILS  * (this.amount);
    }
    if (this.B2 == 'IMP') {
      this.result = this.cJson.rates.IMP * (this.amount);
    }
    if (this.B2 == 'INR') {
      this.result = this.cJson.rates.INR  * (this.amount);
    }
    if (this.B2 == 'IQD') {
      this.result = this.cJson.rates.IQD * (this.amount);
    }
    if (this.B2 == 'IRR') {
      this.result = this.cJson.rates.IRR  * (this.amount);
    }
    if (this.B2 == 'ISK') {
      this.result = this.cJson.rates.ISK * (this.amount);
    }
    if (this.B2 == 'JEP') {
      this.result = this.cJson.rates.JEP  * (this.amount);
    }
    if (this.B2 == 'JMD') {
      this.result = this.cJson.rates.JMD * (this.amount);
    }
    if (this.B2 == 'JOD') {
      this.result = this.cJson.rates.JOD * (this.amount);
    }
    if (this.B2 == 'JPY') {
      this.result = this.cJson.rates.JPY * (this.amount);
    }
    if (this.B2 == 'KES') {
      this.result = this.cJson.rates.KES * (this.amount);
    }
    if (this.B2 == 'KGS') {
      this.result = this.cJson.rates.KGS * (this.amount);
    }
    if (this.B2 == 'KHR') {
      this.result = this.cJson.rates.KHR * (this.amount);
    }
    if (this.B2 == 'KMF') {
      this.result = this.cJson.rates.KMF * (this.amount);
    }
    if (this.B2 == 'KPW') {
      this.result = this.cJson.rates.KPW * (this.amount);
    }
    if (this.B2 == 'KRW') {
      this.result = this.cJson.rates.KRW * (this.amount);
    }
    if (this.B2 == 'KWD') {
      this.result = this.cJson.rates.KWD * (this.amount);
    }
    if (this.B2 == 'KYD') {
      this.result = this.cJson.rates.KYD * (this.amount);
    }
    if (this.B2 == 'KZT') {
      this.result = this.cJson.rates.KZT * (this.amount);
    }
    if (this.B2 == 'LAK') {
      this.result = this.cJson.rates.LAK * (this.amount);
    }
    if (this.B2 == 'LBP') {
      this.result = this.cJson.rates.LBP * (this.amount);
    }
    if (this.B2 == 'LKR') {
      this.result = this.cJson.rates.LKR * (this.amount);
    }
    if (this.B2 == 'LRD') {
      this.result = this.cJson.rates.LRD * (this.amount);
    }
    if (this.B2 == 'LSL') {
      this.result = this.cJson.rates.LSL * (this.amount);
    }
    if (this.B2 == 'LTL') {
      this.result = this.cJson.rates.LTL * (this.amount);
    }
    if (this.B2 == 'LVL') {
      this.result = this.cJson.rates.LVL * (this.amount);
    }
    if (this.B2 == 'LYD') {
      this.result = this.cJson.rates.LYD * (this.amount);
    }
    if (this.B2 == 'MAD') {
      this.result = this.cJson.rates.MAD * (this.amount);
    }
    if (this.B2 == 'MDL') {
      this.result = this.cJson.rates.MDL * (this.amount);
    }
    if (this.B2 == 'MGA') {
      this.result = this.cJson.rates.MGA * (this.amount);
    }
    if (this.B2 == 'MKD') {
      this.result = this.cJson.rates.MKD * (this.amount);
    }
    if (this.B2 == 'MMK') {
      this.result = this.cJson.rates.MMK * (this.amount);
    }
    if (this.B2 == 'MNT') {
      this.result = this.cJson.rates.MNT * (this.amount);
    }
    if (this.B2 == 'MOP') {
      this.result = this.cJson.rates.MOP * (this.amount);
    }
    if (this.B2 == 'MRO') {
      this.result = this.cJson.rates.MRO * (this.amount);
    }
    if (this.B2 == 'MUR') {
      this.result = this.cJson.rates.MUR * (this.amount);
    }
    if (this.B2 == 'MVR') {
      this.result = this.cJson.rates.MVR * (this.amount);
    }
    if (this.B2 == 'MWK') {
      this.result = this.cJson.rates.MWK * (this.amount);
    }
    if (this.B2 == 'MXN') {
      this.result = this.cJson.rates.MXN * (this.amount);
    }
    if (this.B2 == 'MYR') {
      this.result = this.cJson.rates.MYR * (this.amount);
    }
    if (this.B2 == 'MZN') {
      this.result = this.cJson.rates.MZN * (this.amount);
    }
    if (this.B2 == 'NAD') {
      this.result = this.cJson.rates.NAD * (this.amount);
    }
    if (this.B2 == 'NGN') {
      this.result = this.cJson.rates.NGN * (this.amount);
    }
    if (this.B2 == 'NIO') {
      this.result = this.cJson.rates.NIO * (this.amount);
    }
    if (this.B2 == 'NOK') {
      this.result = this.cJson.rates.NOK * (this.amount);
    }
    if (this.B2 == 'NPR') {
      this.result = this.cJson.rates.NPR * (this.amount);
    }
    if (this.B2 == 'NZD') {
      this.result = this.cJson.rates.NZD * (this.amount);
    }
    if (this.B2 == 'OMR') {
      this.result = this.cJson.rates.OMR * (this.amount);
    }
    if (this.B2 == 'PAB') {
      this.result = this.cJson.rates.PAB * (this.amount);
    }
    if (this.B2 == 'PEN') {
      this.result = this.cJson.rates.PEN * (this.amount);
    }
    if (this.B2 == 'PGK') {
      this.result = this.cJson.rates.PGK * (this.amount);
    }
    if (this.B2 == 'PHP') {
      this.result = this.cJson.rates.PHP * (this.amount);
    }
    if (this.B2 == 'PKR') {
      this.result = this.cJson.rates.PKR * (this.amount);
    }
    if (this.B2 == 'PLN') {
      this.result = this.cJson.rates.PLN * (this.amount);
    }
    if (this.B2 == 'PYG') {
      this.result = this.cJson.rates.PYG * (this.amount);
    }
    if (this.B2 == 'QAR') {
      this.result = this.cJson.rates.QAR * (this.amount);
    }
    if (this.B2 == 'RON') {
      this.result = this.cJson.rates.RON * (this.amount);
    }
    if (this.B2 == 'RSD') {
      this.result = this.cJson.rates.RSD * (this.amount);
    }
    if (this.B2 == 'RUB') {
      this.result = this.cJson.rates.RUB * (this.amount);
    }
    if (this.B2 == 'RWF') {
      this.result = this.cJson.rates.RWF * (this.amount);
    }
    if (this.B2 == 'SAR') {
      this.result = this.cJson.rates.SAR * (this.amount);
    }
    if (this.B2 == 'SBD') {
      this.result = this.cJson.rates.SBD * (this.amount);
    }
    if (this.B2 == 'SCR') {
      this.result = this.cJson.rates.SCR * (this.amount);
    }
    if (this.B2 == 'SDG') {
      this.result = this.cJson.rates.SDG * (this.amount);
    }
    if (this.B2 == 'SEK') {
      this.result = this.cJson.rates.SEK * (this.amount);
    }
    if (this.B2 == 'SGD') {
      this.result = this.cJson.rates.SGD * (this.amount);
    }
    if (this.B2 == 'SHP') {
      this.result = this.cJson.rates.SHP * (this.amount);
    }
    if (this.B2 == 'SLE') {
      this.result = this.cJson.rates.SLE * (this.amount);
    }
    if (this.B2 == 'SLL') {
      this.result = this.cJson.rates.SLL * (this.amount);
    }
    if (this.B2 == 'SOS') {
      this.result = this.cJson.rates.SOS * (this.amount);
    }
    if (this.B2 == 'SRD') {
      this.result = this.cJson.rates.SRD * (this.amount);
    }
    if (this.B2 == 'STD') {
      this.result = this.cJson.rates.STD * (this.amount);
    }
    if (this.B2 == 'SVC') {
      this.result = this.cJson.rates.SVC * (this.amount);
    }
    if (this.B2 == 'SYP') {
      this.result = this.cJson.rates.SYP * (this.amount);
    }
    if (this.B2 == 'SZL') {
      this.result = this.cJson.rates.SZL * (this.amount);
    }
    if (this.B2 == 'THB') {
      this.result = this.cJson.rates.THB * (this.amount);
    }
    if (this.B2 == 'TJS') {
      this.result = this.cJson.rates.TJS * (this.amount);
    }
    if (this.B2 == 'TMT') {
      this.result = this.cJson.rates.TMT * (this.amount);
    }
    if (this.B2 == 'TND') {
      this.result = this.cJson.rates.TND * (this.amount);
    }
    if (this.B2 == 'TOP') {
      this.result = this.cJson.rates.TOP * (this.amount);
    }
    if (this.B2 == 'TRY') {
      this.result = this.cJson.rates.TRY * (this.amount);
    }
    if (this.B2 == 'TTD') {
      this.result = this.cJson.rates.TTD * (this.amount);
    }
    if (this.B2 == 'TWD') {
      this.result = this.cJson.rates.TWD * (this.amount);
    }
    if (this.B2 == 'TZS') {
      this.result = this.cJson.rates.TZS * (this.amount);
    }
    if (this.B2 == 'UAH') {
      this.result = this.cJson.rates.UAH * (this.amount);
    }
    if (this.B2 == 'UGX') {
      this.result = this.cJson.rates.UGX * (this.amount);
    }
    if (this.B2 == 'UYU') {
      this.result = this.cJson.rates.UYU * (this.amount);
    }
    if (this.B2 == 'UZS') {
      this.result = this.cJson.rates.UZS * (this.amount);
    }
    if (this.B2 == 'VEF') {
      this.result = this.cJson.rates.VEF * (this.amount);
    }
    if (this.B2 == 'VES') {
      this.result = this.cJson.rates.VES * (this.amount);
    }
    if (this.B2 == 'VND') {
      this.result = this.cJson.rates.VND * (this.amount);
    }
    if (this.B2 == 'VUV') {
      this.result = this.cJson.rates.VUV * (this.amount);
    }
    if (this.B2 == 'WST') {
      this.result = this.cJson.rates.WST * (this.amount);
    }
    if (this.B2 == 'XAF') {
      this.result = this.cJson.rates.XAF * (this.amount);
    }
    if (this.B2 == 'XAG') {
      this.result = this.cJson.rates.XAG * (this.amount);
    }
    if (this.B2 == 'XAU') {
      this.result = this.cJson.rates.XAU * (this.amount);
    }
    if (this.B2 == 'XCD') {
      this.result = this.cJson.rates.XCD * (this.amount);
    }
    if (this.B2 == 'XDR') {
      this.result = this.cJson.rates.XDR * (this.amount);
    }
    if (this.B2 == 'XOF') {
      this.result = this.cJson.rates.XOF * (this.amount);
    }
    if (this.B2 == 'XPF') {
      this.result = this.cJson.rates.XPF * (this.amount);
    }
    if (this.B2 == 'YER') {
      this.result = this.cJson.rates.YER * (this.amount);
    }
    if (this.B2 == 'ZAR') {
      this.result = this.cJson.rates.ZAR * (this.amount);
    }
    if (this.B2 == 'ZMK') {
      this.result = this.cJson.rates.ZMK * (this.amount);
    }
    if (this.B2 == 'ZMW') {
      this.result = this.cJson.rates.ZMW * (this.amount);
    }
    if (this.B2 == 'ZWL') {
      this.result = this.cJson.rates.ZWL * (this.amount);
    }


   //**********************************************************************

    if (this.A1 == 'USD' && this.B2 == 'EGP') {
      this.result = (this.cJson.rates.EGP /this.cJson.rates.USD)  * (this.amount);
    }
    if (this.A1 == 'USD' && this.B2 == 'EUR') {
      this.result = (this.cJson.rates.EUR /this.cJson.rates.USD)  * (this.amount);
    }
    if (this.A1 == 'USD' && this.B2 == 'GBP') {
      this.result = (this.cJson.rates.GBP /this.cJson.rates.USD)  * (this.amount);
    }

    if (this.A1 == 'EGP' && this.B2 == 'USD') {
      this.result = (this.cJson.rates.USD/this.cJson.rates.EGP)  * (this.amount);
    }
    if (this.A1 == 'EGP' && this.B2 == 'EUR') {
      this.result = (this.cJson.rates.EUR/this.cJson.rates.EGP)  * (this.amount);
    }
    if (this.A1 == 'EGP' && this.B2 == 'GBP') {
      this.result = (this.cJson.rates.GBP/this.cJson.rates.EGP)  * (this.amount);
    }

    if (this.A1 == 'GBP' && this.B2 == 'USD') {
      this.result = (this.cJson.rates.USD/this.cJson.rates.GBP)  * (this.amount);
    }
    if (this.A1 == 'GBP' && this.B2 == 'EUR') {
      this.result = (this.cJson.rates.EUR/this.cJson.rates.GBP)  * (this.amount);
    }
    if (this.A1 == 'GBP' && this.B2 == 'EGP') {
      this.result = (this.cJson.rates.EGP/this.cJson.rates.GBP)  * (this.amount);
    }

   /*  if (this.A1 == 'EUR') {
      this.result = (1/this.cJson.rates.EUR) * (this.amount);
    } */

    if (this.A1 == 'AED') {
      this.result = (1/this.cJson.rates.AED)  * (this.amount);
    }
    if (this.A1 == 'AFN') {
      this.result = (1/this.cJson.rates.AFN)  * (this.amount);
    }
    if (this.A1 == 'ALL') {
      this.result = (1/this.cJson.rates.ALL) * (this.amount);
    }
    if (this.A1 == 'AMD') {
      this.result = (1/this.cJson.rates.AMD)  * (this.amount);
    }
    if (this.A1 == 'ANG') {
      this.result = (1/this.cJson.rates.ANG)  * (this.amount);
    }
    if (this.A1 == 'AOA') {
      this.result = (1/this.cJson.rates.AOA)  * (this.amount);
    }
    if (this.A1 == 'ARS') {
      this.result = (1/this.cJson.rates.ARS)  * (this.amount);
    }
    if (this.A1 == 'AUD') {
      this.result = (1/this.cJson.rates.AUD) * (this.amount);
    }
    if (this.A1 == 'AWG') {
      this.result = (1/this.cJson.rates.AWG)  * (this.amount);
    }
    if (this.A1 == 'AZN') {
      this.result = (1/this.cJson.rates.AZN)  * (this.amount);
    }
    if (this.A1 == 'BAM') {
      this.result = (1/this.cJson.rates.BAM) * (this.amount);
    }
    if (this.A1 == 'BBD') {
      this.result = (1/this.cJson.rates.BBD)  * (this.amount);
    }
    if (this.A1 == 'BDT') {
      this.result = (1/this.cJson.rates.BDT)  * (this.amount);
    }
    if (this.A1 == 'BGN') {
      this.result = (1/this.cJson.rates.BGN) * (this.amount);
    }
    if (this.A1 == 'BHD') {
      this.result = (1/this.cJson.rates.BHD)  * (this.amount);
    }
    if (this.A1 == 'BIF') {
      this.result = (1/this.cJson.rates.BIF)  * (this.amount);
    }
    if (this.A1 == 'BMD') {
      this.result = (1/this.cJson.rates.BMD) * (this.amount);
    }
    if (this.A1 == 'BND') {
      this.result = (1/this.cJson.rates.BND)  * (this.amount);
    }
    if (this.A1 == 'BOB') {
      this.result = (1/this.cJson.rates.BOB)  * (this.amount);
    }
    if (this.A1 == 'BRL') {
      this.result = (1/this.cJson.rates.BRL) * (this.amount);
    }
    if (this.A1 == 'BSD') {
      this.result = (1/this.cJson.rates.BSD)  * (this.amount);
    }
    if (this.A1 == 'BTC') {
      this.result = (1/this.cJson.rates.BTC)  * (this.amount);
    }
    if (this.A1 == 'BTN') {
      this.result = (1/this.cJson.rates.BTN) * (this.amount);
    }
    if (this.A1 == 'BWP') {
      this.result = (1/this.cJson.rates.BWP)  * (this.amount);
    }
    if (this.A1 == 'BYN') {
      this.result = (1/this.cJson.rates.BYN)  * (this.amount);
    }
    if (this.A1 == 'BYR') {
      this.result = (1/this.cJson.rates.BYR) * (this.amount);
    }
    if (this.A1 == 'BZD') {
      this.result = (1/this.cJson.rates.BZD)  * (this.amount);
    }
    if (this.A1 == 'CAD') {
      this.result = (1/this.cJson.rates.CAD)  * (this.amount);
    }
    if (this.A1 == 'CDF') {
      this.result = (1/this.cJson.rates.CDF) * (this.amount);
    }
    if (this.A1 == 'CHF') {
      this.result = (1/this.cJson.rates.CHF)  * (this.amount);
    }
    if (this.A1 == 'CLF') {
      this.result = (1/this.cJson.rates.CLF)  * (this.amount);
    }
    if (this.A1 == 'CLP') {
      this.result = (1/this.cJson.rates.CLP) * (this.amount);
    }
    if (this.A1 == 'CNY') {
      this.result = (1/this.cJson.rates.CNY) * (this.amount);
    }
    if (this.A1 == 'COP') {
      this.result = (1/this.cJson.rates.COP)  * (this.amount);
    }
    if (this.A1 == 'CRC') {
      this.result = (1/this.cJson.rates.CRC) * (this.amount);
    }
    if (this.A1 == 'CUC') {
      this.result = (1/this.cJson.rates.CUC)  * (this.amount);
    }
    if (this.A1 == 'CUP') {
      this.result = (1/this.cJson.rates.CUP)  * (this.amount);
    }
    if (this.A1 == 'CVE') {
      this.result = (1/this.cJson.rates.CVE) * (this.amount);
    }
    if (this.A1 == 'CZK') {
      this.result = (1/this.cJson.rates.CZK)  * (this.amount);
    }
    if (this.A1 == 'DJF') {
      this.result = (1/this.cJson.rates.DJF)  * (this.amount);
    }
    if (this.A1 == 'DKK') {
      this.result = (1/this.cJson.rates.DKK) * (this.amount);
    }
    if (this.A1 == 'DOP') {
      this.result = (1/this.cJson.rates.DOP)  * (this.amount);
    }
    if (this.A1 == 'DZD') {
      this.result = (1/this.cJson.rates.DZD)  * (this.amount);
    }
    if (this.A1 == 'ERN') {
      this.result = (1/this.cJson.rates.ERN) * (this.amount);
    }
    if (this.A1 == 'ETB') {
      this.result = (1/this.cJson.rates.ETB)  * (this.amount);
    }
    if (this.A1 == 'FJD') {
      this.result = (1/this.cJson.rates.FJD)  * (this.amount);
    }
    if (this.A1 == 'FKP') {
      this.result = (1/this.cJson.rates.FKP) * (this.amount);
    }



    if (this.A1 == 'GEL') {
      this.result = (1/this.cJson.rates.GEL)  * (this.amount);
    }
    if (this.A1 == 'GGP') {
      this.result = (1/this.cJson.rates.GGP) * (this.amount);
    }
    if (this.A1 == 'GHS') {
      this.result = (1/this.cJson.rates.GHS)  * (this.amount);
    }
    if (this.A1 == 'GIP') {
      this.result = (1/this.cJson.rates.GIP) * (this.amount);
    }
    if (this.A1 == 'GMD') {
      this.result = (1/this.cJson.rates.GMD)  * (this.amount);
    }
    if (this.A1 == 'GNF') {
      this.result = (1/this.cJson.rates.GNF) * (this.amount);
    }
    if (this.A1 == 'GTQ') {
      this.result = (1/this.cJson.rates.GTQ)  * (this.amount);
    }
    if (this.A1 == 'GYD') {
      this.result = (1/this.cJson.rates.GYD) * (this.amount);
    }
    if (this.A1 == 'HKD') {
      this.result = (1/this.cJson.rates.HKD)  * (this.amount);
    }
    if (this.A1 == 'HNL') {
      this.result = (1/this.cJson.rates.HNL) * (this.amount);
    }
    if (this.A1 == 'HRK') {
      this.result = (1/this.cJson.rates.HRK)  * (this.amount);
    }
    if (this.A1 == 'HTG') {
      this.result = (1/this.cJson.rates.HTG) * (this.amount);
    }
    if (this.A1 == 'HUF') {
      this.result = (1/this.cJson.rates.HUF)  * (this.amount);
    }
    if (this.A1 == 'IDR') {
      this.result = (1/this.cJson.rates.IDR) * (this.amount);
    }
    if (this.A1 == 'ILS') {
      this.result = (1/this.cJson.rates.ILS)  * (this.amount);
    }
    if (this.A1 == 'IMP') {
      this.result = (1/this.cJson.rates.IMP) * (this.amount);
    }
    if (this.A1 == 'INR') {
      this.result = (1/this.cJson.rates.INR)  * (this.amount);
    }
    if (this.A1 == 'IQD') {
      this.result = (1/this.cJson.rates.IQD) * (this.amount);
    }
    if (this.A1 == 'IRR') {
      this.result = (1/this.cJson.rates.IRR)  * (this.amount);
    }
    if (this.A1 == 'ISK') {
      this.result = (1/this.cJson.rates.ISK) * (this.amount);
    }
    if (this.A1 == 'JEP') {
      this.result = (1/this.cJson.rates.JEP)  * (this.amount);
    }
    if (this.A1 == 'JMD') {
      this.result = (1/this.cJson.rates.JMD) * (this.amount);
    }
    if (this.A1 == 'JOD') {
      this.result = (1/this.cJson.rates.JOD) * (this.amount);
    }
    if (this.A1 == 'JPY') {
      this.result = (1/this.cJson.rates.JPY) * (this.amount);
    }
    if (this.A1 == 'KES') {
      this.result = (1/this.cJson.rates.KES) * (this.amount);
    }
    if (this.A1 == 'KGS') {
      this.result = (1/this.cJson.rates.KGS) * (this.amount);
    }
    if (this.A1 == 'KHR') {
      this.result = (1/this.cJson.rates.KHR) * (this.amount);
    }
    if (this.A1 == 'KMF') {
      this.result = (1/this.cJson.rates.KMF) * (this.amount);
    }
    if (this.A1 == 'KPW') {
      this.result = (1/this.cJson.rates.KPW) * (this.amount);
    }
    if (this.A1 == 'KRW') {
      this.result = (1/this.cJson.rates.KRW) * (this.amount);
    }
    if (this.A1 == 'KWD') {
      this.result = (1/this.cJson.rates.KWD) * (this.amount);
    }
    if (this.A1 == 'KYD') {
      this.result = (1/this.cJson.rates.KYD) * (this.amount);
    }
    if (this.A1 == 'KZT') {
      this.result = (1/this.cJson.rates.KZT) * (this.amount);
    }
    if (this.A1 == 'LAK') {
      this.result = (1/this.cJson.rates.LAK) * (this.amount);
    }
    if (this.A1 == 'LBP') {
      this.result = (1/this.cJson.rates.LBP) * (this.amount);
    }
    if (this.A1 == 'LKR') {
      this.result = (1/this.cJson.rates.LKR) * (this.amount);
    }
    if (this.A1 == 'LRD') {
      this.result = (1/this.cJson.rates.LRD) * (this.amount);
    }
    if (this.A1 == 'LSL') {
      this.result = (1/this.cJson.rates.LSL) * (this.amount);
    }
    if (this.A1 == 'LTL') {
      this.result = (1/this.cJson.rates.LTL) * (this.amount);
    }
    if (this.A1 == 'LVL') {
      this.result = (1/this.cJson.rates.LVL) * (this.amount);
    }
    if (this.A1 == 'LYD') {
      this.result = (1/this.cJson.rates.LYD) * (this.amount);
    }
    if (this.A1 == 'MAD') {
      this.result = (1/this.cJson.rates.MAD) * (this.amount);
    }
    if (this.A1 == 'MDL') {
      this.result = (1/this.cJson.rates.MDL) * (this.amount);
    }
    if (this.A1 == 'MGA') {
      this.result = (1/this.cJson.rates.MGA) * (this.amount);
    }
    if (this.A1 == 'MKD') {
      this.result = (1/this.cJson.rates.MKD) * (this.amount);
    }
    if (this.A1 == 'MMK') {
      this.result = (1/this.cJson.rates.MMK) * (this.amount);
    }
    if (this.A1 == 'MNT') {
      this.result = (1/this.cJson.rates.MNT) * (this.amount);
    }
    if (this.A1 == 'MOP') {
      this.result = (1/this.cJson.rates.MOP) * (this.amount);
    }
    if (this.A1 == 'MRO') {
      this.result = (1/this.cJson.rates.MRO) * (this.amount);
    }
    if (this.A1 == 'MUR') {
      this.result = (1/this.cJson.rates.MUR) * (this.amount);
    }
    if (this.A1 == 'MVR') {
      this.result = (1/this.cJson.rates.MVR) * (this.amount);
    }
    if (this.A1 == 'MWK') {
      this.result = (1/this.cJson.rates.MWK) * (this.amount);
    }
    if (this.A1 == 'MXN') {
      this.result = (1/this.cJson.rates.MXN) * (this.amount);
    }
    if (this.A1 == 'MYR') {
      this.result = (1/this.cJson.rates.MYR) * (this.amount);
    }
    if (this.A1 == 'MZN') {
      this.result = (1/this.cJson.rates.MZN) * (this.amount);
    }
    if (this.A1 == 'NAD') {
      this.result = (1/this.cJson.rates.NAD) * (this.amount);
    }
    if (this.A1 == 'NGN') {
      this.result = (1/this.cJson.rates.NGN) * (this.amount);
    }
    if (this.A1 == 'NIO') {
      this.result = (1/this.cJson.rates.NIO) * (this.amount);
    }
    if (this.A1 == 'NOK') {
      this.result = (1/this.cJson.rates.NOK) * (this.amount);
    }
    if (this.A1 == 'NPR') {
      this.result = (1/this.cJson.rates.NPR) * (this.amount);
    }
    if (this.A1 == 'NZD') {
      this.result = (1/this.cJson.rates.NZD) * (this.amount);
    }
    if (this.A1 == 'OMR') {
      this.result = (1/this.cJson.rates.OMR) * (this.amount);
    }
    if (this.A1 == 'PAB') {
      this.result = (1/this.cJson.rates.PAB) * (this.amount);
    }
    if (this.A1 == 'PEN') {
      this.result = (1/this.cJson.rates.PEN) * (this.amount);
    }
    if (this.A1 == 'PGK') {
      this.result = (1/this.cJson.rates.PGK) * (this.amount);
    }
    if (this.A1 == 'PHP') {
      this.result = (1/this.cJson.rates.PHP) * (this.amount);
    }
    if (this.A1 == 'PKR') {
      this.result = (1/this.cJson.rates.PKR) * (this.amount);
    }
    if (this.A1 == 'PLN') {
      this.result = (1/this.cJson.rates.PLN) * (this.amount);
    }
    if (this.A1 == 'PYG') {
      this.result = (1/this.cJson.rates.PYG) * (this.amount);
    }
    if (this.A1 == 'QAR') {
      this.result = (1/this.cJson.rates.QAR) * (this.amount);
    }
    if (this.A1 == 'RON') {
      this.result = (1/this.cJson.rates.RON) * (this.amount);
    }
    if (this.A1 == 'RSD') {
      this.result = (1/this.cJson.rates.RSD) * (this.amount);
    }
    if (this.A1 == 'RUB') {
      this.result = (1/this.cJson.rates.RUB) * (this.amount);
    }
    if (this.A1 == 'RWF') {
      this.result = (1/this.cJson.rates.RWF) * (this.amount);
    }
    if (this.A1 == 'SAR') {
      this.result = (1/this.cJson.rates.SAR) * (this.amount);
    }
    if (this.A1 == 'SBD') {
      this.result = (1/this.cJson.rates.SBD) * (this.amount);
    }
    if (this.A1 == 'SCR') {
      this.result = (1/this.cJson.rates.SCR) * (this.amount);
    }
    if (this.A1 == 'SDG') {
      this.result = (1/this.cJson.rates.SDG) * (this.amount);
    }
    if (this.A1 == 'SEK') {
      this.result = (1/this.cJson.rates.SEK) * (this.amount);
    }
    if (this.A1 == 'SGD') {
      this.result = (1/this.cJson.rates.SGD) * (this.amount);
    }
    if (this.A1 == 'SHP') {
      this.result = (1/this.cJson.rates.SHP) * (this.amount);
    }
    if (this.A1 == 'SLE') {
      this.result = (1/this.cJson.rates.SLE) * (this.amount);
    }
    if (this.A1 == 'SLL') {
      this.result = (1/this.cJson.rates.SLL) * (this.amount);
    }
    if (this.A1 == 'SOS') {
      this.result = (1/this.cJson.rates.SOS) * (this.amount);
    }
    if (this.A1 == 'SRD') {
      this.result = (1/this.cJson.rates.SRD) * (this.amount);
    }
    if (this.A1 == 'STD') {
      this.result = (1/this.cJson.rates.STD) * (this.amount);
    }
    if (this.A1 == 'SVC') {
      this.result = (1/this.cJson.rates.SVC) * (this.amount);
    }
    if (this.A1 == 'SYP') {
      this.result = (1/this.cJson.rates.SYP) * (this.amount);
    }
    if (this.A1 == 'SZL') {
      this.result = (1/this.cJson.rates.SZL) * (this.amount);
    }
    if (this.A1 == 'THB') {
      this.result = (1/this.cJson.rates.THB) * (this.amount);
    }
    if (this.A1 == 'TJS') {
      this.result = (1/this.cJson.rates.TJS) * (this.amount);
    }
    if (this.A1 == 'TMT') {
      this.result = (1/this.cJson.rates.TMT) * (this.amount);
    }
    if (this.A1 == 'TND') {
      this.result = (1/this.cJson.rates.TND) * (this.amount);
    }
    if (this.A1 == 'TOP') {
      this.result = (1/this.cJson.rates.TOP) * (this.amount);
    }
    if (this.A1 == 'TRY') {
      this.result = (1/this.cJson.rates.TRY) * (this.amount);
    }
    if (this.A1 == 'TTD') {
      this.result = (1/this.cJson.rates.TTD) * (this.amount);
    }
    if (this.A1 == 'TWD') {
      this.result = (1/this.cJson.rates.TWD) * (this.amount);
    }
    if (this.A1 == 'TZS') {
      this.result = (1/this.cJson.rates.TZS) * (this.amount);
    }
    if (this.A1 == 'UAH') {
      this.result = (1/this.cJson.rates.UAH) * (this.amount);
    }
    if (this.A1 == 'UGX') {
      this.result = (1/this.cJson.rates.UGX) * (this.amount);
    }
    if (this.A1 == 'UYU') {
      this.result = (1/this.cJson.rates.UYU) * (this.amount);
    }
    if (this.A1 == 'UZS') {
      this.result = (1/this.cJson.rates.UZS) * (this.amount);
    }
    if (this.A1 == 'VEF') {
      this.result = (1/this.cJson.rates.VEF) * (this.amount);
    }
    if (this.A1 == 'VES') {
      this.result = (1/this.cJson.rates.VES) * (this.amount);
    }
    if (this.A1 == 'VND') {
      this.result = (1/this.cJson.rates.VND) * (this.amount);
    }
    if (this.A1 == 'VUV') {
      this.result = (1/this.cJson.rates.VUV) * (this.amount);
    }
    if (this.A1 == 'WST') {
      this.result = (1/this.cJson.rates.WST) * (this.amount);
    }
    if (this.A1 == 'XAF') {
      this.result = (1/this.cJson.rates.XAF) * (this.amount);
    }
    if (this.A1 == 'XAG') {
      this.result = (1/this.cJson.rates.XAG) * (this.amount);
    }
    if (this.A1 == 'XAU') {
      this.result = (1/this.cJson.rates.XAU) * (this.amount);
    }
    if (this.A1 == 'XCD') {
      this.result = (1/this.cJson.rates.XCD) * (this.amount);
    }
    if (this.A1 == 'XDR') {
      this.result = (1/this.cJson.rates.XDR) * (this.amount);
    }
    if (this.A1 == 'XOF') {
      this.result = (1/this.cJson.rates.XOF) * (this.amount);
    }
    if (this.A1 == 'XPF') {
      this.result = (1/this.cJson.rates.XPF) * (this.amount);
    }
    if (this.A1 == 'YER') {
      this.result = (1/this.cJson.rates.YER) * (this.amount);
    }
    if (this.A1 == 'ZAR') {
      this.result = (1/this.cJson.rates.ZAR) * (this.amount);
    }
    if (this.A1 == 'ZMK') {
      this.result = (1/this.cJson.rates.ZMK) * (this.amount);
    }
    if (this.A1 == 'ZMW') {
      this.result = (1/this.cJson.rates.ZMW) * (this.amount);
    }
    if (this.A1 == 'ZWL') {
      this.result = (1/this.cJson.rates.ZWL) * (this.amount);
    }
/////////


  }


  fulltitle_f() {
    if (this.A1 == "USD") {
      this.fulltitle = "United States dollar $"
    }
    if (this.A1 == 'EGP') {
      this.fulltitle = "Egyptian pound £"
    }
    if (this.A1 == 'EUR') {
      this.fulltitle = "European Union Euro €"
    }
    if (this.A1 == 'GBP') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AED') {
      this.fulltitle = "United Arab Emirates dirham د.إ";
    }
    if (this.A1 == 'AFN') {
      this.fulltitle = "Afghan afghani ؋"
    }
    if (this.A1 == 'ALL') {
      this.fulltitle = "Albanian lek L"
    }
    if (this.A1 == 'AMD') {
      this.fulltitle = "Armenian dram ֏"    
    }
    if (this.A1 == 'ANG') {
      this.fulltitle = "Netherlands Antillean guilder ƒ"
    }
    if (this.A1 == 'AOA') {
      this.fulltitle = "Angolan kwanza Kz"
    }
    if (this.A1 == 'ARS') {
      this.fulltitle = "Argentine peso $"
    }
    if (this.A1 == 'AUD') {
      this.fulltitle = "Australian dollar $"
    }
    if (this.A1 == 'AWG') {
      this.fulltitle = "Aruban florin ƒ"
    }
    if (this.A1 == 'AZN') {
      this.fulltitle = "Azerbaijani manat ₼"
    }
    if (this.A1 == 'BAM') {
      this.fulltitle = "Bosnia and Herzegovina convertible mark"
    }
    if (this.A1 == 'BBD') {
      this.fulltitle = "Barbadian dollar $"
    }
    if (this.A1 == 'BDT') {
      this.fulltitle = "Bangladeshi taka ৳"
    }
    if (this.A1 == 'BGN') {
      this.fulltitle = "Bulgarian lev лв"
    }
    if (this.A1 == 'BHD') {
      this.fulltitle = "Bahraini dinar د.ب"
    }
    if (this.A1 == 'BIF') {
      this.fulltitle = "Burundian franc Fr"
    }
    if (this.A1 == 'BMD') {
      this.fulltitle = "Bermudian dollar $"
    }
    if (this.A1 == 'BND') {
      this.fulltitle = "Brunei dollar $"
    }
    if (this.A1 == 'BOB') {
      this.fulltitle = "Bolivian boliviano Bs."
    }
    if (this.A1 == 'BRL') {
      this.fulltitle = "Brazilian real R$"
    }
    if (this.A1 == 'BSD') {
      this.fulltitle = "Bahamian dollar $"
    }
    if (this.A1 == 'BTC') {
      this.fulltitle = "Bitcoin ₿"
    }
    if (this.A1 == 'BTN') {
      this.fulltitle = "Bhutanese ngultrum Nu."
    }
    if (this.A1 == 'BWP') {
      this.fulltitle = "Botswana pula P"
    }
    if (this.A1 == 'BYN') {
      this.fulltitle = "Belarusian ruble Br"
    }
    if (this.A1 == 'BYR') {
      this.fulltitle = "Bulgarian Lev"
    }
    if (this.A1 == 'BZD') {
      this.fulltitle = "Belize dollar $"
    }
    if (this.A1 == 'CAD') {
      this.fulltitle = "Canadian dollar $"
    }
    if (this.A1 == 'CDF') {
      this.fulltitle = "Congolese franc FC"
    }
    if (this.A1 == 'CHF') {
      this.fulltitle = "Swiss franc Fr."
    }
    if (this.A1 == 'CLF') {
      this.fulltitle = "Chilean Unit of Account (UF)"
    }
    if (this.A1 == 'CLP') {
      this.fulltitle = "Chilean peso $"
    }
    if (this.A1 == 'CNY') {
      this.fulltitle = "Chinese yuan ¥"
    }
    if (this.A1 == 'COP') {
      this.fulltitle = "Colombian peso $"
    }
    if (this.A1 == 'CRC') {
      this.fulltitle = "Costa Rican colón ₡"
    }
    if (this.A1 == 'CUC') {
      this.fulltitle = "Cuban convertible peso $"
    }
    if (this.A1 == 'CUP') {
      this.fulltitle = "Cuban peso $"
    }
    if (this.A1 == 'CVE') {
      this.fulltitle = "Cape Verdean escudo Esc"
    }
    if (this.A1 == 'CZK') {
      this.fulltitle = "Czech koruna Kč"
    }
    if (this.A1 == 'DJF') {
      this.fulltitle = "Djiboutian franc Fr"
    }
    if (this.A1 == 'DKK') {
      this.fulltitle = "Danish krone kr"
    }
    if (this.A1 == 'DOP') {
      this.fulltitle = "Dominican peso $"
    }
    if (this.A1 == 'DZD') {
      this.fulltitle = "Algerian dinar دج"
    }
    if (this.A1 == 'ERN') {
      this.fulltitle = "Eritrean nakfa Nfk"
    }
    if (this.A1 == 'ETB') {
      this.fulltitle = "Ethiopian birr Br"
    }
    if (this.A1 == 'FJD') {
      this.fulltitle = "Fijian dollar $"
    }
    if (this.A1 == 'FKP') {
      this.fulltitle = "Falkland Islands pound £"
    }



    if (this.A1 == 'GEL') {
      this.fulltitle = "lari ₾"
    }
    if (this.A1 == 'GGP') {
      this.fulltitle = "Guernsey pound £"
    }
    if (this.A1 == 'GHS') {
      this.fulltitle = "Ghanaian cedi ₵"
    }
    if (this.A1 == 'GIP') {
      this.fulltitle = "Gibraltar pound £"
    }
    if (this.A1 == 'GMD') {
      this.fulltitle = "dalasi D"
    }
    if (this.A1 == 'GNF') {
      this.fulltitle = "Guinean franc Fr"
    }
    if (this.A1 == 'GTQ') {
      this.fulltitle = "Guatemalan quetzal Q"
    }
    if (this.A1 == 'GYD') {
      this.fulltitle = "Guyanese dollar $"
    }
    if (this.A1 == 'HKD') {
      this.fulltitle = "Hong Kong dollar $"
    }
    if (this.A1 == 'HNL') {
      this.fulltitle = "Honduran lempira L"
    }
    if (this.A1 == 'HRK') {
      this.fulltitle = "Croatian kuna kn"
    }
    if (this.A1 == 'HTG') {
      this.fulltitle = "Haitian gourde G"
    }
    if (this.A1 == 'HUF') {
      this.fulltitle = "Hungarian forint Ft"
    }
    if (this.A1 == 'IDR') {
      this.fulltitle = "Indonesian rupiah Rp"
    }
    if (this.A1 == 'ILS') {
      this.fulltitle = "Nothing"
    }
    if (this.A1 == 'IMP') {
      this.fulltitle = "Manx pound £"
    }
    if (this.A1 == 'INR') {
      this.fulltitle = "Indian rupee ₹"
    }
    if (this.A1 == 'IQD') {
      this.fulltitle = "Iraqi dinar ع.د"
    }
    if (this.A1 == 'IRR') {
      this.fulltitle = "Iranian rial ﷼"
    }
    if (this.A1 == 'ISK') {
      this.fulltitle = "Icelandic króna kr"
    }
    if (this.A1 == 'JEP') {
      this.fulltitle = "Jersey pound £"
    }
    if (this.A1 == 'JMD') {
      this.fulltitle = "Jamaican dollar $"
    }
    if (this.A1 == 'JOD') {
      this.fulltitle = "Jordanian dinar JD"
    }
    if (this.A1 == 'JPY') {
      this.fulltitle = "Japanese yen ¥"
    }
    if (this.A1 == 'KES') {
      this.fulltitle = "Kenyan shilling Sh"
    }
    if (this.A1 == 'KGS') {
      this.fulltitle = "Kyrgyzstani som с"
    }
    if (this.A1 == 'KHR') {
      this.fulltitle = "Cambodian riel ៛"
    }
    if (this.A1 == 'KMF') {
      this.fulltitle = "Comorian franc Fr"
    }
    if (this.A1 == 'KPW') {
      this.fulltitle = "North Korean won ₩"
    }
    if (this.A1 == 'KRW') {
      this.fulltitle = "South Korean won ₩"
    }
    if (this.A1 == 'KWD') {
      this.fulltitle = "Kuwaiti dinar د.ك"
    }
    if (this.A1 == 'KYD') {
      this.fulltitle = "Cayman Islands dollar $"
    }
    if (this.A1 == 'KZT') {
      this.fulltitle = "Kazakhstani tenge ₸"
    }
    if (this.A1 == 'LAK') {
      this.fulltitle = "Lao kip ₭"
    }
    if (this.A1 == 'LBP') {
      this.fulltitle = "Lebanese pound "
    }
    if (this.A1 == 'LKR') {
      this.fulltitle = "Sri Lankan rupee Rs රු"
    }
    if (this.A1 == 'LRD') {
      this.fulltitle = "Liberian dollar $"
    }
    if (this.A1 == 'LSL') {
      this.fulltitle = "Lesotho loti L"
    }
    if (this.A1 == 'LTL') {
      this.fulltitle = "Lithuanian Litas"
    }
    if (this.A1 == 'LVL') {
      this.fulltitle = "Latvian lats"
    }
    if (this.A1 == 'LYD') {
      this.fulltitle = "Libyan dinar"
    }
    if (this.A1 == 'MAD') {
      this.fulltitle = "Moroccan dirham DH"
    }
    if (this.A1 == 'MDL') {
      this.fulltitle = "Moldovan leu"
    }
    if (this.A1 == 'MGA') {
      this.fulltitle = "Malagasy ariary"
    }
    if (this.A1 == 'MKD') {
      this.fulltitle = "denar den"
    }
    if (this.A1 == 'MMK') {
      this.fulltitle = "Burmese kyat Ks"
    }
    if (this.A1 == 'MNT') {
      this.fulltitle = "Mongolian tögrög ₮"
    }
    if (this.A1 == 'MOP') {
      this.fulltitle = "Macanese pataca P"
    }
    if (this.A1 == 'MRO') {
      this.fulltitle = "Mauritanian ouguiya"
    }
    if (this.A1 == 'MUR') {
      this.fulltitle = "Mauritian rupee ₨"
    }
    if (this.A1 == 'MVR') {
      this.fulltitle = "Maldivian rufiyaa .ރ"
    }
    if (this.A1 == 'MWK') {
      this.fulltitle = "Malawian kwacha"
    }
    if (this.A1 == 'MXN') {
      this.fulltitle = "Mexican peso"
    }
    if (this.A1 == 'MYR') {
      this.fulltitle = "Malaysian ringgit RM"
    }
    if (this.A1 == 'MZN') {
      this.fulltitle = " Mozambican metical MT"
    }
    if (this.A1 == 'NAD') {
      this.fulltitle = "Namibian Dollar"
    }
    if (this.A1 == 'NGN') {
      this.fulltitle = "Nigerian naira ₦"
    }
    if (this.A1 == 'NIO') {
      this.fulltitle = "Nicaraguan córdoba C$"
    }
    if (this.A1 == 'NOK') {
      this.fulltitle = "Norwegian krone"
    }
    if (this.A1 == 'NPR') {
      this.fulltitle = "Nepalese rupee ₨"
    }
    if (this.A1 == 'NZD') {
      this.fulltitle = "New Zealand dollar $"
    }
    if (this.A1 == 'OMR') {
      this.fulltitle = "Omani rial ر.ع."
    }
    if (this.A1 == 'PAB') {
      this.fulltitle = "Panamanian balboa B/."
    }
    if (this.A1 == 'PEN') {
      this.fulltitle = "Peruvian sol S/"
    }
    if (this.A1 == 'PGK') {
      this.fulltitle = "Papua New Guinean kina K"
    }
    if (this.A1 == 'PHP') {
      this.fulltitle = "Philippine peso ₱"
    }
    if (this.A1 == 'PKR') {
      this.fulltitle = "Pakistani rupee ₨"
    }
    if (this.A1 == 'PLN') {
      this.fulltitle = "Polish złoty zł"
    }
    if (this.A1 == 'PYG') {
      this.fulltitle = "Paraguayan guaraní ₲"
    }
    if (this.A1 == 'QAR') {
      this.fulltitle = "Qatari riyal ر.ق"
    }
    if (this.A1 == 'RON') {
      this.fulltitle = "Romanian leu "
    }
    if (this.A1 == 'RSD') {
      this.fulltitle = "Serbian dinar дин."
    }
    if (this.A1 == 'RUB') {
      this.fulltitle = "Russian ruble ₽"
    }
    if (this.A1 == 'RWF') {
      this.fulltitle = "Rwandan franc"
    }
    if (this.A1 == 'SAR') {
      this.fulltitle = "Saudi riyal"
    }
    if (this.A1 == 'SBD') {
      this.fulltitle = "Solomon Islands dollar"
    }
    if (this.A1 == 'SCR') {
      this.fulltitle = "Seychellois rupee"
    }
    if (this.A1 == 'SDG') {
      this.fulltitle = "Sudanese pound"
    }
    if (this.A1 == 'SEK') {
      this.fulltitle = "Swedish krona"
    }
    if (this.A1 == 'SGD') {
      this.fulltitle = "Singapore dollar $"
    }
    if (this.A1 == 'SHP') {
      this.fulltitle = "Saint Helena pound"
    }
    if (this.A1 == 'SLE') {
      this.fulltitle = "Sierra Leonean"
    }
    if (this.A1 == 'SLL') {
      this.fulltitle = "Sierra Leonean leone"
    }
    if (this.A1 == 'SOS') {
      this.fulltitle = "Somali shilling"
    }
    if (this.A1 == 'SRD') {
      this.fulltitle = "Surinamese dollar $"
    }
    if (this.A1 == 'STD') {
      this.fulltitle = "São Tomé and Príncipe dobra"
    }
    if (this.A1 == 'SVC') {
      this.fulltitle = "Salvadoran Colón"
    }
    if (this.A1 == 'SYP') {
      this.fulltitle = "Syrian pound"
    }
    if (this.A1 == 'SZL') {
      this.fulltitle = "Swazi lilangeni"
    }
    if (this.A1 == 'THB') {
      this.fulltitle = "Thai baht"
    }
    if (this.A1 == 'TJS') {
      this.fulltitle = "Tajikistani somoni"
    }
    if (this.A1 == 'TMT') {
      this.fulltitle = "Turkmenistan manat"
    }
    if (this.A1 == 'TND') {
      this.fulltitle = "Tunisian dinar"
    }
    if (this.A1 == 'TOP') {
      this.fulltitle = "Tongan paʻanga"
    }
    if (this.A1 == 'TRY') {
      this.fulltitle = "Turkish lira ₺"
    }
    if (this.A1 == 'TTD') {
      this.fulltitle = "Trinidad and Tobago dollar"
    }
    if (this.A1 == 'TWD') {
      this.fulltitle = "New Taiwan dollar"
    }
    if (this.A1 == 'TZS') {
      this.fulltitle = "Tanzanian shilling"
    }
    if (this.A1 == 'UAH') {
      this.fulltitle = "Ukrainian hryvnia ₴"
    }
    if (this.A1 == 'UGX') {
      this.fulltitle = "Ugandan shilling"
    }
    if (this.A1 == 'UYU') {
      this.fulltitle = "Uruguayan peso"
    }
    if (this.A1 == 'UZS') {
      this.fulltitle = "Uzbekistani soʻm"
    }
    if (this.A1 == 'VEF') {
      this.fulltitle = "Venezuelan bolívar"
    }
    if (this.A1 == 'VES') {
      this.fulltitle = "Venezuelan bolívar soberano"
    }
    if (this.A1 == 'VND') {
      this.fulltitle = "Vietnamese đồng ₫"
    }
    if (this.A1 == 'VUV') {
      this.fulltitle = "Vanuatu vatu Vt"
    }
    if (this.A1 == 'WST') {
      this.fulltitle = "Samoan tālā"
    }
    if (this.A1 == 'XAF') {
      this.fulltitle = "Central African CFA franc"
    }
    if (this.A1 == 'XAG') {
      this.fulltitle = "Silver Ounce"
    }
    if (this.A1 == 'XAU') {
      this.fulltitle = "Gold Ounce"
    }
    if (this.A1 == 'XCD') {
      this.fulltitle = "Eastern Caribbean dollar";
    }
    if (this.A1 == 'XDR') {
      this.fulltitle = "Special Drawing Rights"
    }
    if (this.A1 == 'XOF') {
      this.fulltitle = "West African CFA franc"
    }
    if (this.A1 == 'XPF') {
      this.fulltitle = "CFP franc"
    }
    if (this.A1 == 'YER') {
      this.fulltitle = "Yemeni rial"
    }
    if (this.A1 == 'ZAR') {
      this.fulltitle = "South African rand"
    }
    if (this.A1 == 'ZMK') {
      this.fulltitle = "Zambian Kwacha"
    }
    if (this.A1 == 'ZMW') {
      this.fulltitle = "Zambian Kwacha"
    }
    if (this.A1 == 'ZWL') {
      this.fulltitle = "Zimbabwean dollar $"
    }

  }


  //unless using this one the [subscription (subscribe)] will stack to infinity and beyond😌
  ngOnDestroy(): void {
    this.subscription_to_destroy.unsubscribe();
  }


}
