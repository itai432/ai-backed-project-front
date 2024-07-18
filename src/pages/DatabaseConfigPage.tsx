import React, { useState } from 'react';
import '../style/DatabaseConfigPage.scss';
import { FaDatabase } from 'react-icons/fa';

const DatabaseConfigPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('URL:', url);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="database-config-container">
      <form className="database-config-form" onSubmit={handleSubmit}>
      
        <h2>
        <FaDatabase className="db-icon" />
            Database Configuration</h2>
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DatabaseConfigPage;
