import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Body,
  ChildrenContain,
} from "../screens/Login.styled";
import SideBar from "./admin/SideBar";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, []);

  return (
    <Body style={{ overflowX: "hidden" }}>
      <NavBar />
      <ChildrenContain style={{ display: router.pathname.slice(1, 6) === "admin" ? "flex" : "initial" }}>
        {
          router.pathname.slice(1, 6) === "admin" &&
          <SideBar />
        }
        {children}
      </ChildrenContain>
      <Footer />
    </Body>
  )

}
export default Layout;