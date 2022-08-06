import { useEffect, useState } from "react";

import { Background, LoaderContain, LoaderImage } from "../screens/Login.styled";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import NavBar2 from "./NavBar/NavBar2";

const Layout = ({ children }: any) => {

  const [isLoading, setIsLoading] = useState(true);
  //useEffect(() => { }, [isLoading]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <NavBar />
          {children}
          <Footer />
        </>

      ) : (
        <Background>
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>
        </Background>
      )}
    </>
  )

}
export default Layout;