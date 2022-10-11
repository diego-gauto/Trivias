import { useEffect, useState } from "react";

import {
  Background,
  Body,
  ChildrenContain,
  LoaderContain,
  LoaderImage,
} from "../screens/Login.styled";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }: any) => {

  const [isLoading, setIsLoading] = useState(true);
  //useEffect(() => { }, [isLoading]);

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
    // <>
    //   {!isLoading ? (
    //     <>
    //       <Body style={{ overflowX: "hidden" }}>
    //         <NavBar />
    //         <ChildrenContain>
    //           {children}
    //         </ChildrenContain>
    //         <Footer />
    //       </Body>
    //     </>

    //   ) : (
    //     <Background>
    //       <LoaderImage>
    //         <LoaderContain />
    //       </LoaderImage>
    //     </Background>
    //   )}
    // </>
  )

}
export default Layout;