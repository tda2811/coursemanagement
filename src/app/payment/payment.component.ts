import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from "../service/course-service/course";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../service/course-service/course.service";
import {UserService} from "../service/user-service/user.service";
import {ProfileService} from "../service/profile-service/profile.service";
import {PaymentService} from "../service/payment-service/payment.service";
import {Subscription} from "rxjs";
import {User} from "../service/user-service/user";
import {DepositService} from "../service/deposit-service/deposit.service";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit,OnDestroy{

  // @ts-ignore
  id: number;
  // @ts-ignore
  username: any;
  // @ts-ignore
  bought = false;
  user: User = new User()
  course:Course = new Course();
  affordable = false;
  timeOut: any;
  notEnoughMoney = false;
  buySuccess = false
  private apiSubscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private router: Router,
              public userService: UserService,
              private profileService: ProfileService,
              private paymentService: PaymentService,
              private depositService: DepositService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Payment')
    this.id = this.route.snapshot.params['id'];
    this.apiSubscriptions.push(
      this.courseService.getCourseById(this.id).subscribe(( data:any )=> {
        this.course = data;
        //get profile user
        this.profileService.getProfile().subscribe((profile:any)=>{
          this.user = profile;
          this.username = profile.username;
          this.userService.setUserData((profile.id),profile.fullname.toUpperCase(),profile.username,profile.authorities[0].authority.slice(5))
          if(this.user.balance >= this.course.cost){
            this.affordable = true
          }else this.affordable = false
          profile.courses.forEach((id:any)=>{
            if(id == this.id){
              this.bought = true
            }

          })
        })
      })

    );
  }
  buyCourse(){
    if(this.affordable){
      this.paymentService.updateMyCourses(this.id, this.username).subscribe( data =>{
          this.bought = true;
          this.buySuccess = true
          clearInterval(this.timeOut)
          this.timeOut =  setTimeout(()=>{
            this.buySuccess = false
          },2000)
        }
        , error => console.log(error));
      this.depositService.depositToAccount(-(this.course.cost)).subscribe(data=>{
        console.log(data)
      })
    }else{
      this.notEnoughMoney = true
      clearInterval(this.timeOut)
      this.timeOut =  setTimeout(()=>{
        this.notEnoughMoney = false
      },2000)
    }

  }

  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
