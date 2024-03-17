/**
 * This class is to manage and display a list of assignments. 
 * It allows users to add a new assignment, view details of an assignment, edit an assignment, or delete an assignment. 
 * User can also filter these assignments by difficulty and status. 
 * The deletion process includes a confirmation step to prevent accidental deletions.
 * Upon successful deletion, the component updates the list of assignments to reflect the changes. 
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AssignmentsList = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(""); //state for tracking difficulty
    const [selectedStatus, setSelectedStatus] = useState(""); // state for tracking status
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get("http://localhost:3001/assignmentPlanner");
                setAssignments(response.data); 
            } catch (err) {
                console.error("Error fetching assignments:", err);
            }
        };
        fetchAssignments();
    }, []);

    const handleDelete = async (id) => {
        const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
        if (deleteConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/assignmentPlanner/${id}`);
                const updatedAssignments = assignments.filter(assignment => assignment.assignment_id !== id);
                setAssignments(updatedAssignments);
            } catch (err) {
                console.error("Error deleting assignment:", err);
            }
        }
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
        if (event.target.value !== "") {
            navigate(`/difficulty/${event.target.value}`);
        }
    };

    const handleStatusChange = (event) => {
      setSelectedStatus(event.target.value); // Update the selected status state
      if (event.target.value !== "") {
          // Navigate to FilterByStatus component with the selected status
          navigate(`/status/${event.target.value}`);
      }
  };
  

    // Filter assignments by status if selectedStatus is not empty
    const filteredAssignments = selectedStatus ? assignments.filter(assignment => assignment.status === selectedStatus) : assignments;

    return (
        <div className="container gradient-custom-2">
            <h2 className="mask-custom">Assignments List</h2>
            <div className="mb-3 text-right">
                <Link to="/add" className="btn btn-success">Add Assignment</Link>
                {/* Dropdown for Difficulty */}
                <select value={selectedDifficulty} onChange={handleDifficultyChange} className="btn btn-success">
                    <option value="">Select Difficulty Level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                {/* Dropdown for Status Filter */}
                <select value={selectedStatus} onChange={handleStatusChange} className="btn btn-info">
                    <option value="">Select Status</option>
                    <option value="Not Done">Not Done</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <table className="table mask-custom">
                <thead>
                    <tr>
                        <th>Assignment ID</th>
                        <th>Assignment Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.map(assignment => (
                        <tr key={assignment.assignment_id}>
                            <td>{assignment.assignment_id}</td>
                            <td>{assignment.assignment_name}</td>
                            <td>
                                <Link to={`/assignment/${assignment.assignment_id}`} className="btn btn-primary">View</Link>
                                &nbsp;
                                <Link to={`/update/${assignment.assignment_id}`} className="btn btn-warning">Edit</Link>
                                &nbsp;
                                <button onClick={() => handleDelete(assignment.assignment_id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentsList;
