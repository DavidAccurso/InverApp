import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Investment } from '../models/investment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private _http: HttpClient;
  private investmentApiUrl: string = 'http://localhost:5183/api/Investments';

  constructor(private http: HttpClient) {
    this._http = http;
   }

   public GetInvestments() {
    return this._http.get<Investment[]>(this.investmentApiUrl + '/GetInvestments');
   }

   public GetInvestmentById(id : number) {
    let result = this._http.get(this.investmentApiUrl + '/GetInvestmentById/' + id);
    return result;
   }

   public InsertInvestment(investment: Investment) {
    let headers : HttpHeaders = new HttpHeaders();
    headers.set('content-type','application/json');

    const insertInvestment = JSON.stringify(investment);
    this._http.post(this.investmentApiUrl, insertInvestment, {'headers': headers}).subscribe(result => {
      console.log(result);
      return result;
    });
   }
}
