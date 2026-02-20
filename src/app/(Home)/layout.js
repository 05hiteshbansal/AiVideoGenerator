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
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 pt-0 md:pt-0">
        <CollapeNavbar />
        <main className="flex-1 overflow-auto p-[5px] md:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
