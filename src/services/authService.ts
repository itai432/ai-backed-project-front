import axios from 'axios';
import { Message } from '../pages/HomePage';



export const register = (email: string, username: string, password: string) => {
  return axios.post(`/register`, { email, username, password });
};

export const login = (username: string, password: string) => {
  return axios.post(`/login`, { username, password });
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
      `/connect-db`,
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

export const askChatGPT = async (
  userInput: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      "/Ask/askChatGPT",
      {
        params: { userInput },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const chatGPTMessage: Message = {
      type: "chatgpt",
      content: response.data,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, chatGPTMessage]);
  } catch (error: any) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
}
};