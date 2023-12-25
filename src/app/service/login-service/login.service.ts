import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user-service/user";
import {UserService} from "../user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  private baseURL = "http://localhost:8080/api/auth/user/login"

  constructor(private httpClient: HttpClient, private userService : UserService) { }

  loginUser(user: User): Observable<any>{
    return this.httpClient.post<User>(`${this.baseURL}`, user);
  }
}
