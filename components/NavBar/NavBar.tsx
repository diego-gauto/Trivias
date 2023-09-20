import React, { useEffect, useState } from "react";

import { useFacebook } from "react-facebook";
import { useMediaQuery } from "react-responsive";

import Link from "next/link";
import { useRouter } from "next/router";

import { googleLogout } from "@react-oauth/google";

import {
  BLOGS_PATH,
  DEFAULT_USER_IMG,
  LOGIN_PATH,
  PLAN_PATH,
  PREVIEW_PATH,
  PROFILE_PATH,
  REWARDS_PATH,
  SIGNUP_PAST_USER_PATH,
  SIGNUP_PATH,
} from "../../constants/paths";
import { useAuth } from "../../hooks/useAuth";
import { conektaCustomer } from "../api/auth";
import { createNotification, getNotifications, updateAllNotificationStatusApi } from "../api/notifications";
import { retrieveConektaCustomerInfo, updateMembership } from "../api/profile";
import {
  FloatingMenuItem,
  HamburgerContain,
  HamburgerMenu,
  HamburgerMenuOptionsList,
  HoverText,
  HBList,
  HBMenu,
  IngresarOptionsList,
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
} from "./NavBar.styled";
import { SlBell } from "react-icons/sl";
import Notifications from "./Notifications/Notifications";
import { NotificationContainer } from "./Notifications/Notifications.styled";
import { getRewardsApi } from "../api/rewards";
import { getCourseApi } from "../api/lessons";

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
  const [userData, setUserData] = useState<any>(null);
  let today = new Date().getTime() / 1000;
  const closeNotif = 'images/Navbar/CloseIcon.png'

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
      userId: userId,
      conekta_id: userDataAuth.user.conekta_id
    }
    retrieveConektaCustomerInfo(data)
    getNotifications(data).then((res) => {
      let tempCounter = 0;
      res.forEach((not: any) => {
        if (!not.status) {
          tempCounter++;
        }
      })
      let tempDayCount: any = today - userDataAuth.user.start_date;
      let getMonth = tempDayCount / (3600 * 24 * 30);
      getRewardsApi().then(async (response) => {
        if (response.filter((x: any) => x.month <= getMonth).length > 0) {
          let tempRewards = response.filter((x: any) => x.month <= getMonth && x.type === "months");
          tempRewards.forEach(async (element: any) => {
            let notification = {
              userId: userDataAuth.user.user_id,
              type: "12",
              notificationId: '',
              rewardId: element.id
            }

            if (res.filter((x: any) => x.reward_id !== null && x.reward_id === element.id).length === 0) {
              createNotification(notification);
            }
          });
        }
      })
      let courses = userDataAuth.user.user_history;
      courses.forEach((element: any) => {
        getCourseApi(element.course_id).then((response) => {
          let count = 0
          response.lessons.forEach((lesson: any) => {
            if (lesson.users.includes(userDataAuth.user.user_id)) {
              count++
            }
          });
          if (count !== response.lessons.length) {
            let notification = {
              userId: userDataAuth.user.user_id,
              type: "7",
              notificationId: '',
              courseId: element.course_id,
              season: element.season_id,
              lesson: element.lesson_id,
              title: response.title,
            }
            if (res.filter((x: any) => x.course_id !== null && x.type === "7" && x.course_id === element.course_id).length === 0) {
              createNotification(notification);
            }
          }
        })
      });

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
    var userDataAuth: any = useAuth();

    useEffect(() => {
      if (userDataAuth.user !== null) {
        if (userDataAuth.user.conekta_id === null) {
          let body = {
            phone_number: "5211111111",
            name: userDataAuth.user.name,
            email: userDataAuth.user.email,
            userId: userDataAuth.user.user_id
          }
          conektaCustomer(body)
        };

        userNotifications(userDataAuth.user.user_id)
        if (userDataAuth.user.level === 2) {
          let course = userDataAuth.user.user_courses.filter((x: any) => x.course_id === 30);
          let today = new Date().getTime() / 1000;
          if (today > course[0].final_date) {
            var day = new Date();
            var nextYear = new Date();
            nextYear.setFullYear(day.getFullYear() + 1);
            let data = {
              final_date: nextYear.getTime() / 1000,
              start_date: today,
              user_id: userDataAuth.user.user_id
            }
            updateMembership(data).then((res) => {
              alert("Por favor refresque la pagina, su plan anual se acaba de activar!");
            })
          }
        }

        setUserData(userDataAuth.user);
        if (userDataAuth.user.role === 'admin' || userDataAuth.user.role === 'superAdmin') {
          setIsAdmin(true);
        }
        setLoggedIn(true);
      } else {
        if (pathname === "/thankyou") {
          router.push("/")
        }
      }
    }, [userDataAuth])

  } catch (error) {
    setLoggedIn(false);
  }
  const sendAdminTo = () => {

    if (userData.role === 'superAdmin') {
      router.push('/admin/Courses')
    }
    else {
      let counter: number = 0;
      let route: string = '/';
      userData.roles.map((role: any) => {
        if (counter === 0) {
          if (role.view !== 0) {
            counter++;
            if (role.role === 'course') {
              route = 'Courses'
            }
            if (role.role === 'coupons') {
              route = 'Coupons'
            }
            if (role.role === 'blogs') {
              route = 'Blog'
            }
            if (role.role === 'rewards') {
              route = 'Rewards'
            }
            if (role.role === 'users') {
              route = 'Users'
            }
            if (role.role === 'landing') {
              route = 'Landing'
            }
            if (role.role === 'payments') {
              route = 'Pago'
            }
            if (role.role === 'homeworks') {
              route = 'HomeWork'
            }
            if (role.role === 'comments') {
              route = 'Comments'
            }
          }
        }
      });
      if (route !== '/') {
        router.push('/admin/' + route)
      }
    }

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
        <Link href="/trivias">
          <NavText pathname={pathname} color={color} title="trivia"
            style={pathname == "/trivias" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Trivias
          </NavText>
        </Link>
        <Link href={PLAN_PATH}>
          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname === PLAN_PATH ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Planes
          </NavText>
        </Link>
        <Link href={PREVIEW_PATH}>
          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname === PREVIEW_PATH ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Cursos
          </NavText>
        </Link>
        <NavText pathname={pathname} color={color} title="Tienda" target="_blank" href="Https://gonvarnails.mx">
          Tienda
        </NavText>
        {
          (loggedIn && isAdmin) &&
          <NavText pathname={pathname} color={color} title="Admin"
            onClick={sendAdminTo}
            style={position == "/admin" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}
          >
            admin
          </NavText>
        }
        <Link href={BLOGS_PATH}>
          <NavText pathname={pathname} color={color} title="Inicio"
            style={pathname === BLOGS_PATH ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
            Blog
          </NavText>
        </Link>
        {
          loggedIn &&
          <UserContain color={color}>
            <Link href={REWARDS_PATH}>
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
                </div>
                <div className="all-notifications">
                  {
                    notifications.length > 0 &&
                    notifications.map((not: any, index: number) => {
                      return (
                        <Notifications
                          notification={not}
                          user={userData}
                          openNotifications={openNotifications}
                          unReadNotification={unReadNotification}
                          setUnReadNotification={setUnReadNotification}
                          key={"Notifications_" + index}
                        />
                      )
                    })
                  }
                </div>
                {notifications.length > 0 && <p className='read-all-tag' onClick={updateNotificationStatus}>
                  Marcar todas como leído
                </p>}
              </NotificationContainer>
              {
                !openNotification &&
                <HoverText className="hover-text" style={{ top: 39 }}>Notificaciones</HoverText>
              }
            </div> */}
            <Link href={PROFILE_PATH}>
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
                  style={pathname === LOGIN_PATH || pathname === SIGNUP_PAST_USER_PATH ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}
                >
                  Iniciar Sesión
                </NavText>
              </ShopDeco>
            </Link>
            <Link href={SIGNUP_PATH}>
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
              <div className="hamburguer-contain">
                <p className="title">Menu</p>
                <HamburgerMenu
                  src="/images/Navbar/menu2.png"
                  onClick={toggleNewHamburgerMenuIsOpen}
                />
                <HamburgerMenuOptionsList isOpen={newHamburgerMenuIsOpen} style={{ right: 12 }}>
                  <Link href="/trivias" >
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Trivias
                    </FloatingMenuItem>
                  </Link>
                  <Link href={PLAN_PATH}>
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Planes
                    </FloatingMenuItem>
                  </Link>
                  <Link href={PREVIEW_PATH}>
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Cursos
                    </FloatingMenuItem>
                  </Link>
                  <Link href={BLOGS_PATH}>
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
              <Link href={REWARDS_PATH}>
                <div className="hamburguer-contain">
                  <p className="title" style={{ bottom: -37 }}>Recompensas</p>
                  <div className="rewards-circle" onClick={closeHamburgerMenu}>
                    <div className="inside" />
                  </div>
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
              <div className="hamburguer-contain">
                <p className="title">Menu</p>
                < UserImage onClick={() => { setHamburger(!hamburger) }}>
                  {
                    userData && userData.photo
                      ? <img src={userData.photo} />
                      : <img src={DEFAULT_USER_IMG} />
                  }
                </UserImage>
              </div>
            </UserContain>

            <HamburgerContain onClick={() => { closeHamburgerMenu() }} className="menu-pane" hamburger={hamburger} admin={isAdmin}>
              <HBMenu className="menu-hamburger">
                <Link href={PROFILE_PATH} >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname === PROFILE_PATH ? { fontWeight: 600 } : {}}>
                    Mi Perfil
                  </HBList>
                </Link>
                {
                  (loggedIn && isAdmin) &&
                  <a>
                    <HBList onClick={sendAdminTo}
                      style={position == "/admin" ? { fontWeight: 600, opacity: 1 } : { fontWeight: '' }}>
                      admin
                    </HBList>
                  </a>
                }
                <Link href="/trivias" >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname == "/trivias" ? { fontWeight: 600 } : {}}>
                    Trivias
                  </HBList>
                </Link>
                <Link href={PLAN_PATH} >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname === PLAN_PATH ? { fontWeight: 600 } : {}}>
                    Planes
                  </HBList>
                </Link>
                <Link href={PREVIEW_PATH} >
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname === PREVIEW_PATH ? { fontWeight: 600 } : {}}>
                    Cursos
                  </HBList>
                </Link>
                <a href="Https://gonvarnails.mx" target="_blank">
                  <HBList onClick={() => { closeHamburgerMenu() }}>
                    Tienda
                  </HBList>
                </a>
                <Link href={BLOGS_PATH}>
                  <HBList onClick={() => { closeHamburgerMenu() }} style={pathname === BLOGS_PATH ? { fontWeight: 600 } : {}}>
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