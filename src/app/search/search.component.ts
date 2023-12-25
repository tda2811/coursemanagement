import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../service/course-service/course.service";
import {Course} from "../service/course-service/course";
import { map } from 'rxjs/operators';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private titleService: Title) {
  }

  // @ts-ignore
  courses: Course[] = [];
  // @ts-ignore
  key: string
  item: any;
  private apiSubscriptions: Subscription[] = [];
  //get course base on key search
  getCourseList(){
    this.apiSubscriptions.push(
      this.courseService.getCourseList().subscribe((data:any)=>{
        for(this.item of data){
          if(this.item.nameCourse.toLowerCase().includes(this.key.toLowerCase())){
            this.courses.push(this.item);
          }
        }
      })
    )

  }

  ngOnInit(): void {
    this.titleService.setTitle('Search')
    this.key = this.route.snapshot.params['key'];
    this.getCourseList()
  }
  detailCourse(idCourse: number){
    this.router.navigate(['detail-course', idCourse]);
  }

  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

