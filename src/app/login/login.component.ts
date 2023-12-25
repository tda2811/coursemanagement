import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../service/user-service/user";
import {Router} from "@angular/router";
import {LoginUserService} from "../service/login-service/login.service";
import {UserService} from "../service/user-service/user.service";
import {CookieService} from "ngx-cookie-service";
import {ProfileService} from "../service/profile-service/profile.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  user: User = new User();
  invalidUserName= false;
  invalidPassword = false;
  wrongInforUser = false;
  // @ts-ignore
  role: string
  private apiSubscriptions: Subscription[] = [];
  constructor(private router: Router,
              private loginService: LoginUserService,
              private userService: UserService,
              private cookieService: CookieService,
              private profileService: ProfileService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login')
  }
//validate and login
  public loginUser() {

    if(this.user.username == undefined ||this.user.username == ""){
      this.invalidUserName = true;
      this.wrongInforUser = false
    }else{
      this.invalidUserName = false;
    }
    if(this.user.password == undefined || this.user.password == ""){
      this.invalidPassword = true;
      this.wrongInforUser = false
    }else{
      this.invalidPassword = false
    }
    if((this.user.username != undefined &&this.user.username != "") &&
      (this.user.password != undefined&& this.user.password != "")){
      this.user.username = this.user.username.trim();
      this.user.password = this.user.password.trim();
      this.apiSubscriptions.push(
        this.loginService.loginUser(this.user).subscribe((data:any) => {
          console.log(data)
          if (data.token) {
            this.cookieService.set('accessToken', data.token, { expires: 1, path: '/' });
            this.router.navigate(['/home'])
          }
        },error => {
          console.log(error)
          this.invalidUserName = false;
          this.invalidPassword = false
          this.wrongInforUser = true;
        })
      )

    }

  }

  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
