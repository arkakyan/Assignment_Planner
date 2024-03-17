
/**  
 * This class provides a form to add a new assignment to the assignment planner.
 * It also captures assignment details such as name, difficulty, due date, instructor name, and status.
 * The form includes validation to ensure all fields are filled out before submission. */

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddAssignment = () => {
    const initialAssignmentState = {
        assignment_name: "",
        difficulty_level: "",
        due_date: "",
        instructor_first_name: "",
        instructor_last_name: "",
        status: ""
    };

    const [assignment, setAssignment] = useState(initialAssignmentState);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form was submitted successfully
    
    // Validates the form fields to make sure they are not empty.
    // Returns true if all validations pass.
    const validateForm = () => {
        let tempErrors = {};
        tempErrors.assignment_name = assignment.assignment_name ? "" : "Assignment name is required!";
        tempErrors.difficulty_level = assignment.difficulty_level ? "" : "Difficulty level is required!";
        tempErrors.due_date = assignment.due_date ? "" : "Due date is required!";
        tempErrors.instructor_first_name = assignment.instructor_first_name ? "" : "Instructor's first name is required!";
        tempErrors.instructor_last_name = assignment.instructor_last_name ? "" : "Instructor's last name is required!";
        tempErrors.status = assignment.status ? "" : "Status is required!";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    // Handles input changes and updates the assignment state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment(prev => ({ ...prev, [name]: value }));
        if (errors[name]) { //clear error for a field if it's corrected.
            setErrors({ ...errors, [name]: "" });
        }
    };

    // submits the form data to the server if the form is valid
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post("http://localhost:3001/assignmentPlanner", assignment);
                setAssignment(initialAssignmentState); // Clear the form
                setIsSubmitted(true); // Mark as submitted
            } catch (err) {
                console.error("Error:", err);
            }
        }
    };

    return (
        <div className="form-container">
            <h2 className = "form-header">Add New Assignment</h2>
            <form onSubmit={handleSubmit}> {/* each field includes validation feedback */}
                {/* Form fields */}
                <div className="mb-3">
                    <label htmlFor="assignment_name" className="form-label">Assignment Name:</label>
                    <input type="text" className="form-control" id="assignment_name" name="assignment_name" value={assignment.assignment_name} onChange={handleChange} />
                    {errors.assignment_name && <div className="text-danger">{errors.assignment_name}</div>}
                </div>

                {/* Difficulty Level Field */}
                <div className="mb-3">
                    <label htmlFor="difficulty_level" className="form-label">Difficulty Level:</label>
                    <input type="text" className="form-control" id="difficulty_level" name="difficulty_level" value={assignment.difficulty_level} onChange={handleChange} />
                    {errors.difficulty_level && <div className="text-danger">{errors.difficulty_level}</div>}
                </div>

                {/* Due Date Field */}
                <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">Due Date:</label>
                    <input type="date" className="form-control" id="due_date" name="due_date" value={assignment.due_date} onChange={handleChange} />
                    {errors.due_date && <div className="text-danger">{errors.due_date}</div>}
                </div>

                {/* Instructor's First Name Field */}
                <div className="mb-3">
                    <label htmlFor="instructor_first_name" className="form-label">Instructor's First Name:</label>
                    <input type="text" className="form-control" id="instructor_first_name" name="instructor_first_name" value={assignment.instructor_first_name} onChange={handleChange} />
                    {errors.instructor_first_name && <div className="text-danger">{errors.instructor_first_name}</div>}
                </div>

                {/* Instructor's Last Name Field */}
                <div className="mb-3">
                    <label htmlFor="instructor_last_name" className="form-label">Instructor's Last Name:</label>
                    <input type="text" className="form-control" id="instructor_last_name" name="instructor_last_name" value={assignment.instructor_last_name} onChange={handleChange} />
                    {errors.instructor_last_name && <div className="text-danger">{errors.instructor_last_name}</div>}
                </div>

                {/* Status Field */}
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status:</label>
                    <select className="form-control" id="status" name="status" value={assignment.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Not Done">Not Done</option>
                        <option value="Done">Done</option>
                    </select>
                    {errors.status && <div className="text-danger">{errors.status}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Add Assignment</button>
            {isSubmitted ? (
                <div className="mt-3">
                    <div className="alert alert-success" role="alert">
                        Assignment added successfully!
                    </div>
                    <Link to="/" className="btn btn-link">Back to Assignment Planner</Link>
                </div>
            ) : (
                <Link to="/" className="btn btn-link">Back to Assignment Planner</Link>
            )}
        </form>
    </div>
    );
};

export default AddAssignment;