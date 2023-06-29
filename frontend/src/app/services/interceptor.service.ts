import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  private token:string = ''

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JituExchange-token')
    this.token =  token ? token : '' 

    let modifiedRequest = req.clone({
      headers: new HttpHeaders().append('token', this.token)
    })
    return next.handle(modifiedRequest)
  }
}
