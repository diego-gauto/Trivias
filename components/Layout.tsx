import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import {
  Body,
  ChildrenContain,
} from "../screens/Login.styled";
import SideBar from "./admin/SideBar";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import HelmetMetaTags from "./HelmetMetaTags/HelmetMetaTags";

const Layout = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const responsive1300 = useMediaQuery({ query: "(max-width: 1300px)" });
  const router = useRouter();
  const { pathname } = router;
  const [path, setPath] = useState(pathname.split('/')[1]);
  const [show, setShow] = useState(false)

  useEffect(() => {
    setPath(pathname.split('/')[1]);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, []);

  return (
    <Body >
      <HelmetMetaTags
        title={"Academia de Belleza Online | Gonvar"}
        image={""}
        description={"Descubre la academia de belleza para convertirte en un experto. Aprende técnicas y tendencias con los profesionales del sector. ¡Inscríbete ya!"}
        hashtag={"#gonvar"}
        quote={""}
      />
      <NavBar />
      <ChildrenContain style={{
        display: router.pathname.slice(1, 6) === "admin" ? "flex" : "initial",
        flexDirection: (path === "admin" && responsive1300) ? "column" : "row"
      }}>
        {(responsive1300 && path === "admin") && <button className="admin-menu" onClick={() => {
          setShow(true)
        }}>Menu</button>}
        {
          router.pathname.slice(1, 6) === "admin" &&
          <SideBar show={show} onHide={() => { setShow(false) }} />
        }
        {children}
      </ChildrenContain>
      <Footer />
    </Body>
  )

}
export default Layout;