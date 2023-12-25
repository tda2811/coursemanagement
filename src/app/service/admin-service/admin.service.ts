import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user-service/user";
import {CookieService} from "ngx-cookie-service";
import {Course} from "../course-service/course";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL ="http://localhost:8080/api/auth/admin"
  constructor(private httpClient: HttpClient,private cookieService: CookieService) { }
  //USER
  // @ts-ignore
  registerUserByAdmin(user: User):Observable<User>{
    return  this.httpClient.post<User>(`${this.baseURL}/register`,user)
  }
  getListUser(): Observable<any> {
    return  this.httpClient.get(`${this.baseURL}/get-list-user`)
  }
  // @ts-ignore
  deleteUser(username: string):Observable<any>{
    return  this.httpClient.delete(`${this.baseURL}/delete/${username}`)
  }
  // @ts-ignore
  viewDetailUser(username: String):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/get-user/${username}`)
  }
  // @ts-ignore

  updateUserFromAdmin(username: string,userDetail: User, newPassword: string,authorities: string[]):Observable<any> {
    const requestBody = {userDetail, newPassword,authorities};
    return this.httpClient.put(`${this.baseURL}/update-user/${username}`, requestBody)
  }

  //COURSE
  // @ts-ignore
  createCourse(course:Course):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/create-course`,course)
  }
  // @ts-ignore
  deleteCourse(idCourse: number):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete-course/${idCourse}`)
  }
  // @ts-ignore
  updateCourse(idCourse: number,course: Course):Observable<any> {
    return this.httpClient.put(`${this.baseURL}/update-course/${idCourse}`,course)

  }
  // @ts-ignore
  deleteUserCourse(id: number):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete-user-course/${id}`)
  }
  // @ts-ignore
  addCourseForAdminAndMod(course:Course):Observable<any>{

      return this.httpClient.put(`${this.baseURL}/add-course-for-admin&mod`,course)
  }

}
