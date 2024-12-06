import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware"

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path=request.nextUrl.pathname
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
     });
console.log(token);
 //const public_access= path==='/login' || path==='/';
// let id
//   if(request.cookies.get("token")){
//         id=request.cookies.get("token").value
//     }
//     console.log("id", id);  


    if (token) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/mode',
    '/profile',
    '/verify',
    //  '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ],
}