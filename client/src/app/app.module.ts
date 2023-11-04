import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { JoblistComponent } from './joblist/joblist.component';
import { SeeprofileComponent } from './seeprofile/seeprofile.component';
import { LandingComponent } from './landing/landing.component';
import { JobdescriptionComponent } from './jobdescription/jobdescription.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    JoblistComponent,
    SeeprofileComponent,
    LandingComponent,
    JobdescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add this line
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
