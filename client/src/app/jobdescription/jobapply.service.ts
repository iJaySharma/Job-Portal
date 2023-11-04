import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {
  private apiUrl = 'http://localhost:3000/api/job/apply';

  constructor(private httpClient: HttpClient) {}

  applyForJob(jobId: string,formData: FormData): Observable<any> {
    const options = {
      withCredentials: true, // Include cookies with the request
    };   
    return this.httpClient.post(`${this.apiUrl}/${jobId}`,formData,options);
  }
}
