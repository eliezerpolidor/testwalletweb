import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentuserValue: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { 
    this.currentuserValue = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentany')));
    this.currentUser = this.currentuserValue.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentuserValue.value;
  }

  login(email: string, password: string) {
    const Url =  environment.BASE_API_URL+"/signin";
    const body = {
      email : email,
      password : password
    }

    return this.http.post<any>(Url,body)
        .pipe(map(rsp => {
            if (rsp.success && rsp.response) {
                localStorage.setItem('currentany', JSON.stringify(rsp.response));
                this.currentuserValue.next(rsp.response);
            }
            return rsp.response;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentany');
    this.currentuserValue.next(null);
  }

  signUp(body: any) {
    const Url =  environment.BASE_API_URL+"/user";

    return this.http.post<any>(Url,body)
        .pipe(map(rsp => {
            return rsp.response;
        }));
  }


}
