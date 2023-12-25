import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../service/course-service/course";
import {CourseService} from "../service/course-service/course.service";
import {UserService} from "../service/user-service/user.service";
import {CookieService} from "ngx-cookie-service";
import {AdminService} from "../service/admin-service/admin.service";
import {TokenService} from "../service/tokenService/token.service";
import {Title} from "@angular/platform-browser";
import {RatingService} from "../service/rating-service/rating.service";
import {Comment} from "../comment";


@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.css']
})
export class DetailCourseComponent implements OnInit,OnDestroy{
  // @ts-ignore
  id: number;
  // @ts-ignore
  item: any;
  checkBuyed:boolean = false;
  noUser: boolean = false;
  course:Course = new Course();
  timeOut : any;
  isAdmin = false;
  isMod = false
  isUser = false
  courses : Course[] = [];
  // @ts-ignore
  token:string;
  isModalWarning = false;
  countSubcribe = 0;
  arrayComments : any[] = []
  username: string = ''
  comment: Comment = new Comment();
  newContent : string =''
  isUpdating = false
  isNotSatisfy = false
  // @ts-ignore
  private apiSubscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private router: Router,
              private userService: UserService,
              private cookieService: CookieService,
              private adminService: AdminService,
              private tokenService: TokenService,
              private titleService: Title,
              private ratingService: RatingService) {
  }

  initDetail(){

    this.apiSubscriptions.push( this.courseService.getCourseById(this.id).subscribe(( data:any )=> {
      this.course = data;
      if(this.token){
        this.courseService.getMyCourses().subscribe(data=>{
          for(this.item of data){
            if(this.item.idCourse == this.id){
              this.checkBuyed = true;
            }
          }
        });
      }
    }));
  }
  getListComments(){
    this.courseService.getListCommentsByIdCourse(this.id).subscribe(data=>{
        data.forEach((cmt:any)=>{
          this.arrayComments.push(cmt)
        })
      console.log(this.arrayComments)
    })
  }
  postComment(){
    this.comment.course_id = this.id
    if(this.comment.comment_text.length>20){
      this.isNotSatisfy = true;

    }else if(this.comment.comment_text.length<20){
      this.isNotSatisfy = false;
      this.courseService.postComment(this.comment).subscribe(data=>{
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['detail-course',this.id])
        })
      })
    }

  }
  checkIsUpdate(id: number){
    for(let i of this.arrayComments){
        if(i[0] == id){
          this.isUpdating = true;
        }
    }
  }
  updateComment(id: number,content: string){
    this.courseService.updateComment(id,content).subscribe(data=>{
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['detail-course',this.id])
      })
    })
  }
  deleteCommentByUser(id:number){
    this.courseService.deleteCommentFromUser(id).subscribe(data=>{
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['detail-course',this.id])
      })
    })
  }
  ngOnInit(): void {
    this.token = this.cookieService.get('accessToken');
    this.username = this.tokenService.getUsernameFormToken();
    this.id = this.route.snapshot.params['id'];
    this.titleService.setTitle(`Detail course/${this.id}`)
    this.initDetail();
    this.getListOtherCourses();
    this.getListComments()
      if(this.tokenService.getRolesFormToken().includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }else if(this.tokenService.getRolesFormToken().includes('ROLE_MODERATOR')){
      this.isMod = true;
    }
    else if(this.tokenService.getRolesFormToken().includes('ROLE_USER')){
      this.isUser = true;
    }
  this.courseService.getCountSubcribeCourse(this.id).subscribe(count=>{
    this.countSubcribe = count;
  })
  }

  getListOtherCourses(){
    this.apiSubscriptions.push(
      this.courseService.getCourseList().subscribe((data:any)=>{
        data.forEach((course:any)=>{
          if(course.idCourse != this.id){
            this.courses.push(course)
          }
        })
      })
    )
  }
  //navigate detail course
  detailCourse(idCourse: number){
    this.router.navigate(['/']).then(() => {
      this.router.navigate(['detail-course',idCourse])
    })
  }
  navigatePaymentPage(idCourse: number){
    if(this.tokenService.getUsernameFormToken() != null){
      this.router.navigate(['payment', idCourse]);
    }else{
      this.noUser = true;
      clearInterval(this.timeOut)
      this.timeOut =  setTimeout(()=>{
        this.noUser = false
      },2000)

    }
  }

  navigateUpdateCourse(id:any){
    this.router.navigate(['/update-course',id])
  }
  openTabWarning(){
    this.isModalWarning = true;
  }
  deleteCourse(){
    this.adminService.deleteUserCourse(this.id).subscribe(data=>{
    })
    this.courseService.deleteComment(this.id).subscribe(data=>{

    })
    this.adminService.deleteCourse(this.id).subscribe((data:any)=>{
      this.router.navigate(["/home"])
    })
  }

  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}



