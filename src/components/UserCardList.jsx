import React from 'react'
import UserCard from './UserCard'

function UserCardList({ users }) {
  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No users to display. Try searching for a GitHub user!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserCardList;