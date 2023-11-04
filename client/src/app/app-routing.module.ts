import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { JoblistComponent } from './joblist/joblist.component';
import { SeeprofileComponent } from './seeprofile/seeprofile.component';
import { LandingComponent } from './landing/landing.component';
import { JobdescriptionComponent } from './jobdescription/jobdescription.component';

const routes: Routes = [
  {path : '',component : LandingComponent},
  {path : 'seeprofile',component : SeeprofileComponent },
  {path : 'jobs', component: JoblistComponent },
  {path : 'jobdescription/:jobId', component: JobdescriptionComponent }, // Define a route parameter ':jobId'
  {path : 'signup',component : SignupComponent },
  {path : 'signin',component : SigninComponent },
  {path : 'profile',component : ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
