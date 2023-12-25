import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../service/user-service/user.service";
import {AuthService} from "../service/auth-service/auth.service";
import {ProfileService} from "../service/profile-service/profile.service";

import {Router} from "@angular/router";
import {User} from "../service/user-service/user";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "../service/tokenService/token.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy{
  // @ts-ignore
  user: User = new User();
  isAdmin = false;
  isMod = false
  isUser = false
  authorities: string[]= []
  // @ts-ignore
  role: string;
  checkClickLogout = false;
  isMaximum = false;
  private apiSubscriptions: Subscription[] = [];
  constructor(public userService: UserService,
              public authService: AuthService,
              private profileService: ProfileService,
              private router: Router,
              private tokenService: TokenService,
              private titleService: Title
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Profile')
    this.apiSubscriptions.push(
      this.profileService.getProfile().subscribe((data:any)=>{
        if(data.balance >=9999){
          this.isMaximum = true;
        }
        this.user = data;
        this.user.fullname = this.user.fullname.toUpperCase();
      })
    )

    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.isAdmin = true;
      this.role = "ADMIN"
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;
      this.role = "MODERATOR"
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;
      this.role = "USER"
    }
  }
  navigatePageListUser(){
    this.router.navigate(['view-list-user'])
  }
  updateUser(){
    this.router.navigate(['update-user'])
  }

  logout(){
    this.checkClickLogout = !this.checkClickLogout;
  }
  navigateDeposit(){
    if(this.isMaximum){
      this.router.navigate(['profile'])
    }
   else if(!this.isMaximum){
      this.router.navigate(['deposit'])
    }

  }
  protected readonly dateTimestampProvider = dateTimestampProvider;

  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
