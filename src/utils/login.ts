'use client';
import { NextRequest } from 'next/server';
import axios from 'axios';
import { saveAccessToken } from './auth';

export const saveLogin = async (user: { email: string; password: string }) => {
  const url = 'http://localhost:8000/api/v1/auth/signin';
  const res = await axios.post(url, user, {
    withCredentials: true,
  });

  const accessToken: string = res.headers.authorization;
  saveAccessToken(accessToken);
};

export function isLoggedIn(request: NextRequest): boolean {
  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken) return false;
  return true;
}

export const getAccessToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};
