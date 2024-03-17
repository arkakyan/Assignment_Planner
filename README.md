
# Assignment Planner Application

## Overview

The Assignment Planner is a web application designed to assist students in managing and tracking assignments efficiently. It offers functionality to add, list, update, delete, and filter assignments based on difficulty level and status. The backend is developed with Node.js and Express, utilizing middleware for logging, request parsing, CORS handling, and environment variable management. The frontend is built using React, providing an intuitive user interface for interacting with the assignment data.

## Data Source 
The data utilized in this web service API is sourced from the "assignments_db.sql" file, which contains assignment information created by me.

## Technologies Used:

	- Backend: Node.js, Express
	- Middleware: Body-Parser, Cors
 	- Frontend: React
	- Database: MySQL

## Installation

** Database Setup:

 	- Download and install XAMPP version 8.0.28 from the official website.
	- After installing, launch the XAMPP Control Panel and start the MySQL service.
	- Within phpMyAdmin, click on the "Import" tab.
	- Choose the "assignments_db.sql" file provided with the project files and click on the "Go" 	  button to import the schema and data into your database.
	- Navigate to the backend folder of your project and locate the config.js file.
	- Update the database connection settings in config.js to match your new MySQL user 		  information and the name of the database you created. The configuration includes the 		  database name, username, password, and host.

** Backend Setup:

	- In VS code open my project in a new workspace and open the terminal
	- In the terminal navigate to the 'backend' directory: cd backend/

	- Run the following commands to initialize the project and install  all necessary 		  dependencies, including Express, Body-Parser, and Cors.
	  npm init -y
	  npm i express nodemon mysql cors

** To run Assignment Planner (Runned on index.js)**
	- Ensure that your package.json has the following script for starting the Assignment Planner Web service :
	  "scripts":{
		"start": "nodemon index.js"
	  }

	- Then in the terminal, start the backend server with "npm start". It listens on the port default to http://localhost:3001.

** Frontend Setup:

	- Before we set up the frontend, on the terminal panel, click on the Split Terminal option. 	  After that, in the left terminal window, change directory to backend folder by running "cd   	  backend/". Then, start the Node.js project using the "npm start" command. After running the 	  backend, navigate to the frontend directory where the React application resides by running 	  "cd frontend/" in the right terminal. 
	- Before run npm, make sure to install React and other dependencies: 
	  npm install react-router-dom axios. 
	- After installing the dependencies, start the React development server by running
	  "npm start". 
	- This command launches the frontend application, which should automatically open in your 	  default web browser at http://localhost:3000. 

	
## Running the Application:

	- With the backend and frontend services running, access the application via 
	  http://localhost:3000 in a browser.
	- The Assignment Planner application supports creating, viewing, updating, and deleting assignments, plus filtering by difficulty and status.


