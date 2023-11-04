import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobdescriptionService {
  private apiUrl = 'http://localhost:3000/api/job/description';

  constructor(private httpClient: HttpClient) {}

  getJobDescription(jobId: string): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };
    return this.httpClient.get(`${this.apiUrl}/${jobId}`,options);
  }
}
