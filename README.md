# Phonebook RESTful API
Simple API built using NodeJS, Express and MongoDB.

Grab the latest code: `git clone https://github.com/functionfirst/phonebook.git`

## Getting started
* `npm install` - installs module dependencies
* `npm start` - launch the API.
* `npm seed` - pre-seed the database with some demo data
* `npm test` - run mocha/chai tests

## Build Process
The app itself is built using ExpressJS which manages routes for the API, some simple middleware for error logging and jsonwebtoken for token-based authentication.

Persistent data storage is provided via MongoDB with Mongoose acting as an ODM.

Tests are undertaken using the Mocha testing framework while Chai is used to describe assertions.