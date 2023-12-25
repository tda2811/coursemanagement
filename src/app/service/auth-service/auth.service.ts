import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user-service/user.service";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "../tokenService/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private router: Router,private userService: UserService
    ,private cookieService: CookieService,private tookenService: TokenService) { }

  isUserLoggedIn() {
    return !(this.tookenService.getUsernameFormToken() == null)
  }

  logOut() {
    this.cookieService.delete('accessToken');
    this.router.navigate(['/login'])
  }



}
