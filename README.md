# Job-Portal Overview 

```
This is a Job Portal where user can see the list of featured jobs and submit their application.
User can signup and signin them selves.
User can create and update their profile after logged in successfully.
User can see job description and able to save unsave them for future reference.
User can choose pdf file from local system and attach them by apply button to get job applied.
User can advertise job by creating them and seeing the associated applicants.
```

## Features & Usage 

<ul>
  <li>Initially User presented with landing page of signup and sign in option for registeration and login into their accounts.</li>
  <li>After logged in successfully application will promt user for creating their profile to save details and if profile already exists user get redirected to job board with job listings for applying.</li>
  <li>User can click on see description for specific job to get presented with full job desciption and options for save unsave job and apply by choosing pdf from local system to able to submit it for selected job.</li>
  <li>User can see list of saved job applied jobs for management purpose. </li>
  <li>for every logged in user a session cookie has been maintained for managing every user action/request and to authorize them for requesting resources belongs to them. </li>
</ul>

## Lets Get Started 

* DownLoad [Latest Node Version](https://nodejs.org/en/download)
* Install [Angular](https://angular.io/)
* Setup [Mongodb](https://www.mongodb.com/try/download/community.)

## Important build Commands

```
npm install                                    npm install -g @angular/cli
ng generate service service-name               ng generate component component-name
ng add @ng-bootstrap/ng-bootstrap              npm install jquery
npm install mongodb                            npm install connect-mongo
npm install express-session                    npm install express
npm install cors                               npm install crypto bycrypt
```

## Local Setup

<ul>
  <li>Run the command <strong>node index.js</strong> inside server directory where index.js is the main application file for handling mongodb routers models cors </li>
  <li>Run the command <strong>ng serve</strong> inside client directory where the angular/frontend module with components bootstrap the application</li>
  <li>Finally hit the url <strong>http:localhost:4200</strong> in browser where the application is hosted, application should perform well!</li>
<ul>


## Features To be Completed 
```
- Embedding the Filter which enhance search capabilities by searching key words for relevant outcomes of jobs.
- Job advertising feature with reviewing the applications and submmited resume pdfs of applicants.
```
