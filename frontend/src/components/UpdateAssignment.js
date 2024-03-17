/**
 * This class enable users to update the details of an existing assignment.
 * The component pre-populates a form with the fetched assignment details, allowing the user to make changes to fields 
 * such as the assignment name, difficulty level, due date, instructor's name, and the assignment's status.
 * Changes to the form update the component's state, and submitting the form sends an update request to the 
 * backend server to save the changes.
 * After that the user is redirected to the main page of the assignment planner.
 * If update fails, errors are logged to the console. 
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const UpdateAssignment = () => {
    const { assignment_id } = useParams();
    // initialize the state
    const [assignment, setAssignment] = useState({
        assignment_name: "",
        difficulty_level: "",
        due_date: "",
        instructor_first_name: "",
        instructor_last_name: "",
        status: ""
    });
    // for validation 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchAssignment = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/assignmentPlanner/${assignment_id}`);
                setIsLoading(false);
                if (response.data && response.data.data && response.data.data.length > 0) {
                    const assignmentData = response.data.data[0];
                    setAssignment({
                        assignment_name: assignmentData.assignment_name || "",
                        difficulty_level: assignmentData.difficulty_level || "",
                        due_date: assignmentData.due_date ? assignmentData.due_date.split('T')[0] : '',
                        instructor_first_name: assignmentData.instructor_first_name || "",
                        instructor_last_name: assignmentData.instructor_last_name || "",
                        status: assignmentData.status || ""
                    });
                } else {
                    setError("Unexpected response structure from server.");
                }
            } catch (err) {
                setIsLoading(false);
                setError("Error fetching assignment details.");
            }
        };
    
        fetchAssignment();
    }, [assignment_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // Error checking to make sure that user submits the validateForm.
    const validateForm = () => {
        const { assignment_name, difficulty_level, due_date, instructor_first_name, instructor_last_name, status } = assignment;
        return assignment_name && difficulty_level && due_date && instructor_first_name && instructor_last_name && status;
    };
    // If user doesn't submit then show the error.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setError('Please fill in all fields.');
            return;
        }
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:3001/assignmentPlanner/${assignment_id}`, assignment);
            navigate("/");
        } catch (err) {
            setError("Error updating assignment.");
        } finally {
            setIsLoading(false);
        }
    };
    const dueDateValue = assignment.due_date ? assignment.due_date.split('T')[0] : '';


    return (
        <div className="form-container">
            <h2 className="form-header">Update Assignment</h2>
            {/* Display loading feedback or error messages */}
            {isLoading && <p>Loading...</p>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Form fields for Assignment Name, Difficulty Level, Due Date, Instructor Name, Status. */}
                <div className="mb-3">
                    <label htmlFor="assignment_name">Assignment Name:</label>
                    <input type="text" className="form-control" name="assignment_name" value={assignment.assignment_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="difficulty_level">Difficulty Level:</label>
                    <input type="text" className="form-control" name="difficulty_level" value={assignment.difficulty_level} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="due_date">Due Date:</label>
                    <input type="date" className="form-control" name="due_date" value={dueDateValue} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructor_first_name">Instructor First Name:</label>
                    <input type="text" className="form-control" name="instructor_first_name" value={assignment.instructor_first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructor_last_name">Instructor Last Name:</label>
                    <input type="text" className="form-control" name="instructor_last_name" value={assignment.instructor_last_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="status">Status:</label>
                    <select className="form-control" name="status" value={assignment.status} onChange={handleChange} required>
                        <option value="">Select a status</option>
                        <option value="Not Done">Not Done</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                {/* Disable the button when the form is submitting */}
                <button type="submit" className="btn btn-primary" disabled={isLoading}>Update Assignment</button>
                <Link to="/" className="btn btn-link">Back to Assignment Planner</Link>
            </form>
        </div>
    );    
};
export default UpdateAssignment;
