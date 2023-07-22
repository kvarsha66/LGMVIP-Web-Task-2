import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        setUsers(data.data);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch user data');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <button onClick={getUsers}>Get Users</button>
      </nav>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="user-grid">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              <img className="user-avatar" src={user.avatar} alt="User Avatar" />
              <div className="user-name">{`${user.first_name} ${user.last_name}`}</div>
              <div className="user-email">{user.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
