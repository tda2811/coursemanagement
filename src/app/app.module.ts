import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyCourseComponent } from './my-course/my-course.component';

import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { ProfileComponent } from './profile/profile.component';

import {CookieService} from "ngx-cookie-service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailCourseComponent } from './detail-course/detail-course.component';
import { PaymentComponent } from './payment/payment.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SearchComponent } from './search/search.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateUserFromAdminComponent } from './update-user-from-admin/update-user-from-admin.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import {TokenInterceptor} from "./token.interceptor";
import {NgxImageCompressService} from "ngx-image-compress";
import { DepositComponent } from './deposit/deposit.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyCourseComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DetailCourseComponent,
    PaymentComponent,
    UpdateUserComponent,
    SearchComponent,
    ViewUserComponent,
    UpdateUserFromAdminComponent,
    DetailUserComponent,
    UpdateCourseComponent,
    DepositComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgIf,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,


  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi: true},CookieService,NgxImageCompressService,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
