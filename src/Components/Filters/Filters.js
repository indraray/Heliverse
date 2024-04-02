import React from 'react';
import './Filter.css'; // Import the CSS file for Filters

function Filters({ domains, genders, onFilterChange }) {
  return (
    <div className="filters">
      <div className="filter">
        <label>Domain:</label>
        <select onChange={onFilterChange} name="domain">
          <option value="">All</option>
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>

      <div className="filter">
        <label>Gender:</label>
        <select onChange={onFilterChange} name="gender">
          <option value="">All</option>
          {genders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      <div className="filter">
        <label>Availability:</label>
        <select onChange={onFilterChange} name="available">
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
