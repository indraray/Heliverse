import React from 'react';
import UserCard from '../Card.js/Card';
import './UserList.css'

function UserList({ users, addToTeam }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} addToTeam={addToTeam} />
      ))}
    </div>
  );
}

export default UserList;
