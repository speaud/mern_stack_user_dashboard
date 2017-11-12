# MERN Stack - Basic User Dashboard

### Stack
* MongoDB
* Express
* React + Redux
* Node


##### NPM Packages
* [Redux Forms](https://redux-form.com/)
* [Axios](https://github.com/axios/axios)
* Webpack - HMR for client
* Nodemon - HMR for server

##### Developer Tools
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
* [Redux Logger](https://github.com/evgenyrodionov/redux-logger)

_NOTE: Enabled for development environment only_


### Getting Started

From within the ./app/ directory:

First time clone, run `npm i`

Start the client server using webpack-dev-server `sudo npm run client`

Start the express server to handle api requests `sudo npm run server`

Client server is running on localhost:3000

Express server is running on localhost:3001

##### Directory Structure

* app
  * client
  * server
  * common (shared by client and server)
  	* modules
  	* etc

_NOTE: I tired to combine FHS standards with that set by the active community