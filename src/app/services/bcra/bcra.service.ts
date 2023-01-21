import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _MAT_HINT } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { dayValue } from 'src/app/models/usdResponse.model';

@Injectable({
  providedIn: 'root'
})
export class BcraService {

  private _http: HttpClient;
  private bcraApiUrl = 'http://localhost:5183/api';

  constructor(private http: HttpClient) {
    this._http = http;
    this.historicalUsdPrice = new Array<dayValue>();
   }

  private usdPriceToday : number = 0;
  private historicalUsdPrice;
  
  getUsd(): number{

    this.getTodayUsdBoughtPrice().subscribe(r => { 
      this.usdPriceToday = r.v;
    });

     return this.usdPriceToday;
  }

  public  getTodayUsdBoughtPrice(){
    return this._http.get<dayValue>(this.bcraApiUrl + '/Bcra');
  }

  getHistorical() {
    return this.historicalUsdPrice;
  }
}
