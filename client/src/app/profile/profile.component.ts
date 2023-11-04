import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Define properties for the form fields
  firstName: string = '';
  lastName: string = '';
  selfOverview: string = '';
  institute: string = '';
  degree: string = '';
  aggregate: number = 0;
  passingDate: string = '';
  jobTitle: string = '';
  companyName: string = '';
  description: string = '';
  period: string = '';
  portfolioLinks: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  constructor(private profileService: ProfileService,private router: Router) {}

  saveProfile() {
    /*
    // Perform form validation here
    if (!this.firstName || !this.lastName || !this.institute || !this.degree || this.aggregate <= 0 || !this.passingDate || !this.jobTitle || !this.companyName || !this.description || !this.period || !this.portfolioLinks || !this.email || !this.phone || !this.address) {
      alert('please fill all the required details');
      return;
    }
    */

    // Construct a profile data object to send to the service
    const profileData = {
      profile: {
        name: {
          firstName: this.firstName,
          lastName: this.lastName,
        },
        selfOverview: this.selfOverview,
        education: [
          {
            institute: this.institute,
            degree: this.degree,
            aggregate: this.aggregate,
            passingDate: this.passingDate,
          },
        ],
        experience: [
          {
            jobTitle: this.jobTitle,
            companyName: this.companyName,
            description: this.description,
            period: this.period,
          },
        ],
        portfolioLinks: this.portfolioLinks.split(',').map(link => link.trim()), // Split and trim links
        contact: {
          email: this.email,
          phone: this.phone,
          address: this.address,
        },
      },
    };

    // Call the service to save the profile
    this.profileService.saveProfile(profileData).subscribe((response) => {
        if(response.message==='ok'){
        this.router.navigate(['/jobs']);
        }
      },
      (error) => {
        console.log('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    );
  }
}
