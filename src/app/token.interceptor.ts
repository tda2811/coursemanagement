import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('accessToken')
    if(token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.router.navigate(["/login"]);
          }
        }
        return throwError(()=> new Error("ERROR"));
      })

    )
  }
}
