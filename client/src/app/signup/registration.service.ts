import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000/api/register'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}`, userData);
  }
}
