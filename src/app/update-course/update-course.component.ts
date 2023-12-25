import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../service/admin-service/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../service/course-service/course.service";
import {Course} from "../service/course-service/course";
import {Subscription} from "rxjs";
import {TokenService} from "../service/tokenService/token.service";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit,OnDestroy{
  // @ts-ignore
  id: number;
  course: Course = new Course();
  inputSrcImgCourse = false;
  isAdmin = false;
  isMod = false;
  isUser = false
  invalidCost = false;
  private apiSubscriptions: Subscription[] = [];
  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.apiSubscriptions.push(
      this.courseService.getCourseById(this.id).subscribe((data:any)=>{
        this.course = data
      })
    )
    if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;
    }
  }
  openInputSrcAvatar(){
    this.inputSrcImgCourse = !this.inputSrcImgCourse
  }
  updateCourse(){
    if(this.course.cost <0 || this.course.cost == undefined){
      this.invalidCost = true;
    }else if(this.course.cost >=0){
      this.invalidCost = false
      this.apiSubscriptions.push(

        this.adminService.updateCourse(this.id,this.course).subscribe((data:any)=>{
          this.router.navigate(['/detail-course',this.id])
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
