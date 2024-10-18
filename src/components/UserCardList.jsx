import React from 'react';
import UserCard from './UserCard';

function UserCardList({ users }) {
  return (
    <div className="user-card-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserCardList;