import Purchase from "../containers/Profile/Purchase/Purchase";
import Modal1 from "../containers/Profile/User/Modal1/Modal1";
import User from "../containers/Profile/User/User";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }: any) => {
  return (
    <>
      {/* <NavBar />
      {children} */}
      <Purchase />
      {/* <Footer /> */}

    </>
  )

}
export default Layout;