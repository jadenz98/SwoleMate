# SwoleMate
SwoleMate is a mobile app that was created for our Software Engineering class that was meant to help workout partners connect with each other. 

## Problem Statement
Finding a workout partner can be difficult with how much skill and ability can vary between people. With SwoleMate you can quickly browse profiles of other exercise enthusiasts in your area to find a workout partner similar to yourself. Working out, whether it be running or going to the gym, can be a solitary activity, but the addition of a companion can add some much needed motivation, camaraderie, and morale to your workout. SwoleMate provides a platform to build your own personal fitness profile and schedule and connect with other active people around you. While the profile is useful for personal metrics such as schedule, type of workout, length of workout, and the finer details of what you accomplished, it is also able to be viewed by others to gauge your workout compatibility. 

## Technologies Used

### Frontend
The frontend consists of a React Native app developed using JavaScript. React Native helped us ensure that we could support both Android and iPhone with the same code base while also providing many helpful features to reflow the UI based on user input.

### Backend
As for the backend of the app, we built out an Express server with Mongo that is currently hosted on an AWS EC2 instance. Using these technologies meant that we could use JavaScript for the entire app while being able to store our data in an easy to use format since Mongo stores data similarly to JavaScript objects.

### Testing
The frontend tests that we put together were manual tests, however, we did build out an automated test suite for the backend to ensure the success of one of the most important parts of our app. We put together these series of tests using Mocha with Chai HTTP. These tests can be found at [Backend/test/api.test.js](Backend/test/api.test.js).

## Development Strategy
A big part of this project was both learning and implementing Agile and the idea of sprints. During this project, we went through a total of 3 sprints at 3 weeks long each. As a part of Agile, we made many different documents over the course of our project, which can all be found under the [Documents](Documents) folder. Some of the details found in the earlier documents were changed as the project progressed (e.g. using Express on AWS instead of Firebase as we originally planned) due to many reasons, but most of the initial ideas are reflected in the final product.

## Individual Roles
Each of us contributed to many parts of the app, but we mainly stuck to the following roles:
- Frontend: Jaden and Kevin
- Fullstack: Sam
- Backend: Steven and Ryan

---
*Thanks for checking out the project!*

*\- The SwoleMate Team*
