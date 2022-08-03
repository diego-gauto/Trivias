import { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import {
  Close,
  HamburgerContain,
  HBList,
  HBMenu,
  IconsContain,
  Level,
  Logo,
  LogoS,
  MenuIcon,
  NavContainer,
  NavHome,
  NavResponsive,
  NavTags,
  NavTags2,
  NavText,
  Points,
  PointsContain,
  PurpleButton,
  UserContain,
  UserImage,
  UserText,
} from "./NavBar.styled";
import Scroll from "./scroll";

import { DEFAULT_USER_IMG } from "../../constants/paths";
const NavBar = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //declare any object in state
  const [userData, setUserData] = useState<any>(null);

  //validate if its logged in
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
        console.log("Logged: Yes")
      } else {
        setLoggedIn(false)
        console.log("Logged: No")
      }
    }, [])

  } catch (error) {
    console.log(error)
    setLoggedIn(false)
  }

  //Call firestore user data
  useEffect(() => {
    fetchDB_data()
  }, [loggedIn])


  /*   useEffect(() => {
      try {
        console.log(userData)
        console.log(userData.role)
      } catch (error) {
      }
    }, [userData]) */

  //firestore query from auth data
  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        var userData: any;
        response.forEach((e) => {
          userData = e.data()
        });
        setUserData(userData)
        if (userData.role == "admin") {
          setIsAdmin(true)
        }
        return userData
      })
    } catch (error) {
      return false
    }
  }

  // Nav Change Color
  const [hamburger, setHamburger] = useState(false);
  const [color, setColor] = useState(false)

  useEffect(() => {
    if (color == true)
      return HomeNav2()
    else (color == false)
    return HomeNav()
  }, [color])

  const [route, setRoute] = useState("");
  const [logo, setLogo] = useState("/images/logo.png");

  const [shadow, setBoxShadow] = useState("");
  const [colorBack, setColorBack] = useState("transparent");
  const [fontColor, setFontColor] = useState("white");

  const HomeNav = () => {
    setLogo("/images/logo.png");
    setColorBack("transparent");
    setFontColor("white");
    setBoxShadow("");
  }
  const HomeNav2 = () => {
    setLogo("/images/logo3.png");
    setColorBack("white");
    setFontColor("black");
    setBoxShadow("0px 4px 4px rgba(0, 0, 0, 0.25)");
  }
  const LoginNav = () => {
    setLogo("/images/logo3.png");
    setColorBack("white");
    setFontColor("black");
    setRoute("");
    setBoxShadow("0px 4px 4px rgba(0, 0, 0, 0.25)");
  }
  const UserNav = () => {
    setLogo("/images/logo3.png");
    setColorBack("white");
    setFontColor("black");
    setRoute("Preview");
    setBoxShadow("0px 4px 4px rgba(0, 0, 0, 0.25)");
  }
  const router = useRouter();
  let { pathname } = router;


  useEffect(() => {
    if (['/', ''].includes(pathname)) return HomeNav();
    if (pathname == '/auth/Login' || pathname == '/auth/Register') return LoginNav();
    if (pathname == '/Profile' ||
      pathname == '/Rewards' ||
      pathname == '/Purchase' ||
      pathname == '/Lesson' ||
      pathname == '/Preview'
    ) return UserNav();

  }, [pathname])
  return (

    <>
      {//Vista del navbar dinamico de Homepage
        pathname == "" || pathname == "/" && !loggedIn
          ?
          <>
            <NavHome style={{ background: `${colorBack}`, boxShadow: `${shadow}` }}>
              <Scroll color={color} setColor={setColor} pathname={pathname} />
              <Link href="/">
                <Logo src={`${logo}`} width={130} height={70} />
              </Link>
              <NavTags>
                <Link href="/">
                  <NavText style={{ color: `${fontColor}` }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: `${fontColor}` }}>
                  Tienda
                </NavText>
                <Link href="/Preview">
                  <NavText style={{ color: `${fontColor}` }}>
                    Catálogo
                  </NavText>
                </Link>
                <Link href="/auth/Login">
                  <NavText style={{ color: `${fontColor}` }}>
                    Iniciar Sesión
                  </NavText>
                </Link>
                <Link href="/auth/Register">
                  <PurpleButton>
                    Suscribirse Ya
                  </PurpleButton>
                </Link>
              </NavTags>
            </NavHome >
            <NavResponsive style={{ position: 'fixed' }}>
              <Link href="/">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags2>
                <Link href="/auth/Login">
                  <NavText style={{ color: '#6717CD' }}>
                    Ingresar
                  </NavText>
                </Link>
                <Link href="/auth/Register">
                  <PurpleButton>
                    Acceder
                  </PurpleButton>
                </Link>
              </NavTags2>
            </NavResponsive>
          </>
          : <></>
      }
      {//vista de navbar general
        pathname !== "/" &&
          pathname !== "" && !loggedIn
          ?
          <>
            <NavContainer style={{ background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <Link href="/">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags>
                <Link href={'/'}>
                  <NavText style={{ color: 'black' }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: 'black' }}>
                  Tienda
                </NavText>
                <Link href="/Preview">
                  <NavText style={{ color: 'black' }}>
                    Catálogo
                  </NavText>
                </Link>
                <Link href="/auth/Login">
                  <NavText style={{ color: 'black' }}>
                    Iniciar Sesión
                  </NavText>
                </Link>
                <Link href="/auth/Register">
                  <PurpleButton>
                    Suscribirse Ya
                  </PurpleButton>
                </Link>
              </NavTags>
            </NavContainer >
            <NavResponsive >
              <Link href="/">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags2>
                <Link href="/auth/Login">
                  <NavText style={{ color: '#6717CD' }}>
                    Ingresar
                  </NavText>
                </Link>
                <Link href="/auth/Register">
                  <PurpleButton>
                    Acceder
                  </PurpleButton>
                </Link>
              </NavTags2>
            </NavResponsive>
          </>

          : <></>
      }
      {//vista de usuario Loggin
        loggedIn && !isAdmin
          ?
          <>
            <NavContainer style={{ background: 'white', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
              <Link href="/">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags>
                <Link href={`/${route}`}>
                  <NavText style={{ color: 'black' }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: 'black' }}>
                  Tienda
                </NavText>
                <Link href="/Preview">
                  <NavText style={{ color: 'black' }}>
                    Cátalogo
                  </NavText>
                </Link>
                <Link href="/Purchase">
                  <NavText style={{ color: 'black' }}>
                    Comprar{" (Temp)"}
                  </NavText>
                </Link>
                <Link href="/Lesson">
                  <NavText style={{ color: 'black' }}>
                    Lesson{" (Temp)"}
                  </NavText>
                </Link>

                <UserContain>
                  <Link href="/Rewards">
                    <Level />
                  </Link>
                  <Link href="/Profile">
                    <UserText>
                      {userData ? userData.name : "Bienvenido"}
                    </UserText>
                  </Link>
                  {userData && userData.photoURL ?
                    < UserImage
                      style={{
                        backgroundImage: "url(" + userData.photoURL + ")"
                        , backgroundSize: "100%"
                      }}
                    > </UserImage>
                    :
                    < UserImage style={{
                      backgroundImage: "url(" + DEFAULT_USER_IMG + ")"
                    }} > </UserImage>
                  }

                </UserContain>
              </NavTags>
            </NavContainer >
            <NavResponsive>
              <PointsContain>
                <Level />
                <Points>
                  Puntos
                </Points>
              </PointsContain>
              <LogoS />
              <MenuIcon onClick={() => { setHamburger(true) }} />
              {
                hamburger == true
                &&
                <>
                  <HamburgerContain>
                    <IconsContain>
                      <LogoS />
                      <Close onClick={() => { setHamburger(false) }} />
                    </IconsContain>
                    <HBMenu>
                      <Link href="/Preview" >
                        <HBList onClick={() => { setHamburger(false) }}>
                          Inicio
                        </HBList>
                      </Link>
                      <HBList onClick={() => { setHamburger(false) }}>
                        Tienda
                      </HBList>
                      <Link href="/Preview">
                        <HBList onClick={() => { setHamburger(false) }}>
                          Catálogo
                        </HBList>
                      </Link>
                      <Link href="/Profile">
                        <HBList onClick={() => { setHamburger(false) }}>

                          {userData ? userData.name : "Bienvenido"}    {"(Usuario MOVIL)"}
                          {userData && userData.photoURL ?
                            < UserImage
                              style={{
                                backgroundImage: "url(" + userData.photoURL + ")"
                                , backgroundSize: "100%"
                              }}
                            > </UserImage>
                            :
                            < UserImage style={{
                              backgroundImage: "url(" + DEFAULT_USER_IMG + ")"
                            }} > </UserImage>
                          }
                        </HBList>
                      </Link>
                      <Link href="/Rewards">
                        <HBList onClick={() => { setHamburger(false) }}>
                          Centro de Recompensas
                          <Level />
                        </HBList>
                      </Link>
                    </HBMenu>
                  </HamburgerContain>
                </>
              }
            </NavResponsive>

          </>

          : <></>
      }
      {//vista de usuario Loggin
        // pathname == '/Profile' ||
        //   pathname == '/Rewards' ||
        //   pathname == '/Purchase' ||
        //   pathname == '/Lesson' ||
        //   pathname == '/Preview' ||
        loggedIn && isAdmin
          ?
          <>
            <NavContainer style={{ background: 'white', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
              <Link href="/">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags>
                <Link href={`/${route}`}>
                  <NavText style={{ color: 'black' }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: 'black' }}>
                  Tienda
                </NavText>

                <Link href="/Purchase">
                  <NavText style={{ color: 'black' }}>
                    Comprar{" (Temp)"}
                  </NavText>
                </Link>
                <Link href="/admin/Courses">
                  <NavText style={{ color: 'black' }}>
                    Cursos
                  </NavText>
                </Link>
                <Link href="/Preview">
                  <NavText style={{ color: 'black' }}>
                    Cátalogo
                  </NavText>
                </Link>
                <UserContain>
                  <Level />
                  <Link href="/Profile">
                    <UserText>
                      {userData ? userData.name : "Bienvenido"}   {"(Admin WEB)"}
                    </UserText>
                  </Link>
                  {userData && userData.photoURL ?
                    < UserImage
                      style={{
                        backgroundImage: "url(" + userData.photoURL + ")"
                        , backgroundSize: "100%"
                      }}
                    > </UserImage>
                    :
                    < UserImage style={{
                      backgroundImage: "url(" + DEFAULT_USER_IMG + ")"
                    }} > </UserImage>
                  }
                </UserContain>
              </NavTags>
            </NavContainer >
            <NavResponsive>
              <PointsContain>
                <Level />
                <Points>
                  Puntos
                </Points>
              </PointsContain>
              <LogoS />
              <MenuIcon onClick={() => { setHamburger(true) }} />
              {
                hamburger == true
                &&
                <>
                  <HamburgerContain>
                    <IconsContain>
                      <LogoS />
                      <Close onClick={() => { setHamburger(false) }} />
                    </IconsContain>
                    <HBMenu>
                      <Link href="/Preview" >
                        <HBList onClick={() => { setHamburger(false) }}>
                          Inicio
                        </HBList>
                      </Link>
                      <HBList onClick={() => { setHamburger(false) }}>
                        Tienda
                      </HBList>
                      <Link href="/Preview">
                        <HBList onClick={() => { setHamburger(false) }}>
                          Catálogo
                        </HBList>
                      </Link>
                      <Link href="/Profile">
                        <HBList onClick={() => { setHamburger(false) }}>

                          {userData ? userData.name : "Bienvenido"}   {"(Admin MOVIL)"}
                          {userData && userData.photoURL ?
                            < UserImage
                              style={{
                                backgroundImage: "url(" + userData.photoURL + ")"
                                , backgroundSize: "100%"
                              }}
                            > </UserImage>
                            :
                            < UserImage style={{
                              backgroundImage: "url(" + DEFAULT_USER_IMG + ")"
                            }} > </UserImage>
                          }
                        </HBList>
                      </Link>
                      <Link href="/Rewards">
                        <HBList onClick={() => { setHamburger(false) }}>
                          Centro de Recompensas
                          <Level />
                        </HBList>
                      </Link>
                    </HBMenu>
                  </HamburgerContain>
                </>
              }
            </NavResponsive>

          </>

          : <></>
      }
    </>

  )
}
export default NavBar;

