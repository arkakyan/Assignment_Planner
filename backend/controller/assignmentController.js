const dbConnection = require("../config.js");

// ----------------------------------------------
// (1) Create a new assignment
// Assignment creation URI:http://localhost:3001/assignmentPlanner
exports.addAssignment = (request, response) => {
    const { assignment_name, difficulty_level, due_date, instructor_first_name, 
        instructor_last_name, status } = request.body;
    const sqlQuery = "INSERT INTO Assignments (assignment_name, difficulty_level, due_date, instructor_first_name, instructor_last_name, status) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [assignment_name, difficulty_level, due_date, instructor_first_name, instructor_last_name, status];

    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            return response.status(400).json({ Error: "Failed: Record was not added." });
        }
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json({ Success: "Successful: Record was added!." });
    });
};

// ----------------------------------------------
// (2) List all assignments
// Listing URI: http://localhost:3001/assignmentPlanner
exports.listAllAssignments = (request, response) => {
    const sqlQuery = "SELECT * FROM Assignments;";

    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(500).json({ error: true, message: err.message });
        }
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json(result);
    });
};

// ----------------------------------------------
// (3) Retrieve a specific assignment by ID
// Specific assignment URI: http://localhost:3001/assignmentPlanner/:id 
exports.getAssignmentById = (request, response) => {
    const assignment_id = request.params.assignment_id;
    const sqlQuery = "SELECT * FROM Assignments WHERE assignment_id = ?";

    dbConnection.query(sqlQuery, assignment_id, (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Error in the SQL statement. Please check."});
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: true, Message: "Assignment not found!" });
        }

        // Format the due_date for each assignment to be 'YYYY-MM-DD'
        const formattedResult = result.map(assignment => ({
            ...assignment,
            due_date: assignment.due_date.toISOString().split('T')[0] 
        }));

        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json({ Success: "Successfully finished.", data: formattedResult });
    });
};


// ----------------------------------------------
// (4) Update an existing assignment
// Update URI: http://localhost:3001/assignmentPlanner/:id 
exports.updateAssignment = (request, response) => {
    const assignment_id = request.params.assignment_id;
    const { assignment_name, difficulty_level, due_date, instructor_first_name, 
        instructor_last_name, status } = request.body;

    // Check for missing or empty fields
    if (!assignment_name.trim() || !difficulty_level.trim() || !due_date.trim() || 
    !instructor_first_name.trim() || !instructor_last_name.trim() || status.trim() === "") {
        return response.status(400).json({Error: "Failed: All fields are required and must not be empty."});
    }


    const sqlQuery = "UPDATE Assignments SET assignment_name = ?, difficulty_level = ?, due_date = ?, instructor_first_name = ?, instructor_last_name = ?, status = ? WHERE assignment_id = ?";
    const values = [assignment_name, difficulty_level, due_date, instructor_first_name, instructor_last_name, status, assignment_id];

    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return response.status(500).json({Error: "Failed: Record was not updated."});
        }
        if (result.affectedRows === 0) {
            // No record was updated, if user update the assigment that doesn't exist by calling invalid assignment_id 
            return response.status(404).json({Error: "Failed: Record not found."});
        }
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json({Success: "Successful: Record was updated!"}); 
    });
};


// ----------------------------------------------
// (5) Delete an assignment
// Delete URI: http://localhost:3001/assignmentPlanner/:id
exports.deleteAssignment = (request, response) => {
    const assignment_id = request.params.assignment_id;
    const sqlQuery = "DELETE FROM Assignments WHERE assignment_id = ?";

    dbConnection.query(sqlQuery, assignment_id, (err, result) => {
        if (err) {
            return response.status(500).json({ Error: true, Message: err.message });
        }
        if (result.affectedRows === 0) {
            // If there is no record with the provided ID exists to delete
            return response.status(404).json({ Error: true, Message: "Record not found." });
        }
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json({ Success: "Successful: Record was deleted!" });
    });
};


// ----------------------------------------------
// (6) Filter Assignment by Difficulty
// Filter by Difficulty URI:http://localhost:3001/assignmentPlanner/difficulty/Easy
exports.filterAssignmentsByDifficulty = (request, response) => {
    const difficulty_level = request.params.difficulty_level;
    const sqlQuery = "SELECT * FROM Assignments WHERE difficulty_level = ?";

    dbConnection.query(sqlQuery, [difficulty_level], (err, result) => {
        if (err) {
            return response.status(500).json({ Error: true, Message: "Failed to retrieve assignments by difficulty level." });
        }
        if (result.length === 0) {
            return response.status(404).json({ Error: true, Message: "No assignments found for the specified difficulty level." });
        }
         // Format the due_date for each assignment to be 'YYYY-MM-DD'
         const formattedResult = result.map(assignment => ({
            ...assignment,
            due_date: assignment.due_date.toISOString().split('T')[0] 
        }));

        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json({ Success: "Successfully finished.", data: formattedResult });
    });
};


// ----------------------------------------------
// (7) Filter Assignment by Status
// Filter Assignment by Status URI:http://localhost:3001/assignmentPlanner/status/Done
exports.filterAssignmentsByStatus = (request, response) => {
    const status = request.params.status;
    const sqlQuery = "SELECT * FROM Assignments WHERE status = ?";

    dbConnection.query(sqlQuery, [status], (err, result) => {
        if (err) {
            return response.status(500).json({ error: true, message: "Failed to retrieve assignments by status." });
        }
        if (result.length === 0) {
            return response.status(404).json({ error: true, message: "No assignments found with the specified status." });
        }

         // Format the due_date for each assignment to be 'YYYY-MM-DD'
         const formattedResult = result.map(assignment => ({
            ...assignment,
            due_date: assignment.due_date.toISOString().split('T')[0] 
        }));

        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'no-cache');
        return response.status(200).json({ Success: "Successfully finished.", data: formattedResult });
    });
};

