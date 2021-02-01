# Covid tracker MERN Stack

This is a covid tracker built using MongoDb, Express, React and Nodejs, to track the spread of coronavirus.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Download Node LTS version here: <https://nodejs.org/en/download/>
- Download VSCode from here: <https://code.visualstudio.com/>
- Install both before continuing
- Download MongoDB from here <https://www.mongodb.com/download-center/community> don’t do anything with it just yet.

### Installing & Starting

- Clone the github repo in your desired location.
- Open the cloned repo with Visual Studio Code (Referred to as VSCode).
- Open config/config.js and update the mongodb url.
- You could open server/server.js and update the cron job string to '*/15 * * * *', so that database gets populated in every one minute, by default it will update in every 15 minute, this could lead to empty db when you start the server.
- In the terminal type `npm install` and hit enter.
- Once that finshes, the project is ready to go :)
- Start the web page and server by typing `npm run dev` into terminal.
- The site is now available at <http://0.0.0.0:8080/> or <http://localhost:8080/>

## Built With

- [MongoDB](https://github.com/mongodb/mongo) - Database used.
- [React](https://github.com/facebook/react) - Frontend JavaScript library.
- [Express](https://github.com/expressjs/express) -Server/routing API for web app.
- [Node](https://github.com/nodejs/node) - Backend JS runtime.
- [Webpack](https://github.com/webpack/webpack) - JS bundler for performance and ease of deployment.

## Author

- **Kshitij Bharde**
    