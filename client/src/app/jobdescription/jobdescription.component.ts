import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobdescriptionService } from './jobdescription.service';
import { JobService } from './job.service';
import { JobApplyService } from './jobapply.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css']
})
export class JobdescriptionComponent implements OnInit {
  jobDescription: any;
  isSaved: boolean = false; // Initialize as not saved
  isApplied: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobdescriptionService: JobdescriptionService,
    private jobService: JobService,
    private jobApplyService: JobApplyService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (this.cookieService.check('isApplied')) {
        this.isApplied = this.cookieService.get('isApplied') === 'true';
      }
      const jobId = params['jobId'];
      this.jobdescriptionService.getJobDescription(jobId).subscribe((response) => {
        this.jobDescription = response;
      });
    });
  }

  toggleSaveUnsave() {
    if (this.isSaved) {
      // Unsave the job
      this.jobService.unsaveJob(this.jobDescription._id).subscribe(
        (response) => {
          if (response.message==='ok') {
            this.isSaved = false;
          }
        },
        (error) => {
          console.error('Failed to unsave the job:', error);
        }
      );
    } else {
      // Save the job
      this.jobService.saveJob(this.jobDescription._id).subscribe(
        (response) => {
          if (response.message==='ok') {
            this.isSaved = true;
          }
        },
        (error) => {
          console.error('Failed to save the job:', error);
        }
      );
    }
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

applyForJob(jobId: string) {
  const formData = new FormData();
  formData.append('cv', this.selectedFile as Blob);
  this.jobApplyService.applyForJob(jobId,formData).subscribe(
    () => {
      this.isApplied = true;
      this.cookieService.set('isApplied', 'true');
    },
    (error) => {
      // Handle error
      console.error('Error applying for the job:', error);
    }
  );
}
}