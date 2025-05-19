# Uplift

## Description
Uplift is a platform promoting positive communication and user well-being by facilitating the sharing of constructive and motivating messages. The application supports building a positive online community.

## Demo
The application is available at: [app link]

## Technologies
- **Frontend**: React.js, CSS, HTML
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Deployment**: AWS EC2, Nginx

## Features
- User registration and login
- Sending positive messages to other users
- Profile personalization
- Viewing message history
- Application activity statistics

## Local Installation and Setup
1. Clone the repository: `git clone https://github.com/DominikZydek/uplift.git`
2. Navigate to the project directory: `cd uplift`
3. Install backend dependencies: `cd server && npm install`
4. Install frontend dependencies: `cd ../client && npm install`
5. Configure PostgreSQL database according to the instructions in `server/config/database.example.js`
6. Start the server: `cd ../server && npm start`
7. Start the client application: `cd ../client && npm start`

## Deployment
The application has been deployed on an AWS EC2 server with Nginx configured as a reverse proxy.

## Author
Dominik Żydek
