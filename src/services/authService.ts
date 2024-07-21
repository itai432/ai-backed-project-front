import axios from 'axios';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', {
      username,
      password,
    });
    console.log('Token:', response.data.token);
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/api/register', {
            email,
            username,
            password
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            throw new Error('Username already exists');
        }
        throw error;
    }
};
