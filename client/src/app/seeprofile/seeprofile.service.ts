import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profile/get'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    // You can customize the URL or headers as needed
    return this.http.get(`${this.apiUrl}`,options);
  }
}
