import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  post(body) : Observable<Array<any>> {

    const currentUser = this.authService.currentUserValue;
    const Url =  environment.BASE_API_URL+"/payment";
  
    return this.http.post<any>(Url, body, {headers:{authorization:currentUser.token}});
    
  }

  confirm(body) : Observable<Array<any>> {

    const currentUser = this.authService.currentUserValue;
    const Url =  environment.BASE_API_URL+"/payment/confirm";
  
    return this.http.put<any>(Url, body, {headers:{authorization:currentUser.token}});
    
  }

}
