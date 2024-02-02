'use client';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  // Check for authentication on both server and client
  if (typeof window === 'undefined' || !(await isLoggedIn(request))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

// Helper function to check for authentication on the server
async function isLoggedIn(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  if (!accessToken) return false;

  const response = await fetch(
    'http://localhost:8000/api/v1/auth/verify-access-token',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  return response.ok;
}

export const config = {
  matcher: ['/dashboard', '/profile'],
};
