import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private registrationService: RegistrationService) {}

  registerUser() {
    if (!this.email || !this.password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
    };

    this.registrationService.registerUser(userData).subscribe((response) => {
      // Handle the response from your API here
      alert('Registered successfully!');
    });
  }
}
