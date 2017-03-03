Log Room
=====
### Live Site:
https://ancient-beyond-11469.herokuapp.com/

### Introduction
When working with a team of people on procedural projects, peoples work may be held up if certain aspects of the job has not been completed.
You would need to ensure that certain critical steps have been done before continuing work. Getting a hold of that person who may have completed
that step may be time consuming and irritating. Log Room provides a centralized area where completed tasks can be logged and time stamped to 
inform all who are logged in to know the status of certain events. There would be no more guessing on 'if' it has been completed. Each team 
member will be certain that it has been completed. 

### Use case
This app is ideal for a team of personnel that works in a twenty-four hour operation. It has been tailored to groups who need to know what has 
happened within their daily operations. To ensure that proper turn over has been given to the on-coming team. With that being said, this app
can be used in other ways also! This app can be used for anyone who needs to make a chronological entry to keep track of when a task has been done.
There is not limit to who or how you can use it.

### Page Layout
**Sign In / Sign up Page**
![logroom-signin](https://cloud.githubusercontent.com/assets/15925701/23242075/8f8f9924-f93c-11e6-8e6e-2257a247c15e.PNG)
**Home Page**
![logroom-home](https://cloud.githubusercontent.com/assets/15925701/23242076/91c11f42-f93c-11e6-880f-b81141ba2e31.PNG)
**Log Room**
![logroom-logroom](https://cloud.githubusercontent.com/assets/15925701/23242080/9344143c-f93c-11e6-807f-c6ec1ac3348a.PNG)


### Technologies:

* HTML5 - Used to setting up semantic meaning to each page of the app. 
* CSS3 - Provided the styling and page layout. 
* jQuery - Used for AJAX calls and interactivity within the app. 
* Express - To handle http request
* Passport.js - For server side authentication
* MongoDB/Mongoose - For data persistance

### Future
* Have users interact with other users on the same Log Room.
* Have the Log Room expire after a specified date and time.
* Have an option to open a new Log Room automatically at daily/weekly/monthly internals.

 ### Installation
 ```
 git clone https://github.com/shootermantes/LogRoom.git
 ```
 
 ### Run App
 ```
 node server.js
 ```
