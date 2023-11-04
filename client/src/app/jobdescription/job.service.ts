import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/job';

  constructor(private httpClient: HttpClient) {}

  saveJob(jobId: string): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    return this.httpClient.post(`${this.apiUrl}/save/${jobId}`,{},options);
  }

  unsaveJob(jobId: string): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    return this.httpClient.post(`${this.apiUrl}/unsave/${jobId}`,{},options);
  }
}
