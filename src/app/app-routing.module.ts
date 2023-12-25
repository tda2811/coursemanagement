import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MyCourseComponent} from "./my-course/my-course.component";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {DetailCourseComponent} from "./detail-course/detail-course.component";
import {PaymentComponent} from "./payment/payment.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {SearchComponent} from "./search/search.component";

import {ViewUserComponent} from "./view-user/view-user.component";
import {DetailUserComponent} from "./detail-user/detail-user.component";
import {UpdateUserFromAdminComponent} from "./update-user-from-admin/update-user-from-admin.component";
import {UpdateCourseComponent} from "./update-course/update-course.component";
import {DepositComponent} from "./deposit/deposit.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'my-courses', component: MyCourseComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path:'login',component: LoginComponent},
  {path:'logout',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'profile',component: ProfileComponent},
  {path:'detail-course/:id',component:DetailCourseComponent},
  {path:'payment/:id', component:PaymentComponent},
  {path:'update-user', component:UpdateUserComponent},
  {path:'search/:key', component:SearchComponent},
  {path:'view-list-user', component:ViewUserComponent},
  {path:'detail-user/:username', component:DetailUserComponent},
  {path:'update-user-from-admin/:username',component: UpdateUserFromAdminComponent},
  {path:'update-course/:id',component:UpdateCourseComponent},
  {path:'deposit',component:DepositComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
