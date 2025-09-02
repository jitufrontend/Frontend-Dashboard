import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeGrid.css';

const EmployeeGrid = ({ employees }) => {
  const [gridApi, setGridApi] = useState(null);

  // Custom cell renderers
  const statusRenderer = (params) => {
    const isActive = params.value;
    return (
      <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const skillsRenderer = (params) => {
    const skills = params.value;
    return (
      <div className="skills-container">
        {skills.slice(0, 2).map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
        {skills.length > 2 && (
          <span className="skill-more">+{skills.length - 2}</span>
        )}
      </div>
    );
  };

  const salaryRenderer = (params) => {
    return `$${params.value.toLocaleString()}`;
  };

  const ratingRenderer = (params) => {
    const rating = params.value;
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return (
      <div className="rating-container">
        <span className="rating-stars">{stars}</span>
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  const emailRenderer = (params) => {
    return (
      <a href={`mailto:${params.value}`} className="email-link">
        {params.value}
      </a>
    );
  };

  const dateRenderer = (params) => {
    return new Date(params.value).toLocaleDateString();
  };

  // Column definitions
  const columnDefs = useMemo(() => [
    {
      headerName: 'ID',
      field: 'id',
      width: 80,
      pinned: 'left',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: 'Name',
      field: 'firstName',
      width: 120,
      pinned: 'left',
      cellRenderer: (params) => `${params.data.firstName} ${params.data.lastName}`,
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 200,
      cellRenderer: emailRenderer,
    },
    {
      headerName: 'Department',
      field: 'department',
      width: 130,
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [...new Set(employees.map(emp => emp.department))],
      },
    },
    {
      headerName: 'Position',
      field: 'position',
      width: 180,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Salary',
      field: 'salary',
      width: 120,
      cellRenderer: salaryRenderer,
      filter: 'agNumberColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Location',
      field: 'location',
      width: 120,
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [...new Set(employees.map(emp => emp.location))],
      },
    },
    {
      headerName: 'Age',
      field: 'age',
      width: 80,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Hire Date',
      field: 'hireDate',
      width: 120,
      cellRenderer: dateRenderer,
      filter: 'agDateColumnFilter',
    },
    {
      headerName: 'Performance',
      field: 'performanceRating',
      width: 140,
      cellRenderer: ratingRenderer,
      filter: 'agNumberColumnFilter',
      sortable: true,
    },
    {
      headerName: 'Projects',
      field: 'projectsCompleted',
      width: 100,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Status',
      field: 'isActive',
      width: 100,
      cellRenderer: statusRenderer,
      filter: 'agSetColumnFilter',
      filterParams: {
        values: [true, false],
        valueFormatter: (params) => params.value ? 'Active' : 'Inactive',
      },
    },
    {
      headerName: 'Skills',
      field: 'skills',
      width: 200,
      cellRenderer: skillsRenderer,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Manager',
      field: 'manager',
      width: 150,
      filter: 'agTextColumnFilter',
      cellRenderer: (params) => params.value || 'N/A',
    },
  ], [employees]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  }), []);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onExportClick = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: 'employee-data.csv',
      });
    }
  };

  const onQuickFilterChange = (event) => {
    if (gridApi) {
      gridApi.setQuickFilter(event.target.value);
    }
  };

  return (
    <div className="employee-grid-container">
      <div className="grid-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search all columns..."
            onChange={onQuickFilterChange}
            className="search-input"
          />
        </div>
        <button onClick={onExportClick} className="export-button">
          Export CSV
        </button>
      </div>
      
      <div className="ag-theme-alpine grid-wrapper">
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="multiple"
          animateRows={true}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          suppressRowClickSelection={true}
          rowHeight={60}
          headerHeight={50}
          enableRangeSelection={true}
          enableCharts={true}
          sideBar={{
            toolPanels: [
              {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
              },
              {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
              },
            ],
            defaultToolPanel: 'columns',
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeGrid;
