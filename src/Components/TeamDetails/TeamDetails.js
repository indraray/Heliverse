import React from 'react';

function TeamDetails({ team }) {
  return (
    <div className="team-details">
      <h2>Team Details</h2>
      {team.map(user => (
        <div key={user.id}>
          <p>{`${user.first_name} ${user.last_name} - ${user.domain} (${user.available ? 'Available' : 'Not Available'})`}</p>
        </div>
      ))}
    </div>
  );
}

export default TeamDetails;
