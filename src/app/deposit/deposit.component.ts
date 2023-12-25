import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProfileService} from "../service/profile-service/profile.service";
import {DepositService} from "../service/deposit-service/deposit.service";
import {User} from "../service/user-service/user";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})

export class DepositComponent implements OnInit,OnDestroy{

  username: string = '';
  amountOfMoney : number = 0
  user: User = new User();
  invalidMoney = false
  isMaximum = false
  private apiSubscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute,
              private depositService:DepositService,
              private profileService: ProfileService,
              private router: Router,
              private titleService: Title) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.titleService.setTitle(`Deposit/${this.username}`)
    this.apiSubscriptions.push(
      this.profileService.getProfile().subscribe((data:any)=>{
        this.user = data

      })
    )
  }

  depositToAccount(){
    if(this.user.balance + this.amountOfMoney > 9999){
      this.isMaximum = true;
      this.invalidMoney = false
    }
    if(this.amountOfMoney<0){
      this.invalidMoney = true
      this.isMaximum = false
    }else if(this.amountOfMoney>0 && this.user.balance + this.amountOfMoney<=9999){
      this.apiSubscriptions.push(
        this.depositService.depositToAccount(this.amountOfMoney).subscribe(( data:any )=> {
          this.router.navigate(['/profile'])
        })
      );
    }

  }
  ngOnDestroy(): void {
    this.apiSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
