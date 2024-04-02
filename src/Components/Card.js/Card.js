import React from 'react';
import './Card.css'

function UserCard({ user, addToTeam, team }) {
  const { id, first_name, last_name, email, gender, avatar, domain, available } = user;

  const isUniqueDomain = (user) => {
    // Logic to check if the user's domain is unique
    return !team.some(member => member.domain === user.domain);
  };

  return (
    <div className="card">
      <img src={avatar} alt={`${first_name} ${last_name}`} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{`${first_name} ${last_name}`}</h2>
        <p className="card-description">
          <strong>Email:</strong> {email} <br />
          <strong>Gender:</strong> {gender} <br />
          <strong>Domain:</strong> {domain} <br />
          <strong>Available:</strong> {available ? 'Yes' : 'No'}
        </p>
        <button onClick={() => addToTeam(user)} disabled={!available || !isUniqueDomain(user)}>
          Add to Team
        </button>
      </div>
    </div>
  );
}

export default UserCard;
