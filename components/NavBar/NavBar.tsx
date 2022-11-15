import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";

import { DEFAULT_USER_IMG, LOGIN_PATH } from "../../constants/paths";
import RespLevel from "../../containers/Profile/Rewards/UserLevel/RespLevel";
import UserLevel from "../../containers/Profile/Rewards/UserLevel/UserLevel";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import {
  HamburgerContain,
  HBList,
  HBMenu,
  Logo,
  LogoContain,
  LogoS,
  MenuIcon,
  NavContainer,
  NavResponsive,
  NavTags,
  NavText,
  Points,
  PointsContain,
  PurpleButton,
  ShopDeco,
  TagsResp,
  UserContain,
  UserImage,
} from "./NavBar.styled";

const NavBar = () => {


  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  //declare any object in state
  const [userData, setUserData] = useState<any>(null);

  function closeHamburgerMenu() {
    setHamburger(false)
  }
  //validate if its logged in
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    setLoggedIn(false)
  }

  //Call firestore user data
  useEffect(() => {
    fetchDB_data()
  }, [loggedIn])
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
  // COLOR NAVBAR
  const [color, setColor] = useState<any>(0)
  const router = useRouter();
  let { pathname }: any = router;
  var position = pathname.substring(0, 6);

  const ChangeNav = () => {
    if (['/', ''].includes(pathname) && window.scrollY >= 900) {
      setColor(1)
    }
    else {
      setColor(0)
    }
  }
  useEffect(
    () => {
      window.addEventListener('scroll', ChangeNav);
    },
    [pathname],
  );
  // COLOR NAVBAR
  return (
    <NavContainer pathname={pathname} color={color}>
      <LogoContain>
        {
          pathname == "/" ?
            <>
              {
                color == 0 &&
                <Link href="/">
                  <Logo style={{
                    width: "auto", height: "66.6%",
                    paddingTop: "15px", paddingLeft: "70px"
                  }} src="/images/Navbar/NavbarLogo.png" />
                </Link>
              }
              {
                color == 1 &&
                <Link href="/">
                  <Logo style={{
                    width: "auto", height: "66.6%",
                    paddingTop: "15px", paddingLeft: "70px"
                  }} src="/images/Navbar/NavbarLogo2.png" />
                </Link>
              }
            </>
            :
            <Link href="/">
              <Logo style={{
                width: "auto", height: "66.6%",
                paddingTop: "15px", paddingLeft: "70px"
              }} src="/images/Navbar/NavbarLogo.png" />
            </Link>
        }
      </LogoContain>
      <NavTags>
        <Link href="/Preview">

          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname == "/Preview" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Inicio
          </NavText>

        </Link>


        <NavText pathname={pathname} color={color} title="Tienda" target="_blank" href="Https://gonvarnails.mx">
          Tienda
        </NavText>

        {
          (loggedIn && isAdmin) &&
          <Link href="/admin/Courses">
            <NavText pathname={pathname} color={color} title="Admin"
              style={position == "/admin" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}
            >
              admin
            </NavText>
          </Link>
        }
        {
          loggedIn &&

          <>
            <UserContain>
              <UserLevel />
              <Link href="/Profile">
                <NavText pathname={pathname} color={color} title="Perfil"
                  style={pathname == "/Profile" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}
                >
                  {userData ? userData.name : "Bienvenido"}
                </NavText>
              </Link>
              {userData && userData.photoURL ?
                < UserImage
                  style={{
                    backgroundImage: "url(" + userData.photoURL + ")"
                    , backgroundSize: "100%"
                  }}
                />
                :
                < UserImage style={{
                  backgroundImage: "url(" + DEFAULT_USER_IMG + ")"
                }} />
              }
            </UserContain>
          </>
        }
        {!loggedIn &&
          <>
            <Link href={LOGIN_PATH}>


              <ShopDeco color={color}>
                <NavText pathname={pathname} color={color} title="Iniciar Sesion"
                  style={pathname == LOGIN_PATH || pathname == "/auth/RegisterPastUser" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}
                >
                  Iniciar Sesión
                </NavText>
              </ShopDeco>
            </Link>
            <Link href="/auth/Register">
              <PurpleButton>
                Suscribirse Ya
              </PurpleButton>
            </Link>
          </>
        }
      </NavTags>
      <NavResponsive>
        {
          !loggedIn &&
          <>
            <Link href="/">
              <LogoS />
            </Link>
            <TagsResp>
              <Link href={LOGIN_PATH}>
                <a title="Ingresar">
                  Ingresar
                </a>
              </Link>
              <Link href="/auth/Register">
                <PurpleButton>
                  Registrate
                </PurpleButton>
              </Link>
            </TagsResp>
          </>
        }
        {
          loggedIn &&
          <>
            <PointsContain>
              < RespLevel />
              <Points>
                Puntos
              </Points>
            </PointsContain>
            <Link href="/">
              <LogoS />
            </Link>
            {/* <input onClick={() => { setHamburger(true) }} type="checkbox" id="openmenu" className="hamburger-checkbox"></input> */}
            <div className="hamburger-icon" onClick={() => { setHamburger(!hamburger) }} style={{ zIndex: 2000 }}>
              <MenuIcon id="hamburger-label">
                <span></span>
                <span></span>
                <span></span>
              </MenuIcon>
            </div>
            {
              <>
                <HamburgerContain onClick={() => { closeHamburgerMenu() }} className="menu-pane" hamburger={hamburger}>
                  <HBMenu>
                    <Link href="/Preview" >
                      <HBList onClick={() => { closeHamburgerMenu() }}>
                        Inicio
                      </HBList>
                    </Link>
                    <a href="Https://gonvarnails.mx" target="_blank">
                      <HBList onClick={() => { closeHamburgerMenu() }}>
                        Tienda
                      </HBList>
                    </a>
                    {/* <Link href="/Preview">
                      <HBList onClick={() => { closeHamburgerMenu() }}>
                        Catálogo
                      </HBList>
                    </Link> */}
                    <Link href="/Profile">
                      <HBList onClick={() => { closeHamburgerMenu() }}>

                        {userData ? userData.name : "Bienvenido"}
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
                      <HBList onClick={() => { closeHamburgerMenu() }}>
                        Centro de Recompensas
                        <RespLevel />
                      </HBList>
                    </Link>
                  </HBMenu>
                </HamburgerContain>
              </>
            }
          </>
        }

      </NavResponsive>
    </NavContainer>

  )
}
export default NavBar;