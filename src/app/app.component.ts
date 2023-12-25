import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth-service/auth.service";
import {MediaMatcher} from "@angular/cdk/layout";
import {Router, RouterOutlet} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {fadeAnimation} from "./app.animation";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit{
  screenMatcher : boolean = true;
  // @ts-ignore
  title: 'sds'
  // @ts-ignore
  key: string;
  private mediaMatcher: MediaQueryList
  constructor(public authenticationService: AuthService,
              private mediaMatcherService: MediaMatcher,
              private router: Router,
              private titleService : Title) {
    this.mediaMatcher = this.mediaMatcherService.matchMedia('(max-width: 1024px)')
  }
  ngOnInit(): void {

    this.checkSizeScreen();
    this.mediaMatcher.addEventListener('change', () => {
      this.checkSizeScreen();
    });
  }
  checkSizeScreen(){
    if(this.mediaMatcher.matches){
      this.screenMatcher = true;
    }else{
      this.screenMatcher = false;
    }
  }
  clickSearch = false;
  openInputSearch(){
    this.clickSearch = true;
  }
  closeInputSearch(){
    this.clickSearch = false;
  }
  sendResultSearch(key:any){
    this.clickSearch = false;
    key = key.trim();
    if(key.length>0) {
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['search',key])
      })
    }

  }
}
