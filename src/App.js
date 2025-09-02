import React from 'react';
import { employeeData } from './data/employees';
import DashboardHeader from './components/DashboardHeader';
import EmployeeGrid from './components/EmployeeGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <DashboardHeader employees={employeeData.employees} />
        <EmployeeGrid employees={employeeData.employees} />
      </div>
    </div>
  );
}

export default App;

