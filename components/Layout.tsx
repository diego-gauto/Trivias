import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { useRouter } from "next/router";

import { Body, ChildrenContain } from "../screens/Login.styled";
import SideBar from "./admin/SideBar";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import { useAdmin } from "../hooks/AdminContext";

const Layout = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const responsive1300 = useMediaQuery({ query: "(max-width: 1300px)" });
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const [path, setPath] = useState(pathname.split('/')[1]);
  const [show, setShow] = useState(false)
  let adminContext = useAdmin();
  const { setOpenNotification } = adminContext;
  useEffect(() => {
    setPath(pathname.split('/')[1]);
    if (pathname === "/_error" && asPath.slice(0, 6) === "/Blogs") {
      router.push("/blogs/" + asPath.slice(6))
    }
  }, [pathname]);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, []);

  const isVisibleNavbar = (pathname: string) => {
    const blackListOfURLs: string[] = [
      "forms",
      "suscripcion-cuatrimestral-",
      "nails-master-revolution-"
    ];
    for (let index = 0; index < blackListOfURLs.length; index++) {
      const url = blackListOfURLs[index] ?? '';
      if (pathname.startsWith(url)) {
        return false;
      }
    }
    return true;
  }

  return (
    <Body >
      {
        /*router.pathname.slice(1, 6) !== "forms" && <NavBar />*/
        isVisibleNavbar(router.pathname.slice(1)) && <NavBar />
      }

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