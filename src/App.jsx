import React, { useState, useEffect } from 'react'
import UserCardList from './components/UserCardList'

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found or API request failed');
      const userData = await response.json();
      setUsers((prevUsers) => [...prevUsers, userData]);
      setUsername('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Github User Query</h1>
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter Github username"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Submit'}
          </button>
        </form>
        {error && <p className="text-red-500 dark:text-red-400 text-center mb-4">{error}</p>}
        <UserCardList users={users} />
      </div>
    </div>
  );
}

export default App;