import React from 'react';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
      <h2>{user.name || user.login}</h2>
      <p>Followers: {user.followers}</p>
      <p>Public Repos: {user.public_repos}</p>
      {user.bio && <p>Bio: {user.bio}</p>}
    </div>
  );
}

export default UserCard;