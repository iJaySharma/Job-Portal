// job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/job/list'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    return this.http.get(`${this.apiUrl}`,options);
  }
}
