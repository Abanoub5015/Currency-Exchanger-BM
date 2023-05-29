import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Currency } from '../Currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRatesApiService {
 
  constructor(private http:HttpClient) {}

  getCurrencyRates(): Observable<Currency[]>  // (<>) means (type assertion)
  {
    let url = 'http://data.fixer.io/api/latest?access_key=754c0df0b3de0b8bfa23d8f062c5756c';
    return this.http.get<Currency[]>(url);
  }

/*   getCurrencyRates()
  {
    let url = 'http://data.fixer.io/api/latest?access_key=754c0df0b3de0b8bfa23d8f062c5756c';
    return this.http.get(url);
  } */

  getCurrencyhistorical()
  {
    let date = ['2022-05-31','2022-06-30','2022-07-31','2022-08-31','2022-09-30','2022-10-31','2022-11-30','2022-12-31','2023-01-31','2023-02-28','2023-03-31','2023-04-30'];
    let url = 'http://data.fixer.io/api/' + 'date' + '?access_key=754c0df0b3de0b8bfa23d8f062c5756c';
    let chartList = [];
    chartList.push(url)
   // console.log(chartList);
    return this.http.get(url);  
  }
 
}
