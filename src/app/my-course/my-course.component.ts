import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from "../service/course-service/course";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../service/course-service/course.service";

import {UserService} from "../service/user-service/user.service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent  implements OnInit,OnDestroy{
  // @ts-ignore
  item: number;
  // @ts-ignore
  courses: any[] = []
  private apiSubscriptions: Subscription[] = [];
  constructor(private courseService: CourseService,private userService: UserService,private router: Router,
              private cookieService: CookieService,private titleService : Title) {
  }
  ngOnInit(): void {
    //check
    this.titleService.setTitle('My course')
    if(this.cookieService.get('accessToken')){
      this.apiSubscriptions.push(
        this.courseService.getMyCourses().subscribe(data=> {
          data.forEach((course:any)=>{
            this.courses.push(course)
          })
        })
      )
    }else{
      this.courses.length = 0
    }

  }
  detailCourse(idCourse: string){
    this.router.navigate(['detail-course', idCourse]);
  }
  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
