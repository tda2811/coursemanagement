import {Component, computed, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

import {User} from "../service/user-service/user";
import {AdminService} from "../service/admin-service/admin.service";
import {Router} from "@angular/router";
import {RegisterService} from "../service/register-service/register.service";
import {TokenService} from "../service/tokenService/token.service";
import {MediaMatcher} from "@angular/cdk/layout";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{
  // @ts-ignore
  users: User[] = [];
  admins: string[] = [];
  isAdmin = false;
  isMod = false
  isUser = false
  isModalAddUser = false
  currentAdmin: User = new User()
  newUser: User = new User();
  existAccount = false;
  invalidUserName = false;
  invalidPassword = false;
  invalidFullname = false;
  isNotSatisfyLength = false;
  arrayRole : string[] = ["ROLE_USER","ROLE_MODERATOR"]
  // @ts-ignore
  roleSelected : string = "ROLE_USER"
  // @ts-ignore
  role: string;
  screenMatcher : boolean = true;
  // @ts-ignore
  title: string = '';
  private mediaMatcher: MediaQueryList
  constructor( private cookieService: CookieService,
               private adminService: AdminService,
               private router: Router,
               private registerService: RegisterService,
               private mediaMatcherService: MediaMatcher,
               private tokenService: TokenService,
               private titleService: Title) {
    this.mediaMatcher = this.mediaMatcherService.matchMedia('(max-width: 768px)')

  }

  checkSizeScreen(){
    if(this.mediaMatcher.matches){
      this.screenMatcher = true;
    }else{
      this.screenMatcher = false;
    }
  }
  openTabAddUser(){
    this.isModalAddUser = true;

  }
  getListUser(){
    const currentUsername = this.tokenService.getUsernameFormToken()
    this.adminService.getListUser().subscribe(data=>{

      data.forEach((user:any)=>{
        if(user.username != currentUsername){
          this.users.push(user)
          data = this.users;

        }else{
          // @ts-ignore
          this.adminService.viewDetailUser(currentUsername).subscribe((data:any)=>{
            this.currentAdmin = data
          })
        }
      })

    },error => {
      console.log(error)
    })
  }
// @ts-ignore

  ngOnInit(): void {
    this.titleService.setTitle('List User')
    // @ts-ignore
    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;
    }
    this.checkSizeScreen()
    this.getListUser()

  }
  navigateViewDetailUserPage(username: string){
    this.router.navigate(["detail-user",username])
  }
  addNewUSer(){
    if(this.newUser.username == undefined){
      this.newUser.username = "";
    }
    if(this.newUser.fullname == undefined){
      this.newUser.fullname = "";
    }
    if(this.newUser.password == undefined){
      this.newUser.password = "";
    }
    if(this.newUser.username.trim().includes(" ") || this.newUser.username == ""){
      this.invalidUserName = true;
      this.existAccount = false;
      this.isNotSatisfyLength = false
    }else{
      this.invalidUserName = false;
    }
    if(this.newUser.password.trim().includes(" ") || this.newUser.password == ""){
      this.invalidPassword = true;
      this.isNotSatisfyLength = false;
    }else{
      this.invalidPassword = false
    }

    if(this.newUser.fullname == ""){
      this.invalidFullname = true;
    }else{
      this.invalidFullname = false
    }
    if(this.newUser.username.trim().length <5 && this.newUser.username.trim().length >0){
      this.invalidUserName = false;
      this.existAccount = false;
      this.isNotSatisfyLength = true;
      this.invalidPassword = false;
    }
    if(this.newUser.password.trim().length <5 && this.newUser.password.trim().length >0){
      this.invalidUserName = false;
      this.existAccount = false;
      this.isNotSatisfyLength = true;
      this.invalidPassword = false;
    }
    if( this.newUser.username.trim().length>=5 &&
      this.newUser.password.trim().length>=5 &&
      !this.newUser.password.trim().includes(" ") &&
      !this.newUser.username.trim().includes(" ")){

      this.newUser.authorities.push(this.roleSelected)

      this.adminService.registerUserByAdmin(this.newUser).subscribe((data:any)=>{
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['view-list-user'])
        })
      })
    }
  }
}
