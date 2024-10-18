import React, { useState } from 'react';
import UserCardList from './components/UserCardList';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
      setUsers((prevUsers) => [...prevUsers, userData]);
      setUsername('');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Github User Query</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter Github username"
        />
        <button type="submit">Submit</button>
      </form>
      <UserCardList users={users} />
    </div>
  );
}

export default App;