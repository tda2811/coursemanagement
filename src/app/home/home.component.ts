import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../service/course-service/course.service";
import {Course} from "../service/course-service/course";
import {AdminService} from "../service/admin-service/admin.service";
import {TokenService} from "../service/tokenService/token.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{
  // @ts-ignore
  courses: Course[];
  // @ts-ignore

  isAdmin = false;
  isModalAddCourse = false
  newCourse: Course = new Course();
  isMod = false
  isUser = false
  invalidNameCourse = false;
  invalidCost = false;
  invalidDiscription = false;
  invalidSrcImage = false;
  // @ts-ignore
  token: string;
  // @ts-ignore
  role: string
  // @ts-ignore
  saveAdmins : any[] = []
  private apiSubscriptions: Subscription[] = [];
  constructor(private router: Router,
              private courseService: CourseService,
              private adminService: AdminService,
              public tokenService: TokenService,
              private titleService: Title) {
  }
  //get all courses
  getCourseList(){
    this.courseService.getCourseList().subscribe((data: any)=>{
      this.courses = data;
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Home')
    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;
    }
    this.getCourseList();
    // @ts-ignore

  }
  courseDetail(idCourse: number){
    this.router.navigate(['detail-course', idCourse]);
  }
  openTabAddCourse(){
    this.isModalAddCourse = true;
  }
  //validate and add course
  addNewCourse(){
    if(this.newCourse.nameCourse == undefined){
      this.newCourse.nameCourse = "";
    }
    if(this.newCourse.imgCourse == undefined){
      this.newCourse.imgCourse = "";
    }
    if(this.newCourse.cost == undefined){
      this.newCourse.cost = 0;
    }
    if(this.newCourse.discriptionCourse == undefined){
      this.newCourse.discriptionCourse= "";
    }

    if(this.newCourse.nameCourse == ""){
      this.invalidNameCourse = true;

    }else{
      this.invalidNameCourse = false
    }
    if(this.newCourse.discriptionCourse == ""){
      this.invalidDiscription = true;

    }else{
      this.invalidDiscription = false
    }

    if(this.newCourse.imgCourse == ""){
      this.invalidSrcImage = true;

    }else{
      this.invalidSrcImage = false
    }
    if(this.newCourse.cost <0 || this.newCourse.cost == undefined){
      this.invalidCost = true
    }
    else if(
      this.newCourse.discriptionCourse.length>0 &&
      this.newCourse.cost >=0 &&
      this.newCourse.nameCourse.length>0 &&
      this.newCourse.imgCourse.length>0){
      this.adminService.createCourse(this.newCourse).subscribe((data:any)=>{
        this.router.navigate(['/my-courses']).then(() => {
          this.router.navigate(['home'])
          this.isModalAddCourse = false
          this.adminService.addCourseForAdminAndMod(data).subscribe((dataUser)=>{
            console.log(dataUser)
          })
        })
      },error => {
        console.log(error)
      })
    }
  }
  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
