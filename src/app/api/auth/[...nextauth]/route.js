import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "@/dbconfig/connection";
import User from "@/model/user";
export const authOption = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      key: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        console.log("credentials", credentials);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
       // console.log("user", user);
        if (!res.ok) {
          throw new Error(user.message || "Something Went wrong!!");
        }
        user.user.password ="";
        return user;
      },
    }),
  ],
 

  callbacks: {
        async signIn({ user, account, profile}) {

          //console.log("user", user);
          //console.log("account", account);
          //console.log("profile", profile);  
          connection();
           if(account.provider=="github"){
                  const userfind= await User.findOne({"email":user.email});
                  if(!userfind){
                    console.log("no userfind");
                    const nuser=await new User({"email":user.email})
                    const userfind1= await nuser.save();
                    user.user= userfind1;
                    return true
                  }
                  else{
                    user.user= userfind;
                  }
          return true
          }
         else if(account.provider=="google"){
              const userfind= await User.findOne({"email":user.email});
              console.log("userfind", userfind);
              if(!userfind){
                console.log("no userfind");
                const nuser=  await new User({"email":user.email})
                const userfind1= await nuser.save();
                console.log("userfind1", userfind1);
                user.user= userfind1;
                return true
              }
              else{
                user.user= userfind;
              }
          }
      return true;
        },
    async session({ session, user, token }) {
      if(token){
        session.user = token.user.user;
        session.jwt=token.jwt
      }
      //console.log("session -> ", session);
      return session;
    },
    async jwt({ token, user }) {
      //token.user = "admin";
      // console.log("jwt1 -> ", token);
      // console.log("user1 -> ", user);
      if (user) {
        token.user = user;
        token.jwt=user.token
      }
      // console.log("account", account);
      // console.log("profile", profile);
      // console.log("isNewUser", isNewUser);
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: '/'
  },
  secret: process.env.NEXTAUTH_SECRET,
  //adapter: MongoDBAdapter(clientPromise),
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
