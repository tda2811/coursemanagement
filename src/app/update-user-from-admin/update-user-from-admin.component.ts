import {Component, OnInit} from '@angular/core';
import {AdminService} from "../service/admin-service/admin.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {User} from "../service/user-service/user";
import {CourseService} from "../service/course-service/course.service";
import {Course} from "../service/course-service/course";
import {TokenService} from "../service/tokenService/token.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-update-user-from-admin',
  templateUrl: './update-user-from-admin.component.html',
  styleUrls: ['./update-user-from-admin.component.css']
})
export class UpdateUserFromAdminComponent implements OnInit{
  user: User = new User()
  // @ts-ignore
  username: string;
  authorities: string[] = []
  clickUpdate = false;
  // @ts-ignore
  newPassword : string;
  noSatisfyLength = false;
  invalidFullname = false;
  openModalSearch = false;
  courses : Course[] = [];
  saveUserCourse : string[] = [];
  saveDataCourse : string[] = [];
  array : string[] =[]
  // @ts-ignore
  role: string
  isAdmin = false
  isMod = false
  isUser = false
  listRolesDefault : string[] = ["ROLE_MODERATOR","ROLE_USER"]
  newRole: string[] = []
  isMaximum = false;
  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService,
              private tokenService: TokenService,
              private titleService : Title
  ) {}
  updateAvatar() {
    this.clickUpdate = true;
  }

  openTabAdd(){
    this.openModalSearch = true;
    this.courseService.getCourseList().subscribe((data:any)=>{
      data.forEach((course: any)=>{
        this.saveDataCourse.push(course.idCourse)
      })
      this.user.listCourse.forEach((course: any)=>{
        this.saveUserCourse.push(course.idCourse)
      })
      this.array = this.saveDataCourse.filter(item => !this.saveUserCourse.includes(item));
      this.array.forEach((idCourse: any)=>{
        this.courseService.getCourseById(idCourse).subscribe((data:any)=>{
          this.courses.push(data)
        })
      })
    })
  }
  // add course for user
  addCourse(idCourse: any){
    this.courseService.getCourseById(idCourse).subscribe(data=>{
      const courseExists = this.user.listCourse.some(course => course.idCourse === data.idCourse);
      if (!courseExists) {
        this.user.listCourse.push(data);
        console.log(this.user.listCourse)
        this.courses.forEach((course)=>{
          if(course.idCourse == data.idCourse){
            const index = this.courses.indexOf(course);
            if (index !== -1) {
              this.courses.splice(index, 1);
            }
          }
        })
      }
    })
  }
  // delete user's course
  deleteCourse(idCourse: any){
    this.courseService.getCourseById(idCourse).subscribe((data:any)=>{
      this.user.listCourse.forEach((course)=>{
        if(course.idCourse == data.idCourse){
          const index = this.user.listCourse.indexOf(course);
          if (index !== -1) {
            this.user.listCourse.splice(index, 1);
            console.log(this.user.listCourse)
          }
        }
      })
    })
  }
  //validate and update user
  updateUser(){
    if(this.user.fullname.length ==0){
      this.invalidFullname = true;
    }
    if(this.newPassword == undefined ){
      this.newPassword = '';
    }
    if(this.user.srcImageAvatar.length == 0){
      this.user.srcImageAvatar = "https://cdn-icons-png.flaticon.com/512/552/552721.png"
    }
    if(this.newPassword.length> 0){
      this.newPassword = this.newPassword.trim();
    }
    if(this.newPassword.length>0 && this.newPassword.length < 5){
      this.noSatisfyLength = true;
    }
    else if((this.newPassword.length >=5 || this.newPassword.length == 0) && this.user.fullname.length>0) {
      this.noSatisfyLength = false;
      this.newRole.push(this.role)
      if(this.user.balance>9999){
        this.user.balance = 9999
      }
      this.adminService.updateUserFromAdmin(this.username,this.user,this.newPassword,this.newRole).subscribe((data:any)=>{

        if(this.newPassword.length>=5){
          this.router.navigate(['/view-list-user'])
        }else{
          this.noSatisfyLength = false;
          this.router.navigate(['/view-list-user'])

        }
      })
    }
  }
  decreaseBanlace(){
    this.user.balance -=5
  }
  increaseBanlace(){
    this.user.balance +=5
  }
  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.titleService.setTitle(`Update Profile/${this.username}`)
    this.adminService.viewDetailUser(this.username).subscribe((data:any)=>{
      this.user = data

      this.user.id = data.userId;
      this.user.authorities = data.listRoles;
      this.user.authorities.forEach((role:any)=>{
        this.authorities.push(role.roleName)
      })
      this.user.authorities = this.authorities;
      console.log(this.authorities)
      if(this.authorities.includes("ROLE_ADMIN")){
        this.role = "ROLE_ADMIN"

      }
      else if(this.authorities.includes("ROLE_MODERATOR") &&
        this.authorities.includes("ROLE_USER") &&
        !this.authorities.includes("ROLE_ADMIN")){
        this.role = "ROLE_MODERATOR"
      }else if(!this.authorities.includes("MODERATOR")){
        this.role = "ROLE_USER"
      }
    })
    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;
    }

  }


  protected readonly navigator = navigator;

  protected readonly dateTimestampProvider = dateTimestampProvider;
}
