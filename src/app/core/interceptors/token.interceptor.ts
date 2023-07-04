import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.token}`
    });
    
    const reqClone = request.clone({
      headers
    });

    return next.handle( reqClone ).pipe(
      catchError( this.handleErorr )
    );
  }

  handleErorr( err: HttpErrorResponse ) {
    console.error(err);
    if (err.status === 401 || err.status === 400) {
      alert('Invalid Token, page will be refreshed to get a new one.');
      window.location.reload();
    }
    return throwError('Please check your token');
  }
}
