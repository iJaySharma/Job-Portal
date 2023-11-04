import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpResponse
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  loginUser(userData: any): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    return this.http.post(`${this.apiUrl}`, userData,options);
  }
  
}
