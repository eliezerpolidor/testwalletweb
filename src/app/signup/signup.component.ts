import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageErrors } from '../shared/services/errors.service'
import { AlertService, AuthService } from '../shared/services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit {
    public myFormSignUp: FormGroup;
    public MessageErrors:any={};
    loading = false;

    constructor(public router: Router,public fb: FormBuilder, private authService: AuthService, private alertService: AlertService) { 
        this.MessageErrors = MessageErrors;        
    }

    ngOnInit() {
        this.createFormSignUp();
     }

    createFormSignUp(){
        this.myFormSignUp = this.fb.group({
            document:    ['', [Validators.required, Validators.maxLength(30)]],
            names:    ['', [Validators.required, Validators.maxLength(30)]],
            email:    ['', [Validators.required, Validators.maxLength(30), Validators.email]],
            password:    ['', [Validators.required]],
            confirmPassword:    ['', [Validators.required]],
            cellphone:    ['', [Validators.required, Validators.maxLength(30)]]
          }, {
            validator: PasswordValidation.MatchPassword
          });
    }

    signUp() {
        if (this.myFormSignUp.invalid) {
            return;
        }
        this.loading = true
        this.authService.signUp(this.myFormSignUp.value)
        .subscribe(
          data => {
            alert("Usuario creado!");
            this.loading = false;
            this.myFormSignUp.reset();
            this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
    }

}
