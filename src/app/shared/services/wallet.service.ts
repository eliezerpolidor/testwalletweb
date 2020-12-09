import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  get() : Observable<Array<any>> {

    const currentUser = this.authService.currentUserValue;
    const Url =  environment.BASE_API_URL+"/wallet";
  
    return this.http.get<any>(Url,{headers:{authorization:currentUser.token}});
    
  }
}
