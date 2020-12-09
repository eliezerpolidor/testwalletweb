import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, AuthService } from '../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private alertService: AlertService
  ) {
      if (this.authService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.createFormLogin();
      this.returnUrl = '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }

  createFormLogin(){
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
}
