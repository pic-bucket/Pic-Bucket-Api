# PicBucket API
-------------------------
Welcome to our team project “PicBucket” which is full-stack Single Page Appliction that we built in General Assembly Soft Engeering Immersive. This README will show you our story, challenges while we were creating this apllication. In this application, we want our users to be able to sign up, sign in, see pictures, upload/delete their own pictures, and sign out.

### Technologies used
-------------------------

###### Front end:
* HTML
* CSS
* JavaScript - jQuery - AJAX
* Bootstrap
* Hnadlebars

###### Back end:
* AWS S3
* Express
* MongoDB
* Mongoose
* Multer
* Passport
* Body-Parser
* Node JS

### Planning
------------------------------
We implemented some of Scrum concept for plannig our develoment by having a sprint plannig meating and stand ups meeting at least twice a day. We had initials wireframes and ERD for back and frontend as well as MVP user stories.

### Development Process
--------------------------------
We initial break in two teams front and back end, after we acomplished the goals for day 1 we change to mob programing to tackle S3 issues and move foward with the planned schedule.

1. Set up and deploy both repos on github and heroku.
2. Set up API
3. Set up front end forms and buttons
4. Connect front and back end
5. Test functionality
6. Deploy working code
7. Set up diffrent views
8. Debbugging
9. Styling
10. Final deploy

##### Problem Solving:
We encounter issues merging different pieces of code, we as a group fixed merging conflicts, we opened issues wen needed and jump from front or back end according the project's/group needs.

##### Project links:
* Front end repo: (https://github.com/pic-bucket/Pic-Bucket)
* Front end deployed app: https://pic-bucket.github.io/Pic-Bucket/
* Back end repo: (https://github.com/pic-bucket/Pic-Bucket-Api)
* Back end deployed api: (https://gentle-spire-82596.herokuapp.com/)

##### PicBucket Development Team:
* Sam Haider(https://github.com/shaider0)
* Selcuk Toklucu (https://github.com/selcuktoklucu)
* London Lee (https://github.com/London19)
* Roberto Pinales (https://github.com/rpinales87)

### ERD and API Routes
--------------------------------------

ERD: https://files.slack.com/files-pri/T0351JZQ0-FJKR2SLHX/erd_team_project.jpg

| Verb        | URL Pattern           | Controller#Action  |
| ------------- |:-------------:| -----:|
| POST      | /sign-up | users#signup |
| POST      | /sign-in      |   users#signin |
| DELETE | /sign-out     |    users#signout |
| PATCH      | /change-password | users#changepw |
| GET      | /pictures      |   pictures#index |
| POST | /pictures     |    pictures#create |
| GET   | /pictures/:id  | pictures#show  |
| PATCH   | /pictures/:id  | pictures#update  |
| GET  | /pictures/:id  | pictures#destroy  |


----------
PicBucket May 14, 2019
