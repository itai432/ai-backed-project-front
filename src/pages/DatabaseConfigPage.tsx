import React, { useState } from 'react';
import '../style/DatabaseConfigPage.scss';
import { FaDatabase } from 'react-icons/fa';
import { testConnection } from '../services/authService';

const DatabaseConfigPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await testConnection(url, username, password);
      setMessage(response.data.message);
    } catch (error:any) {
      setMessage('Connection failed: ' + error.message);
    }
  };

  return (
    <div className="database-config-container">
      <form className="database-config-form" onSubmit={handleSubmit}>
        <h2>
          <FaDatabase className="db-icon" />
          Database Configuration
        </h2>
        {message && <p className="message">{message}</p>}
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
        <button type="submit">Test Connection</button>
      </form>
    </div>
  );
};

export default DatabaseConfigPage;
