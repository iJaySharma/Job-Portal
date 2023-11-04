import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profile/set';

  constructor(private http: HttpClient) {}

  saveProfile(profileData: any) :Observable<any>{
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    
    return this.http.post(`${this.apiUrl}`, profileData,options);
  }
}
