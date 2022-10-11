import { useEffect, useState } from "react";
import {
  Body,
  ChildrenContain,
} from "../screens/Login.styled";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, []);

  return (
    <Body style={{ overflowX: "hidden" }}>
      <NavBar />
      <ChildrenContain>
        {children}
      </ChildrenContain>
      <Footer />
    </Body>
  )

}
export default Layout;