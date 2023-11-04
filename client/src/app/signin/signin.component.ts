import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService,private router: Router) {}

  loginUser() {
    if (!this.email || !this.password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
    };

    this.loginService.loginUser(userData).subscribe((response) => {
      if(response.message==='ok'){
        const hasProfile = response.hasProfile; // Replace with your actual field name

    if (hasProfile) {
      // User has a profile, navigate to the "Profile" component
      this.router.navigate(['/jobs']);
    } else {
      // User doesn't have a profile, navigate to the "Jobs" component
      this.router.navigate(['/profile']);
    }
      }
    },
    (error) => {
      console.log('Error :', error);
      alert('Failed to login. Please try again.');
    });
  }
}
