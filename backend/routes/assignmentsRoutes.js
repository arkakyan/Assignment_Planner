const express = require('express');
const router = express.Router();
const { addAssignment, listAllAssignments, getAssignmentById, updateAssignment, 
    deleteAssignment, filterAssignmentsByDifficulty, filterAssignmentsByStatus } = require('../controller/assignmentController');


// CRUD operations for Assignments
router.post('/', addAssignment);  // Create a new assignment
router.get('/', listAllAssignments);  // List all assignments
router.get('/:assignment_id', getAssignmentById);  // Retrieve a specific assignment by ID
router.put('/:assignment_id', updateAssignment);  // Update an existing assignment
router.delete('/:assignment_id', deleteAssignment);  // Delete an assignment

// Second-degree granularity
router.get('/difficulty/:difficulty_level', filterAssignmentsByDifficulty);  // Retrieves assignments filtered by difficulty level
router.get('/status/:status', filterAssignmentsByStatus);  // Retrieves assignments filtered by status 


module.exports = router;
