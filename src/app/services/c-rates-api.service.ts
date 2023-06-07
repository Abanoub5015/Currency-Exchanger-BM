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
    let url = 'http://data.fixer.io/api/latest?access_key=c0021af12c63d3620656e68df666b5f7';
    return this.http.get<Currency[]>(url);
  }

/*   getCurrencyRates()
  {
    let url = 'http://data.fixer.io/api/latest?access_key=c0021af12c63d3620656e68df666b5f7';
    return this.http.get(url);
  } */

  getCurrencyhistorical()
  {
    let date = ['2022-05-31','2022-06-30','2022-07-31','2022-08-31','2022-09-30','2022-10-31','2022-11-30','2022-12-31','2023-01-31','2023-02-28','2023-03-31','2023-04-30'];
    let url = 'http://data.fixer.io/api/' + 'date' + '?access_key=c0021af12c63d3620656e68df666b5f7';
    let chartList = [];
    chartList.push(url)
   // console.log(chartList);
    return this.http.get(url);  
  }
 
}
