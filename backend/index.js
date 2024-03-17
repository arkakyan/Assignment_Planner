
// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend REST Service Module
// ----------------------------------------------

const express = require("express");
const bodyParser = require("body-parser"); 
const cors = require('cors'); 

// Importing the routes for handling assignment-related operations.
const assignmentsRoutes = require('./routes/assignmentsRoutes');

// Initializing the express application
const app = express();

// Middleware to parse incoming request bodies in JSON format.
app.use(bodyParser.json());

// Middleware to parse bodies of requests with urlencoded payloads.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Setting up a route middleware that directs requests with the base URL '/assignmentPlanner' to the assigned routes.
app.use('/assignmentPlanner', assignmentsRoutes);

// Error handling middleware to catch any errors that occur during the handling of requests.
app.use((err, req, res, next) => {
    console.error(err.stack); // for debugging.
    const statusCode = err.statusCode || 500; // Defaulting to a 500 server error if there is no specific status code from error.
    const message = err.message || 'An error occured'; // Default error message.
    res.status(statusCode).send({
        error: true,
        message: message
    });
});



const port = 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`); 
});
