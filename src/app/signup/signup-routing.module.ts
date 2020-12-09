import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    { path: '', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgbModule.forRoot()],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
