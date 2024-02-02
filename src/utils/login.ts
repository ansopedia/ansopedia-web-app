import axios from 'axios';

export const saveLogin = async (user: { email: string; password: string }) => {
  // Send the user data to the backend
  const url = 'http://localhost:8000/api/v1/auth/signin';

  const res = await axios.post(url, user, {
    withCredentials: true,
  });
  localStorage.setItem('accessToken', res.headers.authorization);
};
