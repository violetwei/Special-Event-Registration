# Specialized Event Registration System

## Overview
**Backend + Frontend** built with Gradle, SpringBoot, Vue.js, Heroku, Travis CI and RESTful APIs 

## How to run
- git clone Repo
- Install npm on cloned location
- run npm start

## Backend 
Implement all features as business methods and make them available as RESTful services using Java Spring Technology. 
The services need to persist data by using a database. The backend application is a gradle project.

### Running the Backend tests
issue ```gradle test -i``` in the *REPO_ROOT/EventRegistration-Backend/* folder

Note: Running backend tests require a database connection, you need to configure the SPRING_DATASOURCE_URL or corresponding variables in the *application.properties* file.

## Frontend
The Web UI supports the specialized features using Vue.js.

The source code for the end-to-end test cases is located in the folder *REPO_ROOT/EventRegistration-Frontend/test/e2e/specs*

### Running the Frontend tests
To run the end-to-end (e2e) tests cases, issue ```npm run e2e``` in *REPO_ROOT/EventRegistration-Frontend/* folder

Note: The successful execution of end-to-end tests requires that you have executed ```npm install``` in the frontend folder and the backend is already running and connected to a database.

Note: When running ```npm run e2e``` locally, some end-to-end tests may fail if your computer is operating with a higher load - just re-run the tests if this happens to verify correct behavior. The performance will not be an issue in the CI evaluation environment because there will not be many other processes running there.
