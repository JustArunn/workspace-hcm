import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Heading from '../utils/Heading';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample employee data
const employeeData = [
  { month: 'Jan', department: 'HR', location: 'New York', type: 'Full-time', tenure: 1 },
  { month: 'Feb', department: 'Engineering', location: 'San Francisco', type: 'Part-time', tenure: 2 },
  { month: 'Mar', department: 'Sales', location: 'Los Angeles', type: 'Full-time', tenure: 3 },
  { month: 'Apr', department: 'Marketing', location: 'Chicago', type: 'Full-time', tenure: 1 },
  { month: 'May', department: 'HR', location: 'New York', type: 'Part-time', tenure: 2 },
  { month: 'Jun', department: 'Engineering', location: 'Remote', type: 'Full-time', tenure: 3 },
  { month: 'Jul', department: 'Sales', location: 'New York', type: 'Full-time', tenure: 4 },
  { month: 'Aug', department: 'Marketing', location: 'San Francisco', type: 'Part-time', tenure: 5 },
  { month: 'Sep', department: 'HR', location: 'Los Angeles', type: 'Full-time', tenure: 1 },
  { month: 'Oct', department: 'Engineering', location: 'Chicago', type: 'Part-time', tenure: 2 },
  { month: 'Nov', department: 'Sales', location: 'Remote', type: 'Full-time', tenure: 3 },
  { month: 'Dec', department: 'Marketing', location: 'New York', type: 'Full-time', tenure: 4 },
];

const EmployeeCharts: React.FC = () => {
  const [filters, setFilters] = useState({
    chart1: { department: 'All', location: 'All' },
    chart2: { department: 'All', location: 'All' },
    chart3: { department: 'All', location: 'All' },
    chart4: { department: 'All', location: 'All' },
    chart5: { department: 'All', location: 'All' },
    chart6: { department: 'All', location: 'All' },
    chart7: { department: 'All', location: 'All' },
  });

  const updateFilter = (chart: string, type: string, value: string) => {
    setFilters((prev:any) => ({
      ...prev,
      [chart]: { ...prev[chart], [type]: value },
    }));
  };

  const filterData = (data: any[], department: string, location: string) => {
    return data.filter(employee => {
      const departmentMatch = department === 'All' || employee.department === department;
      const locationMatch = location === 'All' || employee.location === location;
      return departmentMatch && locationMatch;
    });
  };

  // Data preparation functions
  const employeesJoinedData = {
    labels: employeeData.map(emp => emp.month),
    datasets: [{
      label: 'Employees Joined',
      data: employeeData.map((_, index) => index + 1),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const employeesByDepartmentData = () => {
    const filteredData = filterData(employeeData, filters.chart1.department, filters.chart1.location);
    return {
      labels: Array.from(new Set(filteredData.map(emp => emp.department))),
      datasets: [{
        label: 'Employees by Department',
        data: filteredData.reduce((acc, emp) => {
          acc[emp.department] = (acc[emp.department] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }],
    };
  };

  const employeesByLocationData = () => {
    const filteredData = filterData(employeeData, filters.chart2.department, filters.chart2.location);
    return {
      labels: Array.from(new Set(filteredData.map(emp => emp.location))),
      datasets: [{
        label: 'Employees by Location',
        data: filteredData.reduce((acc, emp) => {
          acc[emp.location] = (acc[emp.location] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }],
    };
  };

  const employeesByTypeData = () => {
    const filteredData = filterData(employeeData, filters.chart3.department, filters.chart3.location);
    return {
      labels: Array.from(new Set(filteredData.map(emp => emp.type))),
      datasets: [{
        label: 'Employees by Type',
        data: filteredData.reduce((acc, emp) => {
          acc[emp.type] = (acc[emp.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      }],
    };
  };

  const employeesByTenureData = () => {
    const filteredData = filterData(employeeData, filters.chart4.department, filters.chart4.location);
    return {
      labels: Array.from(new Set(filteredData.map(emp => emp.tenure))),
      datasets: [{
        label: 'Employees by Tenure',
        data: filteredData.reduce((acc, emp) => {
          acc[emp.tenure] = (acc[emp.tenure] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }],
    };
  };

  const employeesByDepartmentTenureData = () => {
    const filteredData = filterData(employeeData, filters.chart5.department, filters.chart5.location);
    return {
      labels: Array.from(new Set(filteredData.map(emp => emp.department))),
      datasets: [{
        label: 'Employees by Department Tenure',
        data: filteredData.reduce((acc, emp) => {
          acc[emp.department] = (acc[emp.department] || 0) + emp.tenure;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }],
    };
  };

  const employeesMonthlyJoinData = () => {
    const filteredData = filterData(employeeData, filters.chart6.department, filters.chart6.location);
    return {
      labels: employeeData.map(emp => emp.month),
      datasets: [{
        label: 'Monthly Joins',
        data: filteredData.map((_, index) => index + 1), // Example data; adjust as necessary
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }],
    };
  };

  const employeesFullTimePartTimeData = () => {
    const filteredData = filterData(employeeData, filters.chart7.department, filters.chart7.location);
    return {
      labels: Array.from(new Set(filteredData.map(emp => emp.type))),
      datasets: [{
        label: 'Full-time vs Part-time',
        data: filteredData.reduce((acc, emp) => {
          acc[emp.type] = (acc[emp.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }],
    };
  };

  return (
   <div>
    <div className='mt-4'><Heading>Dashboard</Heading></div>
     <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Employees Joined Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Employees Joined</h2>
        <Bar data={employeesJoinedData} />
      </div>

      {/* Employees by Department Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Employees by Department</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart1', 'department', e.target.value)} value={filters.chart1.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart1', 'location', e.target.value)} value={filters.chart1.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesByDepartmentData()} />
      </div>

      {/* Employees by Location Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Employees by Location</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart2', 'department', e.target.value)} value={filters.chart2.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart2', 'location', e.target.value)} value={filters.chart2.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesByLocationData()} />
      </div>

      {/* Employees by Type Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Employees by Type</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart3', 'department', e.target.value)} value={filters.chart3.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart3', 'location', e.target.value)} value={filters.chart3.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesByTypeData()} />
      </div>

      {/* Employees by Tenure Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Employees by Tenure</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart4', 'department', e.target.value)} value={filters.chart4.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart4', 'location', e.target.value)} value={filters.chart4.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesByTenureData()} />
      </div>

      {/* Employees by Department Tenure Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Employees by Department Tenure</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart5', 'department', e.target.value)} value={filters.chart5.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart5', 'location', e.target.value)} value={filters.chart5.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesByDepartmentTenureData()} />
      </div>

      {/* Monthly Joins Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Monthly Joins</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart6', 'department', e.target.value)} value={filters.chart6.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart6', 'location', e.target.value)} value={filters.chart6.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesMonthlyJoinData()} />
      </div>

      {/* Full-time vs Part-time Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Full-time vs Part-time</h2>
        <label className="mr-2">Department:</label>
        <select onChange={(e) => updateFilter('chart7', 'department', e.target.value)} value={filters.chart7.department}>
          <option value="All">All</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="ml-4 mr-2">Location:</label>
        <select onChange={(e) => updateFilter('chart7', 'location', e.target.value)} value={filters.chart7.location}>
          <option value="All">All</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <Bar data={employeesFullTimePartTimeData()} />
      </div>
    </div>
   </div>
  );
};

export default EmployeeCharts;
