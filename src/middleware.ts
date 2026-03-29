import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Protect /admin routes — ADMIN role only
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/setup')) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        // /espace-client requires any authenticated user
        if (pathname.startsWith('/espace-client')) return !!token
        // /admin requires authenticated user (role check is done above)
        if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/setup')) return !!token
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/espace-client/:path*', '/admin/:path*'],
}
