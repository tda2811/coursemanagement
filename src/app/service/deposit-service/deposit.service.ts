import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private baseURL = "http://localhost:8080/api/auth/user"
  constructor(private httpClient: HttpClient) { }
  // @ts-ignore
  depositToAccount(amountOfMoney: number):Observable<any>{
    return  this.httpClient.put(`${this.baseURL}/deposit`,amountOfMoney)
  }
}
