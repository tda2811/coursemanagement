import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient
  ) { }
  private baseURL = "http://localhost:8080/api/courses"
  // @ts-ignore
  updateMyCourses(id:number,username: string ):Observable<Object>{

    return  this.httpClient.put(`${this.baseURL}/${username}/bought-course-${id}`,username)
  }
}
