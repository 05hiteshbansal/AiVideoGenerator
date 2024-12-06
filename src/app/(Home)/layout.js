import { getServerSession } from "next-auth";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { authOption } from "../api/auth/[...nextauth]/route";
import CollapeNavbar from "@/components/CollapseNavbar";
export const metadata = {
  title: "User Role Management",
  description: "User Role Management",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession(authOption);
  return (
    <div className="flex flex-col h-screen">
        <Navbar />
        <div className=" fixed mt-20">
        <CollapeNavbar/>
        </div>
    <main className="flex-1 ml-0 md:ml-[20%] md:p-4 p-[5px] overflow-auto ">
          {children}
        </main>
    </div>
     
  );
}
