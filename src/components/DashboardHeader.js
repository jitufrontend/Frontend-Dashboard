import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ employees }) => {
  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const averageSalary = Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees);
  const averageAge = Math.round(employees.reduce((sum, emp) => sum + emp.age, 0) / totalEmployees);
  const averageRating = (employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / totalEmployees).toFixed(1);
  
  // Department breakdown
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const topDepartment = Object.entries(departmentCounts)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="dashboard-header">
      <div className="header-title">
        <h1>Employee Dashboard</h1>
        <p>Comprehensive employee data visualization and management</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{totalEmployees}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{activeEmployees}</h3>
            <p>Active Employees</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>${averageSalary.toLocaleString()}</h3>
            <p>Average Salary</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{averageRating}</h3>
            <p>Avg Performance</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎂</div>
          <div className="stat-content">
            <h3>{averageAge}</h3>
            <p>Average Age</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>{topDepartment[1]}</h3>
            <p>{topDepartment[0]} (Largest Dept)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

