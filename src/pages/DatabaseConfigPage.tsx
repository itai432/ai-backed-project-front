import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/DatabaseConfigPage.scss';
import { FaDatabase } from 'react-icons/fa';
import { connectToDatabase } from '../services/authService';

const DatabaseConfigPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await connectToDatabase(url, username, password);

      // אם הסטטוס הוא 200 וקיבלנו db_token, נשמור את הטוקן ונעבור לדף הבית
      if (response.status === 200 && response.data.db_token) {
        localStorage.setItem('db_token', JSON.stringify({
          token: response.data.db_token,
          expiry: new Date().getTime() + 180000000000
        }));

        setMessage(response.data.message);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Connection failed: No valid token received');
      }
    } catch (error: any) {
      // ניהול שגיאות על פי תגובת השרת
      setError(error.response?.data || 'Connection failed: ' + error.message);
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
        {error && <p className="error-message">{error}</p>} 
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
