import { Component, OnInit } from '@angular/core';
import { ProfileService } from './seeprofile.service';
import { ProfileUpdateService } from './profile-update.service';

@Component({
  selector: 'app-seeprofile',
  templateUrl: './seeprofile.component.html',
  styleUrls: ['./seeprofile.component.css']
})
export class SeeprofileComponent implements OnInit {
  userProfile: any; // Define a variable to store the user's profile data

  public isEditMode: boolean = false; // Add this property

  public editProfile(): void {
    this.isEditMode = !this.isEditMode;
  }
  constructor(private profileService: ProfileService,private profileUpdateService : ProfileUpdateService) {}

  ngOnInit() {
    // Call the service to fetch the user's profile
    this.profileService.getUserProfile().subscribe((data: any) => {
      this.userProfile = data;
      console.log('User Profile:', this.userProfile);
    });
    
  }

  saveProfile() {
    // Assuming you have an updated profile in the userProfile object
    this.profileUpdateService.updateProfile(this.userProfile).subscribe((response) => {
      // Handle the response from the server, e.g., show a success message
      console.log('Profile updated successfully', response);
      this.isEditMode = false; // Exit edit mode after updating
    });
}
}
