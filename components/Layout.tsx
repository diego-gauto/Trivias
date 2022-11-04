import { useEffect, useState } from "react";
import {
  Body,
  ChildrenContain,
} from "../screens/Login.styled";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import { Logo } from "./NavBar/NavBar.styled";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

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
      {/* <div className="cs-container">
        <img className="background-img" src="/images/coming-soon-bg.png" alt="" />
        <div className="content">
          <h1>PRÓXIMAMENTE</h1>
          <Logo src="/images/Navbar/logo.svg" />
          <div className="social-container">
            <a href="https://www.facebook.com/GonvarNails" className="circles">
              <FaFacebookF style={{ width: "20px", height: "20px" }} />
            </a>
            <a href="https://www.instagram.com/gonvarnails/" className="circles">
              <FaInstagram style={{ width: "20px", height: "20px" }} />
            </a>
          </div>
        </div>
      </div> */}
    </Body>
  )

}
export default Layout;