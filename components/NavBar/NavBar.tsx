import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useRouter } from "next/router";

import { DEFAULT_USER_IMG, LOGIN_PATH, PREVIEW_PATH, SIGNUP_PATH } from "../../constants/paths";
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
import { googleLogout } from "@react-oauth/google";
import { useFacebook } from "react-facebook";
import io from "socket.io-client";
import { getNotifications, updateAllNotificationStatusApi } from "../api/notifications";
import Notifications from "./Notifications/Notifications";
import { NotificationContainer } from "./Notifications/Notifications.styled";

const NavBar = () => {
  const responsive400 = useMediaQuery({ query: "(max-width: 400px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [ingresarOptionsMenuIsOpen, setIngresarOpetionsMenuIsOpen] = useState(false);
  const [newHamburgerMenuIsOpen, setNewHamburgerMenuIsOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [unReadNotification, setUnReadNotification] = useState<number>(0);
  const [notifications, setNotifications] = useState<any>([]);
  const { api } = useFacebook();

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
  const openNotifications = () => {
    setOpenNotification(!openNotification);
  }
  function closeHamburgerMenu() {
    setHamburger(false)
  }
  // COLOR NAVBAR
  const [color, setColor] = useState<any>(0)
  const router = useRouter();
  let { pathname }: any = router;
  var position = pathname.substring(0, 6);
  // const socket = io("ws://94.74.77.165:4003");

  // useEffect(() => {
  //   socket.on("receiveMessage", (msg) => {
  //     if (userData) {
  //       if (userData.user_id === msg.userId) {
  //         userNotifications(msg.userId);
  //       }
  //       if (msg.type === "global") {
  //         userNotifications(userData.user_id);
  //       }
  //     }
  //   });
  // }, [userData]);

  const userNotifications = (userId: any) => {
    let data = {
      userId: userId
    }
    getNotifications(data).then((res) => {
      console.log(res);
      let tempCounter = 0;
      res.forEach((not: any) => {
        if (!not.status) {
          tempCounter++;
        }
      })
      setUnReadNotification(tempCounter);
      setNotifications(res);
    })
  }

  const ChangeNav = () => {
    if (['/', ''].includes(pathname) && window.scrollY >= 900) {
      setColor(1)
    }
    else {
      setColor(0)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', ChangeNav);
    // localStorage.clear();
    // logoutFunc();
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
      // localStorage.clear();
      // logoutFunc();
      if (userDataAuth.user !== null) {
        // userNotifications(userDataAuth.user.user_id)
        setUserData(userDataAuth.user);
        if (userDataAuth.user.role === 'admin' || userDataAuth.user.role === 'superAdmin') {
          setIsAdmin(true);
        }
        setLoggedIn(true);
      }
    }, [])

  } catch (error) {
    setLoggedIn(false);
  }
  const updateNotificationStatus = () => {
    let data = {
      userId: userData.user_id
    }
    updateAllNotificationStatusApi(data).then(() => {
      setUnReadNotification(0);
      userNotifications(data.userId);
    })
  }
  const logoutFunc = () => {
    localStorage.clear();
    if (userData.provider === "web") {
      window.location.href = "/";
    }
    if (userData.provider === "google") {
      googleLogout();
      window.location.href = "/";
    }
    if (userData.provider === "facebook") {
      api?.logout();
      window.location.href = "/";
    }
  };

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
                  }} src="/images/Navbar/gonvar_purple.png" />
                </Link>
              }
              {
                color == 1 &&
                <Link href="/">
                  <Logo style={{
                    width: "130px", height: "30px",
                  }} src="/images/Navbar/gonvar_white.png" />
                </Link>
              }
            </>
            :
            <Link href="/">
              <Logo style={{
                width: "130px", height: "30px",
              }} src="/images/Navbar/gonvar_purple.png" />
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
        <Link href="/Blogs">
          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname == "/Blogs" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
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
            {/* <div className="bell-contain">
              <SlBell className="bell" onClick={openNotifications} />
              {
                unReadNotification > 0 &&
                <p className="notifications" onClick={openNotifications} >
                  {unReadNotification}
                </p>
              }
              <NotificationContainer not={openNotification}>
                <div className='title-container'>
                  <h1 className='title'>
                    Notificaciones
                  </h1>
                  <p className='read-all-tag' onClick={updateNotificationStatus}>
                    Marcar como leidos
                  </p>
                </div>
                <div className="all-notifications">
                  {
                    notifications.length > 0 ?
                      notifications.map((not: any, index: number) => {
                        return (
                          <Notifications
                            message={not.message === "Recompensa aprovada" ? "Recompensa aprobada" : not.message}
                            status={not.status}
                            title={not.title}
                            type={not.type}
                            courseID={not.course_id}
                            seasonID={not.season}
                            lessonID={not.lesson}
                            created_at={not.created_at}
                            openNotifications={openNotifications}
                            notification_id={not.notification_id}
                            unReadNotification={unReadNotification}
                            setUnReadNotification={setUnReadNotification}
                            key={"Notifications_" + index}
                          />
                        )
                      })
                      :
                      <div className="empty-notifications">Sin Notificaciones!</div>
                  }
                </div>
              </NotificationContainer>
              {
                !openNotification &&
                <HoverText className="hover-text" style={{ top: 39 }}>Notificaciones</HoverText>
              }
            </div> */}
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
                Registrarse
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
                  <Link href={"/Blogs"}>
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Blogs
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
                <div className="rewards-circle" onClick={closeHamburgerMenu}>
                  <div className="inside" />
                </div>
              </Link>
              {/* <div className="bell-contain">
                <SlBell className="bell" onClick={openNotifications} />
                {
                  unReadNotification > 0 &&
                  <p className="notifications" onClick={openNotifications} >
                    {unReadNotification}
                  </p>
                }
                <NotificationContainer not={openNotification}>
                  <div className='title-container'>
                    <h1 className='title'>
                      Notificaciones
                    </h1>
                    <p className='read-all-tag' onClick={updateNotificationStatus}>
                      Marcar como leidos
                    </p>
                  </div>
                  <div className="all-notifications">
                    {
                      notifications.length > 0 ?
                        notifications.map((not: any, index: number) => {
                          return (
                            <Notifications
                              message={not.message === "Recompensa aprovada" ? "Recompensa aprobada" : not.message}
                              status={not.status}
                              title={not.title}
                              type={not.type}
                              courseID={not.course_id}
                              seasonID={not.season}
                              lessonID={not.lesson}
                              created_at={not.created_at}
                              openNotifications={openNotifications}
                              notification_id={not.notification_id}
                              unReadNotification={unReadNotification}
                              setUnReadNotification={setUnReadNotification}
                              key={"Notifications_" + index}
                            />
                          )
                        })
                        :
                        <div className="empty-notifications">Sin Notificaciones!</div>
                    }
                  </div>
                </NotificationContainer>

                {
                  !openNotification &&
                  <HoverText className="hover-text" style={{ top: 39 }}>Notificaciones</HoverText>
                }
              </div> */}
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
                <Link href="/Blogs" >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname == "/Blogs" ? { fontWeight: 600 } : {}}>
                    Blog
                  </HBList>
                </Link>
                <HBList onClick={() => { closeHamburgerMenu(); logoutFunc(); }}>
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