import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user-service/user";
import {UserService} from "../user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseURL = "http://localhost:8080/api/auth/user/register"

  constructor(private httpClient: HttpClient, private userService : UserService) { }

  registerUser(user: User): Observable<any>{
    return this.httpClient.post<User>(`${this.baseURL}`, user);
  }
}
