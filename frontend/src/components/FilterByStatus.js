/**
 * This class handles the displaying a list of assignments filtered by their stauts like Done or Not Done. 
 * It also handles potential errors during data fetching, displaying an error message.
 * It also shows with a table listing the assignments matching the selected status, 
 * including details such as assignment ID, name of the assignment, difficulty level, due date, instructor name, and status.
 * If no assignments match the criteria, a message is shown to inform the user.
 * Also, it allows users to navigate back to the main page of the assignment planner.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FilterByStatus = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const { status } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignmentsByStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/assignmentPlanner/status/${status}`);
                setAssignments(response.data.data);
                setError(null); // Reset error if data fetching is successful
            } catch (error) {
                // error handling 
                const errorMessage = error.response && error.response.data.message ? error.response.data.message : "Error fetching assignments. Please try again later.";
                console.error("Error fetching assignments by status:", error);
                setError(errorMessage);
            }
        };

        fetchAssignmentsByStatus();
    }, [status]); 

    const handleBack = () => {
        navigate("/"); // Navigate back to the main page
    };

    return (
        <div className="filter-container">
            <h2 className="filter-header">Assignments Filtered by Status: {status}</h2>
            {error && <div className="filter-error">{error}</div>}
            {assignments.length > 0 ? (
                <table className="filter-table">
                     <thead className="header">
                        <tr>
                        <th>Assignment ID</th>
                        <th>Assignment Name</th>
                        <th>Difficulty Level</th>
                        <th>Due Date</th>
                        <th>Instructor First Name</th>
                        <th>Instructor Last Name</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map(assignment => (
                            <tr key={assignment.assignment_id}>
                                <td>{assignment.assignment_id}</td>
                                <td>{assignment.assignment_name}</td>
                                <td>{assignment.difficulty_level}</td>
                                <td>{assignment.due_date}</td>
                                <td>{assignment.instructor_first_name}</td>
                                <td>{assignment.instructor_last_name}</td>
                                <td>{assignment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No assignments found for the specified status level.</div>
            )}
            <button className="filter-button" onClick={handleBack}>Back to Assignment Planner</button>
        </div>
    );
};

export default FilterByStatus;
