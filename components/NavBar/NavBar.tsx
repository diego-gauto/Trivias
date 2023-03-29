import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";

import { DEFAULT_USER_IMG, LOGIN_PATH, PREVIEW_PATH, SIGNUP_PATH } from "../../constants/paths";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import {
  HamburgerContain,
  HamburgerMenu,
  HBList,
  HBMenu,
  IngresarOptionsList,
  FloatingMenuItem,
  Logo,
  LogoContain,
  LogoS,
  LogoS_2,
  NavContainer,
  NavResponsive,
  NavTags,
  NavText,
  PurpleButton,
  ShopDeco,
  TagsResp,
  UserContain,
  UserImage,
  HamburgerMenuOptionsList,
  HoverText,
} from "./NavBar.styled";
import { SlBell } from "react-icons/sl";
import { getAuth, signOut } from "firebase/auth";
import { getUserApi } from "../api/users";

const NavBar = () => {

  const responsive400 = useMediaQuery({ query: "(max-width: 400px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  const [ingresarOptionsMenuIsOpen, setIngresarOpetionsMenuIsOpen] = useState(false);
  const [newHamburgerMenuIsOpen, setNewHamburgerMenuIsOpen] = useState(false);

  //declare any object in state
  const [userData, setUserData] = useState<any>(null);

  const toggleIngresarOptionsMenu = () => {
    setIngresarOpetionsMenuIsOpen(!ingresarOptionsMenuIsOpen);
    setNewHamburgerMenuIsOpen(false);
  }

  const toggleNewHamburgerMenuIsOpen = () => {
    setNewHamburgerMenuIsOpen(!newHamburgerMenuIsOpen);
    setIngresarOpetionsMenuIsOpen(false);
  }

  function closeHamburgerMenu() {
    setHamburger(false)
  }

  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error)
    });
  };
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

  const closeNavbar = () => {
    setHamburger(false);
    setIngresarOpetionsMenuIsOpen(false);
    setNewHamburgerMenuIsOpen(false);
  }

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setUserData(userDataAuth.user);
        if (userDataAuth.user.role === 'admin' || 'superAdmin') {
          setIsAdmin(true);
        }
        setLoggedIn(true);
      }
    }, [])

  } catch (error) {
    setLoggedIn(false);
  }

  // COLOR NAVBAR
  return (
    <NavContainer pathname={pathname} color={color}>
      {(hamburger || ingresarOptionsMenuIsOpen || newHamburgerMenuIsOpen) && <div className="bg-transparent" onClick={(e) => { closeNavbar(); e.preventDefault(); }}></div>}
      <LogoContain>
        {
          pathname == "/" ?
            <>
              {
                color == 0 &&
                <Link href="/">
                  <Logo style={{
                    width: "130px", height: "30px",
                  }} src="/images/Navbar/NavbarLogo.png" />
                </Link>
              }
              {
                color == 1 &&
                <Link href="/">
                  <Logo style={{
                    width: "130px", height: "30px",
                  }} src="/images/Navbar/NavbarLogo2.png" />
                </Link>
              }
            </>
            :
            <Link href="/">
              <Logo style={{
                width: "130px", height: "30px",
              }} src="/images/Navbar/NavbarLogo.png" />
            </Link>
        }
      </LogoContain>
      <NavTags>
        <Link href="/Preview">
          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname == "/Preview" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Cursos
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
        <Link href="/Blog">
          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname == "/Blog" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Blog
          </NavText>
        </Link>
        {
          loggedIn &&
          <UserContain color={color}>
            <Link href="/Rewards">
              <div className="rewards-circle">
                <div className="inside" />
                <HoverText className="hover-text">Recompensas</HoverText>
              </div>
            </Link>
            <div className="bell-contain">
              <SlBell className="bell" />
              <div className="notifications" />
              <HoverText className="hover-text" style={{ top: 39 }}>Notificaciones</HoverText>
            </div>
            <Link href="/Profile">
              < UserImage>
                {
                  userData && userData.photo
                    ?
                    <img src={userData.photo} />
                    :
                    <img src={DEFAULT_USER_IMG} />
                }
                <HoverText className="hover-text" style={{ top: 43 }}>Perfil</HoverText>
              </UserImage>
            </Link>
          </UserContain>
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
              <div style={{ margin: "auto 20px" }}>
                <PurpleButton onClick={toggleIngresarOptionsMenu}>
                  Ingresar
                </PurpleButton>
              </div>
              <IngresarOptionsList isOpen={ingresarOptionsMenuIsOpen}>
                <Link href={LOGIN_PATH}>
                  <FloatingMenuItem onClick={toggleIngresarOptionsMenu}>
                    Iniciar sesión
                  </FloatingMenuItem>
                </Link>
                <Link href={SIGNUP_PATH}>
                  <FloatingMenuItem onClick={toggleIngresarOptionsMenu}>
                    Regístrate
                  </FloatingMenuItem>
                </Link>
              </IngresarOptionsList>
              <div>
                <HamburgerMenu
                  src="/images/Navbar/menu2.png"
                  onClick={toggleNewHamburgerMenuIsOpen}
                />
                <HamburgerMenuOptionsList isOpen={newHamburgerMenuIsOpen} style={{ right: 12 }}>
                  <Link href={PREVIEW_PATH}>
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Cursos
                    </FloatingMenuItem>
                  </Link>
                  <a href="https://gonvarnails.mx/" target="_blank">
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Tienda
                    </FloatingMenuItem>
                  </a>
                </HamburgerMenuOptionsList>
              </div>
            </TagsResp>
          </>
        }
        {
          loggedIn &&
          <>
            <div id="hola" style={{
              display: "flex",
              width: "auto",
              height: "100%",
              marginLeft: !responsive400 ? "35px" : "20px"
            }}>
              <Link href="/">
                <LogoS_2 />
              </Link>
            </div>
            <UserContain color={color}>
              <Link href="/Rewards">
                <div className="rewards-circle">
                  <div className="inside" />
                </div>
              </Link>
              <div className="bell-contain">
                <SlBell className="bell" />
                <div className="notifications" />
              </div>
              < UserImage onClick={() => { setHamburger(!hamburger) }}>
                {
                  userData && userData.photoURL
                    ? <img src={userData.photoURL} />
                    : <img src={DEFAULT_USER_IMG} />
                }
              </UserImage>
            </UserContain>
            <HamburgerContain onClick={() => { closeHamburgerMenu() }} className="menu-pane" hamburger={hamburger}>
              <HBMenu className="menu-hamburger">
                <Link href="/Profile" >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname == "/Profile" ? { fontWeight: 600 } : {}}>
                    Mi Perfil
                  </HBList>
                </Link>
                <Link href="/Preview" >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname == "/Preview" ? { fontWeight: 600 } : {}}>
                    Cursos
                  </HBList>
                </Link>
                <a href="Https://gonvarnails.mx" target="_blank">
                  <HBList onClick={() => { closeHamburgerMenu() }}>
                    Tienda
                  </HBList>
                </a>
                <Link href="/Blog" >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname == "/Blog" ? { fontWeight: 600 } : {}}>
                    Blog
                  </HBList>
                </Link>
                <HBList onClick={() => { closeHamburgerMenu(), logoutFunc() }}>
                  Cerrar Sesion
                </HBList>
              </HBMenu>
            </HamburgerContain>
          </>
        }
      </NavResponsive>
    </NavContainer >

  )
}
export default NavBar;