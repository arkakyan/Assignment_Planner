/** This class displays the details of a specific assignment.
 * It fetches the assignment details from a backend server using the assignment ID from the URL parameters.
 * Users can also delete the assignment, which prompts a confirmation before proceeding.
 * After a successful delete operation, the user is redirected to the home page. */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const AssignmentDetail = () => {
    const [assignment, setAssignment] = useState(null);
    const { assignment_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetches the assignment details based on the assignment_id URL parameter.
        const fetchAssignmentDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/assignmentPlanner/${assignment_id}`);
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setAssignment(response.data.data[0]);
                } else {
                    // Handles the case where no data is found for the given assignment_id.
                    console.error("No data found");
                }
            } catch (err) {
                console.error("Error fetching assignment details:", err);
            }
        };
        fetchAssignmentDetail();
    }, [assignment_id]);
    

// Handles the delete operation.
const handleDelete = async () => {
    const deleteConfirmed = window.confirm("Are you sure about the deletion of this record permanently from the database?");
    if (deleteConfirmed) {
        try {
            const response = await axios.delete(`http://localhost:3001/assignmentPlanner/${assignment_id}`);
            if (response.data && response.data.Success) { //check
                alert('Record successfully deleted.');
                navigate("/"); // Redirects to the home page after successful deletion.
            } else {
                alert("Error: The record you are trying to delete does not exist or has already been deleted.");
            }
        } catch (err) {
            console.error("Error deleting assignment:", err);
            if (err.response && err.response.status === 404) {
                alert('The record you are trying to delete does not exist or has already been deleted.');
            } else {
                alert('An error occurred while trying to delete the record.');
            }
        }
    }
};


    
    if (!assignment) return <div>Watitng for assignment data to be fetched.</div>;

    return (
        <div className="container gradient-custom-2">
          <h2 className="mask-custom">Assignment Details</h2>
          <table className="table mask-custom">
            <thead>
              <tr>
                <th>Assignment ID</th>
                <th>Assignment Name</th>
                <th>Difficulty Level</th>
                <th>Due Date</th>
                <th>Instructor First Name</th>
                <th>Instructor Last Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{assignment.assignment_id}</td>
                  <td>{assignment.assignment_name}</td>
                  <td>{assignment.difficulty_level}</td>
                  <td>{assignment.due_date}</td>
                  <td>{assignment.instructor_first_name}</td>
                  <td>{assignment.instructor_last_name}</td>
                  <td>{assignment.status}</td>
                  <td>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
            </tbody>
          </table>
            <Link to="/">Back to Assignment Planner</Link>
        </div>
    );
};

export default AssignmentDetail;
