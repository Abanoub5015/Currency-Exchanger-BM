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

  currencies: any = [];


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

        this.currencies.push(key);
        this.c_name_chart = key;
        console.log(key);

        this.value = this.cJson.rates[key];
        this.currencies.push(this.value);
        this.c_price_chart = this.value;
        console.log(this.value);


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

      if (this.B2 == 'USD') {
        this.result = this.cJson.rates.USD * (this.amount);
      }

      if (this.B2 == 'EGP') {
        this.result = this.cJson.rates.EGP * (this.amount);
      }

      if (this.B2 == 'EUR') {
        this.result = this.cJson.rates.EUR * (this.amount);
      }


    })
  }

  swap() {
    let temp = this.B2;
    this.B2 = (this.A1);
    this.A1 = (temp);
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
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'ALL') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AMD') {
      this.fulltitle = "Pound sterling £"    
    }
    if (this.A1 == 'ANG') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AOA') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'ARS') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AUD') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AWG') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'AZN') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'BAM') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'BBD') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'BDT') {
      this.fulltitle = "Pound sterling £"
    }
    if (this.A1 == 'BGN') {
      this.result = (1 / this.cJson.rates.BGN) * (this.amount);
    }
    if (this.A1 == 'BHD') {
      this.result = (1 / this.cJson.rates.BHD) * (this.amount);
    }
    if (this.A1 == 'BIF') {
      this.result = (1 / this.cJson.rates.BIF) * (this.amount);
    }
    if (this.A1 == 'BMD') {
      this.result = (1 / this.cJson.rates.BMD) * (this.amount);
    }
    if (this.A1 == 'BND') {
      this.result = (1 / this.cJson.rates.BND) * (this.amount);
    }
    if (this.A1 == 'BOB') {
      this.result = (1 / this.cJson.rates.BOB) * (this.amount);
    }
    if (this.A1 == 'BRL') {
      this.result = (1 / this.cJson.rates.BRL) * (this.amount);
    }
    if (this.A1 == 'BSD') {
      this.result = (1 / this.cJson.rates.BSD) * (this.amount);
    }
    if (this.A1 == 'BTC') {
      this.result = (1 / this.cJson.rates.BTC) * (this.amount);
    }
    if (this.A1 == 'BTN') {
      this.result = (1 / this.cJson.rates.BTN) * (this.amount);
    }
    if (this.A1 == 'BWP') {
      this.result = (1 / this.cJson.rates.BWP) * (this.amount);
    }
    if (this.A1 == 'BYN') {
      this.result = (1 / this.cJson.rates.BYN) * (this.amount);
    }
    if (this.A1 == 'BYR') {
      this.result = (1 / this.cJson.rates.BYR) * (this.amount);
    }
    if (this.A1 == 'BZD') {
      this.result = (1 / this.cJson.rates.BZD) * (this.amount);
    }
    if (this.A1 == 'CAD') {
      this.result = (1 / this.cJson.rates.CAD) * (this.amount);
    }
    if (this.A1 == 'CDF') {
      this.result = (1 / this.cJson.rates.CDF) * (this.amount);
    }
    if (this.A1 == 'CHF') {
      this.result = (1 / this.cJson.rates.CHF) * (this.amount);
    }
    if (this.A1 == 'CLF') {
      this.result = (1 / this.cJson.rates.CLF) * (this.amount);
    }
    if (this.A1 == 'CLP') {
      this.result = (1 / this.cJson.rates.CLP) * (this.amount);
    }
    if (this.A1 == 'CNY') {
      this.result = (1 / this.cJson.rates.CNY) * (this.amount);
    }
    if (this.A1 == 'COP') {
      this.result = (1 / this.cJson.rates.COP) * (this.amount);
    }
    if (this.A1 == 'CRC') {
      this.result = (1 / this.cJson.rates.CRC) * (this.amount);
    }
    if (this.A1 == 'CUC') {
      this.result = (1 / this.cJson.rates.CUC) * (this.amount);
    }
    if (this.A1 == 'CUP') {
      this.result = (1 / this.cJson.rates.CUP) * (this.amount);
    }
    if (this.A1 == 'CVE') {
      this.result = (1 / this.cJson.rates.CVE) * (this.amount);
    }
    if (this.A1 == 'CZK') {
      this.result = (1 / this.cJson.rates.CZK) * (this.amount);
    }
    if (this.A1 == 'DJF') {
      this.result = (1 / this.cJson.rates.DJF) * (this.amount);
    }
    if (this.A1 == 'DKK') {
      this.result = (1 / this.cJson.rates.DKK) * (this.amount);
    }
    if (this.A1 == 'DOP') {
      this.result = (1 / this.cJson.rates.DOP) * (this.amount);
    }
    if (this.A1 == 'DZD') {
      this.result = (1 / this.cJson.rates.DZD) * (this.amount);
    }
    if (this.A1 == 'ERN') {
      this.result = (1 / this.cJson.rates.ERN) * (this.amount);
    }
    if (this.A1 == 'ETB') {
      this.result = (1 / this.cJson.rates.ETB) * (this.amount);
    }
    if (this.A1 == 'FJD') {
      this.result = (1 / this.cJson.rates.FJD) * (this.amount);
    }
    if (this.A1 == 'FKP') {
      this.result = (1 / this.cJson.rates.FKP) * (this.amount);
    }



    if (this.A1 == 'GEL') {
      this.result = (1 / this.cJson.rates.GEL) * (this.amount);
    }
    if (this.A1 == 'GGP') {
      this.result = (1 / this.cJson.rates.GGP) * (this.amount);
    }
    if (this.A1 == 'GHS') {
      this.result = (1 / this.cJson.rates.GHS) * (this.amount);
    }
    if (this.A1 == 'GIP') {
      this.result = (1 / this.cJson.rates.GIP) * (this.amount);
    }
    if (this.A1 == 'GMD') {
      this.result = (1 / this.cJson.rates.GMD) * (this.amount);
    }
    if (this.A1 == 'GNF') {
      this.result = (1 / this.cJson.rates.GNF) * (this.amount);
    }
    if (this.A1 == 'GTQ') {
      this.result = (1 / this.cJson.rates.GTQ) * (this.amount);
    }
    if (this.A1 == 'GYD') {
      this.result = (1 / this.cJson.rates.GYD) * (this.amount);
    }
    if (this.A1 == 'HKD') {
      this.result = (1 / this.cJson.rates.HKD) * (this.amount);
    }
    if (this.A1 == 'HNL') {
      this.result = (1 / this.cJson.rates.HNL) * (this.amount);
    }
    if (this.A1 == 'HRK') {
      this.result = (1 / this.cJson.rates.HRK) * (this.amount);
    }
    if (this.A1 == 'HTG') {
      this.result = (1 / this.cJson.rates.HTG) * (this.amount);
    }
    if (this.A1 == 'HUF') {
      this.result = (1 / this.cJson.rates.HUF) * (this.amount);
    }
    if (this.A1 == 'IDR') {
      this.result = (1 / this.cJson.rates.IDR) * (this.amount);
    }
    if (this.A1 == 'ILS') {
      this.result = (1 / this.cJson.rates.ILS) * (this.amount);
    }
    if (this.A1 == 'IMP') {
      this.result = (1 / this.cJson.rates.IMP) * (this.amount);
    }
    if (this.A1 == 'INR') {
      this.result = (1 / this.cJson.rates.INR) * (this.amount);
    }
    if (this.A1 == 'IQD') {
      this.result = (1 / this.cJson.rates.IQD) * (this.amount);
    }
    if (this.A1 == 'IRR') {
      this.result = (1 / this.cJson.rates.IRR) * (this.amount);
    }
    if (this.A1 == 'ISK') {
      this.result = (1 / this.cJson.rates.ISK) * (this.amount);
    }
    if (this.A1 == 'JEP') {
      this.result = (1 / this.cJson.rates.JEP) * (this.amount);
    }
    if (this.A1 == 'JMD') {
      this.result = (1 / this.cJson.rates.JMD) * (this.amount);
    }
    if (this.A1 == 'JOD') {
      this.result = (1 / this.cJson.rates.JOD) * (this.amount);
    }
    if (this.A1 == 'JPY') {
      this.result = (1 / this.cJson.rates.JPY) * (this.amount);
    }
    if (this.A1 == 'KES') {
      this.result = (1 / this.cJson.rates.KES) * (this.amount);
    }
    if (this.A1 == 'KGS') {
      this.result = (1 / this.cJson.rates.KGS) * (this.amount);
    }
    if (this.A1 == 'KHR') {
      this.result = (1 / this.cJson.rates.KHR) * (this.amount);
    }
    if (this.A1 == 'KMF') {
      this.result = (1 / this.cJson.rates.KMF) * (this.amount);
    }
    if (this.A1 == 'KPW') {
      this.result = (1 / this.cJson.rates.KPW) * (this.amount);
    }
    if (this.A1 == 'KRW') {
      this.result = (1 / this.cJson.rates.KRW) * (this.amount);
    }
    if (this.A1 == 'KWD') {
      this.result = (1 / this.cJson.rates.KWD) * (this.amount);
    }
    if (this.A1 == 'KYD') {
      this.result = (1 / this.cJson.rates.KYD) * (this.amount);
    }
    if (this.A1 == 'KZT') {
      this.result = (1 / this.cJson.rates.KZT) * (this.amount);
    }
    if (this.A1 == 'LAK') {
      this.result = (1 / this.cJson.rates.LAK) * (this.amount);
    }
    if (this.A1 == 'LBP') {
      this.result = (1 / this.cJson.rates.LBP) * (this.amount);
    }
    if (this.A1 == 'LKR') {
      this.result = (1 / this.cJson.rates.LKR) * (this.amount);
    }
    if (this.A1 == 'LRD') {
      this.result = (1 / this.cJson.rates.LRD) * (this.amount);
    }
    if (this.A1 == 'LSL') {
      this.result = (1 / this.cJson.rates.LSL) * (this.amount);
    }
    if (this.A1 == 'LTL') {
      this.result = (1 / this.cJson.rates.LTL) * (this.amount);
    }
    if (this.A1 == 'LVL') {
      this.result = (1 / this.cJson.rates.LVL) * (this.amount);
    }
    if (this.A1 == 'LYD') {
      this.result = (1 / this.cJson.rates.LYD) * (this.amount);
    }
    if (this.A1 == 'MAD') {
      this.result = (1 / this.cJson.rates.MAD) * (this.amount);
    }
    if (this.A1 == 'MDL') {
      this.result = (1 / this.cJson.rates.MDL) * (this.amount);
    }
    if (this.A1 == 'MGA') {
      this.result = (1 / this.cJson.rates.MGA) * (this.amount);
    }
    if (this.A1 == 'MKD') {
      this.result = (1 / this.cJson.rates.MKD) * (this.amount);
    }
    if (this.A1 == 'MMK') {
      this.result = (1 / this.cJson.rates.MMK) * (this.amount);
    }
    if (this.A1 == 'MNT') {
      this.result = (1 / this.cJson.rates.MNT) * (this.amount);
    }
    if (this.A1 == 'MOP') {
      this.result = (1 / this.cJson.rates.MOP) * (this.amount);
    }
    if (this.A1 == 'MRO') {
      this.result = (1 / this.cJson.rates.MRO) * (this.amount);
    }
    if (this.A1 == 'MUR') {
      this.result = (1 / this.cJson.rates.MUR) * (this.amount);
    }
    if (this.A1 == 'MVR') {
      this.result = (1 / this.cJson.rates.MVR) * (this.amount);
    }
    if (this.A1 == 'MWK') {
      this.result = (1 / this.cJson.rates.MWK) * (this.amount);
    }
    if (this.A1 == 'MXN') {
      this.result = (1 / this.cJson.rates.MXN) * (this.amount);
    }
    if (this.A1 == 'MYR') {
      this.result = (1 / this.cJson.rates.MYR) * (this.amount);
    }
    if (this.A1 == 'MZN') {
      this.result = (1 / this.cJson.rates.MZN) * (this.amount);
    }
    if (this.A1 == 'NAD') {
      this.result = (1 / this.cJson.rates.NAD) * (this.amount);
    }
    if (this.A1 == 'NGN') {
      this.result = (1 / this.cJson.rates.NGN) * (this.amount);
    }
    if (this.A1 == 'NIO') {
      this.result = (1 / this.cJson.rates.NIO) * (this.amount);
    }
    if (this.A1 == 'NOK') {
      this.result = (1 / this.cJson.rates.NOK) * (this.amount);
    }
    if (this.A1 == 'NPR') {
      this.result = (1 / this.cJson.rates.NPR) * (this.amount);
    }
    if (this.A1 == 'NZD') {
      this.result = (1 / this.cJson.rates.NZD) * (this.amount);
    }
    if (this.A1 == 'OMR') {
      this.result = (1 / this.cJson.rates.OMR) * (this.amount);
    }
    if (this.A1 == 'PAB') {
      this.result = (1 / this.cJson.rates.PAB) * (this.amount);
    }
    if (this.A1 == 'PEN') {
      this.result = (1 / this.cJson.rates.PEN) * (this.amount);
    }
    if (this.A1 == 'PGK') {
      this.result = (1 / this.cJson.rates.PGK) * (this.amount);
    }
    if (this.A1 == 'PHP') {
      this.result = (1 / this.cJson.rates.PHP) * (this.amount);
    }
    if (this.A1 == 'PKR') {
      this.result = (1 / this.cJson.rates.PKR) * (this.amount);
    }
    if (this.A1 == 'PLN') {
      this.result = (1 / this.cJson.rates.PLN) * (this.amount);
    }
    if (this.A1 == 'PYG') {
      this.result = (1 / this.cJson.rates.PYG) * (this.amount);
    }
    if (this.A1 == 'QAR') {
      this.result = (1 / this.cJson.rates.QAR) * (this.amount);
    }
    if (this.A1 == 'RON') {
      this.result = (1 / this.cJson.rates.RON) * (this.amount);
    }
    if (this.A1 == 'RSD') {
      this.result = (1 / this.cJson.rates.RSD) * (this.amount);
    }
    if (this.A1 == 'RUB') {
      this.result = (1 / this.cJson.rates.RUB) * (this.amount);
    }
    if (this.A1 == 'RWF') {
      this.result = (1 / this.cJson.rates.RWF) * (this.amount);
    }
    if (this.A1 == 'SAR') {
      this.result = (1 / this.cJson.rates.SAR) * (this.amount);
    }
    if (this.A1 == 'SBD') {
      this.result = (1 / this.cJson.rates.SBD) * (this.amount);
    }
    if (this.A1 == 'SCR') {
      this.result = (1 / this.cJson.rates.SCR) * (this.amount);
    }
    if (this.A1 == 'SDG') {
      this.result = (1 / this.cJson.rates.SDG) * (this.amount);
    }
    if (this.A1 == 'SEK') {
      this.result = (1 / this.cJson.rates.SEK) * (this.amount);
    }
    if (this.A1 == 'SGD') {
      this.result = (1 / this.cJson.rates.SGD) * (this.amount);
    }
    if (this.A1 == 'SHP') {
      this.result = (1 / this.cJson.rates.SHP) * (this.amount);
    }
    if (this.A1 == 'SLE') {
      this.result = (1 / this.cJson.rates.SLE) * (this.amount);
    }
    if (this.A1 == 'SLL') {
      this.result = (1 / this.cJson.rates.SLL) * (this.amount);
    }
    if (this.A1 == 'SOS') {
      this.result = (1 / this.cJson.rates.SOS) * (this.amount);
    }
    if (this.A1 == 'SRD') {
      this.result = (1 / this.cJson.rates.SRD) * (this.amount);
    }
    if (this.A1 == 'STD') {
      this.result = (1 / this.cJson.rates.STD) * (this.amount);
    }
    if (this.A1 == 'SVC') {
      this.result = (1 / this.cJson.rates.SVC) * (this.amount);
    }
    if (this.A1 == 'SYP') {
      this.result = (1 / this.cJson.rates.SYP) * (this.amount);
    }
    if (this.A1 == 'SZL') {
      this.result = (1 / this.cJson.rates.SZL) * (this.amount);
    }
    if (this.A1 == 'THB') {
      this.result = (1 / this.cJson.rates.THB) * (this.amount);
    }
    if (this.A1 == 'TJS') {
      this.result = (1 / this.cJson.rates.TJS) * (this.amount);
    }
    if (this.A1 == 'TMT') {
      this.result = (1 / this.cJson.rates.TMT) * (this.amount);
    }
    if (this.A1 == 'TND') {
      this.result = (1 / this.cJson.rates.TND) * (this.amount);
    }
    if (this.A1 == 'TOP') {
      this.result = (1 / this.cJson.rates.TOP) * (this.amount);
    }
    if (this.A1 == 'TRY') {
      this.result = (1 / this.cJson.rates.TRY) * (this.amount);
    }
    if (this.A1 == 'TTD') {
      this.result = (1 / this.cJson.rates.TTD) * (this.amount);
    }
    if (this.A1 == 'TWD') {
      this.result = (1 / this.cJson.rates.TWD) * (this.amount);
    }
    if (this.A1 == 'TZS') {
      this.result = (1 / this.cJson.rates.TZS) * (this.amount);
    }
    if (this.A1 == 'UAH') {
      this.result = (1 / this.cJson.rates.UAH) * (this.amount);
    }
    if (this.A1 == 'UGX') {
      this.result = (1 / this.cJson.rates.UGX) * (this.amount);
    }
    if (this.A1 == 'UYU') {
      this.result = (1 / this.cJson.rates.UYU) * (this.amount);
    }
    if (this.A1 == 'UZS') {
      this.result = (1 / this.cJson.rates.UZS) * (this.amount);
    }
    if (this.A1 == 'VEF') {
      this.result = (1 / this.cJson.rates.VEF) * (this.amount);
    }
    if (this.A1 == 'VES') {
      this.result = (1 / this.cJson.rates.VES) * (this.amount);
    }
    if (this.A1 == 'VND') {
      this.result = (1 / this.cJson.rates.VND) * (this.amount);
    }
    if (this.A1 == 'VUV') {
      this.result = (1 / this.cJson.rates.VUV) * (this.amount);
    }
    if (this.A1 == 'WST') {
      this.result = (1 / this.cJson.rates.WST) * (this.amount);
    }
    if (this.A1 == 'XAF') {
      this.result = (1 / this.cJson.rates.XAF) * (this.amount);
    }
    if (this.A1 == 'XAG') {
      this.result = (1 / this.cJson.rates.XAG) * (this.amount);
    }
    if (this.A1 == 'XAU') {
      this.result = (1 / this.cJson.rates.XAU) * (this.amount);
    }
    if (this.A1 == 'XCD') {
      this.result = (1 / this.cJson.rates.XCD) * (this.amount);
    }
    if (this.A1 == 'XDR') {
      this.result = (1 / this.cJson.rates.XDR) * (this.amount);
    }
    if (this.A1 == 'XOF') {
      this.result = (1 / this.cJson.rates.XOF) * (this.amount);
    }
    if (this.A1 == 'XPF') {
      this.result = (1 / this.cJson.rates.XPF) * (this.amount);
    }
    if (this.A1 == 'YER') {
      this.result = (1 / this.cJson.rates.YER) * (this.amount);
    }
    if (this.A1 == 'ZAR') {
      this.result = (1 / this.cJson.rates.ZAR) * (this.amount);
    }
    if (this.A1 == 'ZMK') {
      this.result = (1 / this.cJson.rates.ZMK) * (this.amount);
    }
    if (this.A1 == 'ZMW') {
      this.result = (1 / this.cJson.rates.ZMW) * (this.amount);
    }
    if (this.A1 == 'ZWL') {
      this.result = (1 / this.cJson.rates.ZWL) * (this.amount);
    }

  }


  //unless using this one the [subscription (subscribe)] will stack to infinity and beyond😌
  ngOnDestroy(): void {
    this.subscription_to_destroy.unsubscribe();
  }


}
