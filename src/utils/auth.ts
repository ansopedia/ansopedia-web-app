'use server';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export const saveAccessToken = (token: string) => {
  cookies().set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
};

export const saveRefreshToken = (token: string) => {
  cookies().set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
};

const url = 'http://localhost:8000/api/v1/user';

export const getUserDetails = async (): Promise<unknown> => {
  let accessToken = cookies().get('accessToken')?.value;
  let response;

  try {
    if (!accessToken) {
      const refreshToken = cookies().get('refreshToken');
      if (!refreshToken) {
        return null;
      }

      accessToken = await refreshAccessToken(refreshToken.value);
      saveAccessToken(accessToken);
    }

    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const refreshToken = cookies().get('refreshToken');
      if (!refreshToken) {
        return null;
      }

      accessToken = await refreshAccessToken(refreshToken.value);
      saveAccessToken(accessToken);

      // Retry the request with the new access token
      return getUserDetails();
    }
  }

  return await response?.json();
};

export const refreshAccessToken = async (refreshToken: string) => {
  const url = 'http://localhost:8000/api/v1/auth/refresh-token';
  const res = await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    withCredentials: true,
  });

  const accessToken: string = res.headers.authorization;
  return accessToken;
};
