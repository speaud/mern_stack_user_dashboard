# MERN Stack - Basic User Dashboard --- IN DEVELOPMENT, NOTE: NOT PROD READY NOR STABLE

### Stack
* MongoDB
* Express
* React + Redux
* Node


##### NPM Packages
* Client
  * [Redux Forms](https://redux-form.com/)
  * [Material UI](http://www.material-ui.com/)
  * [Axios](https://github.com/axios/axios)
  * Webpack - HMR for client
* Server
  * Nodemon - HMR for server

##### Developer Tools
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
* [Redux Logger](https://github.com/evgenyrodionov/redux-logger)

_NOTE: Enabled for development environment only_

Use Postman for API development

### Getting Started

From within the ./app/ directory:

First time clone, run `npm i`

Start both the client server (webpack-dev-server) and API server (express) `sudo npm run start-servers`

If you are developing API's while only testing with Postman you can run the standalone API server by running `sudo npm run server`

NOTE: If you run the client server without running the API server (express) the app will return errors since said API server is not running

Client server is running on localhost:3000

Express server is running on localhost:3001 (use for Postman development purposes)

##### Directory Structure

* app
  * client
  * server
  * common (shared by client and server)
  	* modules
  	* etc

_NOTE: I tired to combine FHS standards with that set by the active community