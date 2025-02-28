import { cookies } from "next/headers";
import Navbar from "../Navbar";

export default async function NavbarWrapper() {
  const accessToken = (await cookies()).get("access_token")?.value;
  const isAuthenticated = !!accessToken;

  return <Navbar isAuthenticated={isAuthenticated} />;
}
