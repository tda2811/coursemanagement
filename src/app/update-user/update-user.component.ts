import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProfileService} from "../service/profile-service/profile.service";
import {UserService} from "../service/user-service/user.service";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {User} from "../service/user-service/user";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../service/auth-service/auth.service";
import {TokenService} from "../service/tokenService/token.service";
import {NgxImageCompressService} from "ngx-image-compress";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit,OnChanges {
  // @ts-ignore
  user: User = new User();
  newPassword: any;
  username: any;
  invalidField = false;
  invalidFullname = false;
  authorities : any[] =[];

  // @ts-ignore
  role: string;
  constructor(private profileService: ProfileService,
              public userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private authService: AuthService,
              private tokenService: TokenService,
              private imageCompress: NgxImageCompressService,
              private titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Update Profile')
    this.profileService.getProfile().subscribe(data => {
      this.user = data;
      this.user.fullname = this.user.fullname.toUpperCase()
    })
    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.role = "ADMIN"
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.role = "MODERATOR"
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.role = "USER"
    }
  }
  updateUser() {
    if(this.user.fullname.length == null){
      this.invalidFullname = true;
    }
    if(this.newPassword == undefined ){
      this.newPassword = '';
    }
    if(this.newPassword.length> 0){
      this.newPassword = this.newPassword.trim();
    }
    if(this.user.srcImageAvatar.length == 0){
      this.user.srcImageAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png"
    }
    if(this.newPassword.length>0 && this.newPassword.length < 5){
      this.invalidField = true;
    }
    else if(this.newPassword.length >=5 || this.newPassword.length == 0){
      this.invalidField = false;
      if(this.user.fullname.length>0){
        this.profileService.updateProfile(this.user,this.newPassword).subscribe(data => {
          if(this.newPassword.length>=5){
            this.authService.logOut();

          }
          else{
            this.invalidField = false;
            this.router.navigate(['profile'])
          }
        })
      }

    }
  }
  clickUpdate = false
  updateAvatar() {
    this.clickUpdate = !this.clickUpdate;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.user.username)
  }

}
