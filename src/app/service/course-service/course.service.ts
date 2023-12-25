import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Course} from "./course";
import {CookieService} from "ngx-cookie-service";
import {Comment} from "../../comment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseURL = "http://localhost:8080/api/courses";

  constructor(private httpClient: HttpClient,private cookieService: CookieService) { }

  getCourseList(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}`);
  }

  getCourseById(id: number): Observable<Course>{
    return this.httpClient.get<Course>(`${this.baseURL}/${id}`);
  }
  // @ts-ignore
  getMyCourses(): Observable<any>{
      return this.httpClient.get(`${this.baseURL}/mycourses`, );
  }
  getCountSubcribeCourse(id: number):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/get-count-subcribe-course/${id}`)
  }
  // @ts-ignore
  getListCommentsByIdCourse(id:number):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/get-comments/${id}`)
  }
  // @ts-ignore
  postComment(comment: Comment):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/post-comment`,comment)
  }
  // @ts-ignore
  updateComment(id: number, content: string):Observable<any>{
    return this.httpClient.put(`${this.baseURL}/update-comment/${id}`,content)
  }
  //by admin
  deleteComment(id:number):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete-comment/${id}`)
  }
  //by user
  deleteCommentFromUser(id:number):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete-comment-by-user/${id}`)
  }
}
