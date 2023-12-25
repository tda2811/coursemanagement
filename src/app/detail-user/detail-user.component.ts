import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../service/admin-service/admin.service";
import {User} from "../service/user-service/user";
import {TokenService} from "../service/tokenService/token.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit,OnDestroy{
  // @ts-ignore
  username: string;
  authorities : string[]= []
  user: User = new User()
  userIsAdmin = false;
  userIsMod = false;
  userIsUser = false
  isAdmin = false;
  isMod = false;
  isUser = false
  // @ts-ignore
  role: string;
  isModalDelete = false;
  // @ts-ignore

  private apiSubscriptions: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private tokenService: TokenService,
    private titleService : Title
  ) {}
  getDetailUser(){
    this.apiSubscriptions.push(
      this.adminService.viewDetailUser(this.username).subscribe((data:any)=>{
        this.user = data

        this.user.id = data.userId;
        data.listRoles.forEach((role:any)=>{
          this.authorities.push(role.roleName)
        })

        if(this.authorities.includes("ROLE_ADMIN") ){
          this.userIsAdmin = true;

          this.role = "ADMIN"
        }else if(this.authorities.includes("ROLE_MODERATOR") &&!this.authorities.includes("ROLE_ADMIN")){
          this.userIsMod = true
          this.role = "MODERATOR"
        }else if(!this.authorities.includes("ROLE_MODERATOR") && this.authorities.includes("ROLE_USER")){
          this.userIsUser = true
          this.role = "USER"
        }
      })

    )

  }

  ngOnInit(): void {
    this.username =  this.route.snapshot.params['username'];
    this.titleService.setTitle(`profile/${this.username}`)
    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.getDetailUser()
      this.isAdmin = true;

    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;

    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;

    }
    console.log(this.isAdmin)
  }
  openModalDelete(){
    this.isModalDelete = true;
  }
  deleteUser(username: string){
    this.adminService.deleteUser(username).subscribe(data=>{
      this.router.navigate(['/view-list-user'])
    })
  }
  updateUser(username: string){
    this.router.navigate(['update-user-from-admin',username])
  }

  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
