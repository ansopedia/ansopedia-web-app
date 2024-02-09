import { NextRequest, NextResponse } from 'next/server';
import { isLoggedIn } from './utils/login';

export const middleware = async (request: NextRequest) => {
  const isLogged = isLoggedIn(request);
  if (!isLogged) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard', '/profile'],
};
