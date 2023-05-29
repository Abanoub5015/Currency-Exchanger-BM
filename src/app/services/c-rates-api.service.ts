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
    let url = 'http://data.fixer.io/api/latest?access_key=3a87e393813a40ab75f7541b3cf6c7bb';
    return this.http.get<Currency[]>(url);
  }

/*   getCurrencyRates()
  {
    let url = 'http://data.fixer.io/api/latest?access_key=3a87e393813a40ab75f7541b3cf6c7bb';
    return this.http.get(url);
  } */

  getCurrencyhistorical()
  {
    let url = 'http://data.fixer.io/api/2013-03-16?access_key=3a87e393813a40ab75f7541b3cf6c7bb';
    return this.http.get(url);
  }
 
}
