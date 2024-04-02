import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import Filters from '../Filters/Filters';
import TeamDetails from '../TeamDetails/TeamDetails';
import userData from '../Assets/data.json';
import './Home.css'

export default function Home() {
  const [users, setUsers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [genders, setGenders] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [team, setTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setUsers(userData);
    setFilteredUsers(userData);
    extractFilters(userData);
  }, []);

  useEffect(() => {
    // Filter users based on search term
    const filteredResults = users.filter(user =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredResults);
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, users]);

  const extractFilters = (usersData) => {
    const uniqueDomains = [...new Set(usersData.map(user => user.domain))];
    const uniqueGenders = [...new Set(usersData.map(user => user.gender))];
    setDomains(uniqueDomains);
    setGenders(uniqueGenders);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    let updatedUsers = [...users];

    if (value !== '') {
      updatedUsers = updatedUsers.filter(user => user[name] === value);
    }

    setFilteredUsers(updatedUsers);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const isUniqueDomain = (user) => {
    return !team.some(member => member.domain === user.domain);
  };

  const addToTeam = (user) => {
    if (isUniqueDomain(user)) {
      setTeam(prevTeam => [...prevTeam, user]);
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Heliverse</h1>
      <Filters domains={domains} genders={genders} onFilterChange={handleFilterChange} />
      <hr style={{  height: '0.001rem', }}/>
      <div style={{ textAlign: 'right', width: '100%' }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}style={{
            padding: '8px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '300px', // Limiting max width for responsiveness
            boxSizing: 'border-box' ,
            // Include padding and border in element's total width and height
          }}  />
      </div>
      
      <hr style={{ background: 'lime',color: 'lime', borderColor: 'lime', height: '0.01rem', }}/>

      <div style={{height:'25px'}}></div>
      <UserList users={currentUsers} addToTeam={addToTeam} />
      
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
      </div>
      
      <TeamDetails team={team} />
    </div>
  );
}
