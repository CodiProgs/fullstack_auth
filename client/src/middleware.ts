import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

const redirectPaths = ['/login', '/register'];
const adminPath = '/admin';

function shouldRedirect(pathname: string, session: any) {
  return redirectPaths.includes(pathname) || (pathname === adminPath && !session.roles!.includes('ADMIN'));
}

export default withAuth(function middleware(request: NextRequestWithAuth) {
  const session = request?.nextauth?.token;
  const { pathname } = request.nextUrl;

  if (!session && pathname !== '/login' && pathname !== '/register')
    return NextResponse.redirect(new URL('/login', request.url));
  if (session && shouldRedirect(pathname, session))
    return NextResponse.redirect(new URL(`/user/${session.nickname}`, request.url));

  return NextResponse.next();
},
  {
    callbacks: {
      authorized: () => true,
    },
  });

export const config = {
  matcher: [
    '/login', '/register', '/admin', '/settings',
  ],
};