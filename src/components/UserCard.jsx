import React from 'react'

function UserCard({ user }) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-4 flex items-center space-x-4 transition-colors duration-300">
      <img 
        className="w-16 h-16 rounded-full" 
        src={user.avatar_url} 
        alt={`${user.login}'s avatar`} 
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/150?text=No+Image'
        }}
      />
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {user.name || user.login}
          </a>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Followers: {user.followers}</p>
        <p className="text-gray-600 dark:text-gray-300">Public Repos: {user.public_repos}</p>
        {user.bio && <p className="text-gray-700 dark:text-gray-400 mt-1">Bio: {user.bio}</p>}
      </div>
    </div>
  );
}

export default UserCard;