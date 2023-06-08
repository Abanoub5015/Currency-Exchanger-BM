import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Currency } from '../Currency';
import { Observable } from 'rxjs';
import { CExDetailsService } from '../services/c-ex-details.service';

@Injectable({
  providedIn: 'root'
})
export class CRatesApiService {

  //B2 = 'USD';

  USD: any = [];

  chartList: any = new Array<any>();
  url: any;

  rates: any = [];

  result: any = [];



  constructor(private http: HttpClient, private CExDetailsService: CExDetailsService) { }

  getCurrencyRates(): Observable<Currency[]>  // (<>) means (type assertion)
  {
    let url = 'http://data.fixer.io/api/latest?access_key=7b00c6a205a044c021b288aab77562d0';
    return this.http.get<Currency[]>(url);
  }

  /*   getCurrencyRates()
    {
      let url = 'http://data.fixer.io/api/latest?access_key=7b00c6a205a044c021b288aab77562d0';
      return this.http.get(url);
    } */


  getCurrencyhistorical(date: any, B2:any): Observable<any> {
    //this.B2 = this.CExDetailsService.getgetc_exDetails2();

    this.url = 'http://data.fixer.io/api/' + date + '?access_key=7b00c6a205a044c021b288aab77562d0&symbols=' + B2;
    return this.http.get<any>(this.url)
  }

  
/*   getCurrencyhistorical_old() {
    this.B2 = this.CExDetailsService.getgetc_exDetails2();

    this.USD = [1.077319, 1.047735, 1.022547, 1.002471, 0.980478, 0.995406, 1.042372, 1.072673, 1.084945, 1.057686, 1.090441, 1.101055];

    let date = ['2022-06-30', '2022-07-31', '2022-08-31', '2022-09-30', '2022-10-31', '2022-11-30', '2022-12-31', '2023-01-31', '2023-02-28', '2023-03-31', '2023-04-30', '2023-05-31'];

    var i = 0;
    for (i = 0; i <= date.length; i++) {
      this.url = 'http://data.fixer.io/api/' + date[i] + '?access_key=7b00c6a205a044c021b288aab77562d0&symbols=' + this.B2;
      this.http.get<any>(this.url).subscribe(Currencyhistorical_Object => {
        //this.chartList.push(Currencyhistorical_Object)



        this.chartList = Currencyhistorical_Object;

        for (var key in this.chartList.rates) {
          //console.log(key);
          this.rates = this.chartList.rates[key];
          this.result.push(...key)

        }
        console.log("this.rates1", this.rates);
        //this.rates = this.chartList.map((o:any) => o.rates);
        //console.log("rates", this.rates);

      })
    }

    console.log(this.result);
    console.log("this.rates2", this.rates);
    return this.USD;

  }
 */

















}
