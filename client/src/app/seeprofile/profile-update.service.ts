import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateService {
  private apiUrl = 'http://localhost:3000/api/profile/set'; // Replace with your API endpoint

  constructor(private httpClient: HttpClient) {}

  updateProfile(updatedProfile: any): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    return this.httpClient.post(this.apiUrl, updatedProfile,options);
  }
}
