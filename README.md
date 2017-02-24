# Polling Application Server

## Table of Contents  
* **[About](#about)**  
  * [Installation](#installation)  
  * [Live Deployment](#live-deployment)  
  * [Development Features](#development-features)  
* **[Project Code](#project-code)**  
  * [File Structure](#file-structure)
  * [Models](#models)  
    * [Poll](#poll)  
    * [Option](#option)  
    * [User](#user)
  * [Controllers](#controllers)  
    * [Auth](#auth)  
    * [Polls](#polls)  
    * [Options](#options)  
    * [Users](#users)
  * [Middleware](#middleware)  
    * [Authentication](#authentication)  
* **[About Me](#about-me)**

## About
This polling application is a full stack project I made which aims to allow authenticated users to create polls with an unlimited amount of options to vote for. Once the poll is created, they may share the unique link to the poll with others to vote. Users do not need to be registered to place a vote. Polls are automatically refreshed so that users can see real-time results as votes come in.

This repository contains the back-end code for the application, including all database models, route controllers, middleware, and more. The starting point for the URI is at http://localhost:3010/ if running locally.

### Installation
To install, run:

`npm install`

To run the server (default port 3010):

`node index.js`

or you may run the server with a daemon or process manager such as nodemon, forever, or pm2.

### Live Deployment
You can make API calls directly to the deployed URI located at https://puljak.ca/polling_app/api/. See the [controllers](#controllers) for further details.

### Technology Used
The following are some of the various frameworks and libraries used to create this application:
* Express server framework 
* MySQL for the database
* Sequelize for the object relational modeling tool
* Passport middleware for local and JSON web token authentication
* bcrypt for password hashing

## Project Code

### File Structure
```
├── config/
|   ├── Passport and JWT configuration
├── controllers/
|   ├── Router request handling to individual action controllers
├── middleware/
│   ├── Middleware directory for the application - mostly for authentication
├── models/
|   ├── The database model definitions for the application
├── node_modules/
|   ├── Module dependencies
├── index.js
|   ├── Main index file, all definitions & reactDOM render
├── package.json
|   ├── package.json file
├── README.md
|   ├── README.md file
```

### Models
The following are the database model definitions for the polling application:

#### Option
The Option model defines a possible option that a user may vote for in a particular poll. 

The Option Schema:  
* id -> PRIMARY KEY INTEGER: The id of the option
* option -> STRING: The full description of a poll's option
* votes -> INTEGER: The number of votes an option has
* color -> STRING: A randomized RGB color to use to display on the client 

#### Poll
The Poll model defines a poll question that may be created by an authenticated user. A poll contains 2 or more options that people may vote for.

The Poll Schema:  
* id -> PRIMARY KEY INTEGER: The id of the poll
* question -> STRING: The full description of a poll's question
* UserId -> FOREIGN KEY USERID: The user id that that created this poll

#### User
The User model defines a registered user on the website.

The User Schema:  
* id -> PRIMARY KEY INTEGER: The id of the user
* username -> STRING: The user's username
* password -> STRING: The user's encrypted password

### Controllers
The following are the routes which handle the various action controllers:

#### Auth
##### POST route /login
`http://localhost:3010/api/auth/login`

* Logs the user in
* Requirements:
  * body.username -> The username of the account you wish to authenticate
  * body.password -> The password of the account you wish to authenticate
* Returns a JWT token upon a successful login, otherwise an error

##### POST route /register
`http://localhost:3010/api/auth/register`

* Creates a user
* Requirements:
  * body.username -> The username of the new account you wish to register
  * body.password -> The password of the new account you wish to reigster 
* Returns a JWT token upon a successful register, otherwise an error

#### Options
##### POST route /create
`http://localhost:3010/api/options/create`

* Creates a new poll option
* Requirements
  * body.option -> The question string of the poll option
  * body.PollId -> The id of the poll this option is associated with
* Returns a success string if created

##### GET route /:option_id/vote
`http://localhost:3010/api/options/:option_id/vote`

* Increment's an option's votes by one
* Requirements
  * params.option_id -> The id of the option to be incremented
* Returns a success string if voted

##### POST route /:option_id/vote
`http://localhost:3010/api/options/:option_id/delete`

* Deletes an option
* Requirements
  * params.option_id -> The id of the option to be deleted
* Returns a success string if deleted

#### Polls
##### POST route /create
`http://localhost:3010/api/polls/create/`

* Creates a poll
* Requirements
  * body.question -> The poll's question
  * body.UserId -> The id of the user to associate the poll with
* Returns a success string if created

##### GET route /fetch_all
`http://localhost:3010/api/polls/fetch_all`

* Obtains a list of polls and their id's
* Sends the list of polls in inverse chronological order

##### GET route /:poll_id/read
`http://localhost:3010/api/polls/:poll_id/read`

* Read a poll and it's options
* Requirements
  * params.poll_id -> The id of the poll
* Send a poll's information along with who created 
* it, date created, question, and it's options

##### POST route /:poll_id/delete
`http://localhost:3010/api/polls/:poll_id/delete`

* Deletes a poll
* Requirements
  * params.poll_id -> The id of the poll
* Returns a sucess string if deleted

#### Users
##### POST route /create
DEPRECATED -> Obsolete with tokens (Use /api/auth/register instead)

##### DELETE route /:user_id/delete
`http://localhost:3010/api/users/:user_id/delete`

* Deletes a user
* Requirements
  * params.user_id -> The id of the user
* Returns a success string if deleted

### Middleware
The following is the middleware that this application uses:

#### Passport
The API for Street View Tourist uses passport.js to handle user authentication. It uses JSON web tokens that are sent to the user when they register or sign in and are subsequently stored in the user browser's local storage. Passport uses a given username and password to make comparisons in the database to authenticate the credentials. Passwords are hashed and stored in the database using bcrypt.

## About Me  
I'm a computer science graduate looking to break into the world of professional software and web development. For more information about me, visit my website at [puljak.ca](https://puljak.ca)!