import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {User} from "../user-service/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService{

  private baseURL = "http://localhost:8080/api/auth/user";

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // @ts-ignore
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseURL}/profile`);
  }

  updateProfile(userDetail: User, newPassword: string):Observable<any> {
    const requestBody = {userDetail, newPassword};
    return this.http.put(`${this.baseURL}/update-user`, requestBody)
  }

}
