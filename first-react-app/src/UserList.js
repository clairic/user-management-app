//Creating a user list component in order to add, delete and update users

import React, { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState(['Prabhu', 'Balu', 'Saiesh']);
  const [newUser, setNewUser] = useState('');

  const addUser = () => {
    if (newUser.trim() !== '') {
      setUsers([...users, newUser]);
      setNewUser('');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Add new user"
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default UserList;