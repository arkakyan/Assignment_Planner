import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssignmentsList from './components/AssignmentsList'; 
import AssignmentDetail from './components/AssignmentDetail';
import UpdateAssignment from './components/UpdateAssignment';
import AddAssignment from './components/AddAssignment';
import FilterByDifficulty from './components/FilterByDifficulty';
import FilterByStatus from './components/FilterByStatus';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
    <NavBar /> {/* Add NavBar for API Documentation. */}
      <Routes>
      <Route path="/" element={<AssignmentsList />} /> {/* Default route */}
        <Route path="/add" element={<AddAssignment />} />
        <Route path="/assignment/:assignment_id" element={<AssignmentDetail />} />
        <Route path="/update/:assignment_id" element={<UpdateAssignment />} />
        <Route path="/difficulty/:difficulty_level" element={<FilterByDifficulty />} />
        <Route path="/status/:status" element={<FilterByStatus />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
