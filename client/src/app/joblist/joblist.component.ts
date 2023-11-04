import { Component } from '@angular/core';
import { JobService } from './joblist.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent {
  jobs?: any[]; // Define the data structure to hold the list of jobs

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe((data: any) => {
      this.jobs = data.map((job: any) => {
        job.postedDate = new Date(job.postedDate); // Convert the postedDate to a Date object
        return job;
      });
    });
  }
}
