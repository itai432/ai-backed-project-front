import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const register = (email: string, username: string, password: string) => {
  return axios.post(`${API_URL}/register`, { email, username, password });
};

export const login = (username: string, password: string) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const testConnection = (url: string, username: string, password: string) => {
  const token = getToken(); 
  return axios.post(
      `${API_URL}/connect-db`,
      { url, username, password },
      {
          headers: {
              Authorization: `Bearer ${token}`, 
          },
      }
  );
};

export const setTokenWithExpiry = (token: string, expiry: number) => {
  const now = new Date();
  const item = { token, expiry: now.getTime() + expiry };
  localStorage.setItem('jwt', JSON.stringify(item));
};

export const getToken = () => {
  const itemStr = localStorage.getItem('jwt');
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('jwt');
    return null;
  }
  return item.token;
};

export const isAuthenticated = () => {
  return getToken() != null;
};

export const logout = () => {
  localStorage.removeItem('jwt');
};

export const connectToDatabase = async (url: string, username: string, password: string) => {
  try {
    const token = getToken(); 
    const response = await axios.post(
      `${API_URL}/connect-db`,
      {
        url,
        username,
        password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
      },
      }
    );
    
    const dbToken = response.data.token;
    console.log(response.data);
    if (dbToken) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3);
      const tokenData = {
        token: dbToken,
        expiry: expiryDate.toISOString(),
      };

      localStorage.setItem('dbToken', JSON.stringify(tokenData));
    }
    return response;
  } catch (error) {
    throw new Error("connecting to database");
}
};