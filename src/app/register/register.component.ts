import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegisterService} from "../service/register-service/register.service";
import {User} from "../service/user-service/user";
import {UserService} from "../service/user-service/user.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user: User = new User();
  existAccount = false;
  invalidUserName = false;
  invalidPassword = false;
  invalidFullname = false;
  isNotSatisfyLength = false;
  constructor(private router: Router, private registerService: RegisterService,private userService: UserService,
              private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Register')
  }
  //validate and register
  registerUser(){
    if(this.user.username == undefined){
      this.user.username = "";
    }
    if(this.user.fullname == undefined){
      this.user.fullname = "";
    }
    if(this.user.password == undefined){
      this.user.password = "";
    }
    if(this.user.username.trim().includes(" ") || this.user.username == ""){
      this.invalidUserName = true;
      this.existAccount = false;
      this.isNotSatisfyLength = false
    }else{
      this.invalidUserName = false;
    }
    if(this.user.password.trim().includes(" ") || this.user.password == ""){
      this.invalidPassword = true;
      this.isNotSatisfyLength = false;
    }else{
      this.invalidPassword = false
    }

    if(this.user.fullname == ""){
      this.invalidFullname = true;
    }else{
      this.invalidFullname = false
    }
    if(this.user.username.trim().length <5 && this.user.username.trim().length >0){
      this.invalidUserName = false;
      this.existAccount = false;
      this.isNotSatisfyLength = true;
      this.invalidPassword = false;
    }
    if(this.user.password.trim().length <5 && this.user.password.trim().length >0){
      this.invalidUserName = false;
      this.existAccount = false;
      this.isNotSatisfyLength = true;
      this.invalidPassword = false;
    }
    if( this.user.username.trim().length>=5 &&  this.user.password.trim().length>=5 &&
      !this.user.password.trim().includes(" ") &&
      !this.user.username.trim().includes(" ")){
      this.registerService.registerUser(this.user).subscribe(data=>{
          this.router.navigate(['/login'])
        },
        error => {
          this.existAccount = true
          this.invalidUserName = false
          this.isNotSatisfyLength = false
        })
    }

  }



}
