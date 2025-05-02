import React, { useEffect, useRef, useState } from 'react';

import { useFacebook } from 'react-facebook';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { googleLogout } from '@react-oauth/google';

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
} from '../../constants/paths';
import { useAuth } from '../../hooks/useAuth';
import { conektaCustomer } from '../api/auth';
import {
  getNotifications,
  updateAllNotificationStatusApi,
} from '../api/notifications';
import { customerOrders, updateMembership } from '../api/profile';
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
} from './NavBar.styled';
import { SlBell } from 'react-icons/sl';
import Notifications from './Notifications/Notifications';
import { NotificationContainer } from './Notifications/Notifications.styled';
import { RetryPayModal } from '../Modals/RetryPayModal/RetryPayModal';
import { IUserData } from '../admin/UserData';
import { getFirstLinkToAdmin } from './NavBarConstants';
import { getGenericQueryResponse } from '../api/admin';

interface NotificationByUser {
  notification_id: number;
  user_id: number;
  type: string;
  status: number;
  created_at: string;
  source_table: string;
  course_id?: number;
  season?: number;
  lesson?: number;
  title?: string;
  score?: number;
  user_comment_id?: number;
  user_like_id?: number;
  amount?: number;
  product_name?: string;
  reward_id?: number;
  due_date?: number;
}

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDistributor, setIsDistributor] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [ingresarOptionsMenuIsOpen, setIngresarOpetionsMenuIsOpen] =
    useState(false);
  const [newHamburgerMenuIsOpen, setNewHamburgerMenuIsOpen] = useState(false);
  const [showNotification, setOpenNotification] = useState<boolean>(false);
  const [unReadNotification, setUnReadNotification] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationByUser[]>([]);
  const { api } = useFacebook();
  const [userData, setUserData] = useState<IUserData>({} as IUserData);
  const [showRetryPaymentModal, setShowRetryPaymentModal] = useState(false);
  const [withSubscription, setWithSubscription] = useState(true);
  const modalNotificationsRef = useRef<any>(null);
  const [firstTime, setFirstTime] = useState(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (event === null) {
      return;
    }
    const { target } = event;
    const targetElement = target as HTMLElement;
    if (
      targetElement.classList.contains('bell-contain') ||
      targetElement.classList.contains('bell')
    ) {
      return;
    }
    const parent = (target as HTMLElement).parentElement;
    if (parent && parent.classList.contains('bell')) {
      return;
    }

    const targetObject = {
      target: event.target,
      current: modalNotificationsRef.current,
    };

    if (targetObject.target != null && targetObject.current != null) {
      if (
        (targetObject.target as HTMLDivElement).id === targetObject.current.id
      ) {
        return;
      }
      const parent1 = (targetObject.target as HTMLDivElement)
        .parentNode as HTMLDivElement;
      if (parent1 != null) {
        if (parent1.id === targetObject.current.id) {
          return;
        }
      }

      const parent2 = parent1.parentNode as HTMLDivElement;
      if (parent2 != null) {
        if (parent2.id === targetObject.current.id) {
          return;
        }
      }
    }

    /*
    <div class="notification-data">
    <img class="notification-image" src="../images/notifications/not_8.png">
    <div class="notification-texts">
      <div class="notification-info">
        <p class="title">Renovación de suscripción pendiente</p>
        <p class="message">Diego recuerda que esta a punto de finalizar tu suscripción, dirígete a la sección de métodos de pago para renovar tu suscripción</p>
      </div>
      <p class="date-text">Martes 13 de Febrero, 2024. 4:15 p.m.</p>
    </div>
  </div>
    */
    const classArrayToCheck = [
      'notification-data',
      'notification-image',
      'notification-texts',
      'notification-info',
      'title',
      'message',
      'date-text',
      'notifications',
    ];
    const classList = [...(target as HTMLDivElement).classList];

    for (const classItem of classList) {
      if (classArrayToCheck.includes(classItem)) {
        return;
      }
    }

    if (
      modalNotificationsRef.current &&
      !modalNotificationsRef.current.contains(event.target)
    ) {
      if (!showNotification) {
        setOpenNotification(showNotification);
      }
    }
  };

  const toggleIngresarOptionsMenu = () => {
    setIngresarOpetionsMenuIsOpen(!ingresarOptionsMenuIsOpen);
    setNewHamburgerMenuIsOpen(false);
  };

  const toggleNewHamburgerMenuIsOpen = () => {
    setNewHamburgerMenuIsOpen(!newHamburgerMenuIsOpen);
    setIngresarOpetionsMenuIsOpen(false);
  };
  const openNotifications = () => {
    setOpenNotification(!showNotification);
  };
  function closeHamburgerMenu() {
    setHamburger(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // COLOR NAVBAR
  const [color, setColor] = useState<any>(0);
  const router = useRouter();
  let { pathname }: any = router;
  var position = pathname.substring(0, 6);

  const userNotifications = async (userId: any) => {
    try {
      let data = {
        userId: userId,
        conekta_id: userDataAuth.user.conekta_id,
      };
      const res = await getNotifications(data);
      let tempCounter = 0;
      res.data.forEach((notification) => {
        if (!notification.status) {
          tempCounter++;
        }
      });
      setUnReadNotification(tempCounter);
      setNotifications(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.table(error);
      }
    }
  };
  const ChangeNav = () => {
    if (['/', ''].includes(pathname) && window.scrollY >= 900) {
      setColor(1);
    } else {
      setColor(0);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', ChangeNav);
    return () => {
      window.removeEventListener('scroll', ChangeNav);
    }
  }, [pathname]);

  const closeNavbar = () => {
    setHamburger(false);
    setIngresarOpetionsMenuIsOpen(false);
    setNewHamburgerMenuIsOpen(false);
  };

  async function checkIfIsDistributor(user_id: number) {
    try {
      const query = `SELECT COUNT(*) AS count FROM distributors AS d WHERE d.user_id = ${user_id};`;
      const response = await getGenericQueryResponse(query);
      const data = response.data.data as { count: number }[];
      return (data[0]?.count || 0) > 0;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  try {
    var userDataAuth: any = useAuth();

    useEffect(() => {
      if (userDataAuth.user !== null) {
        if (userDataAuth.user.conekta_id === null) {
          let body = {
            phone_number: '5211111111',
            name: userDataAuth.user.name,
            email: userDataAuth.user.email,
            userId: userDataAuth.user.user_id,
          };
          conektaCustomer(body);
        }

        let today = Math.floor(new Date().getTime() / 1000);
        userNotifications(userDataAuth.user.user_id);
        if (userDataAuth.user.level === 2) {
          let course = userDataAuth.user.user_courses.filter(
            (x: any) => x.course_id === 30,
          );
          if (today > course[0].final_date) {
            var day = new Date();
            var nextYear = new Date();
            nextYear.setFullYear(day.getFullYear() + 1);
            let data = {
              final_date: nextYear.getTime() / 1000,
              start_date: today,
              user_id: userDataAuth.user.user_id,
            };
            updateMembership(data).then((res) => {
              alert(
                'Por favor refresque la pagina, su plan anual se acaba de activar!',
              );
            });
          }
        }
        const { final_date, level, role, method, type, roles } = userDataAuth.user;
        let diff = Math.round((today - final_date) / 86400);
        const haveNoRecurrentSubscription = [0, 5, 6, 8].includes(level);
        const haveRecurrentSubscription = [1, 4, 7].includes(level) && method === 'conekta';
        const withTolerance = final_date < today - 10 * 24 * 60 * 60;
        const withoutTolerance = final_date < today;
        const isSuperAdmin = role === 'superAdmin';

        console.log({
          final_date, level, role, method, type, diff, roles
        });

        if (final_date < today) {
          if (
            diff < 90 &&
            ((haveNoRecurrentSubscription && withoutTolerance) ||
              (haveRecurrentSubscription && withTolerance)) &&
            method !== 'paypal' &&
            pathname !== '/reintentar-pago' &&
            !isSuperAdmin
          ) {
            setShowRetryPaymentModal(true);
            setWithSubscription(false);
          }
        }

        setUserData(userDataAuth.user);
        if (role === 'admin' || role === 'superAdmin') {
          setIsAdmin(true);
        }
        checkIfIsDistributor(userDataAuth.user.user_id)
          .then((value) => {
            setIsDistributor(value);
          })

        setLoggedIn(true);
      } else {
        if (pathname === '/thankyou') {
          router.push('/');
        }
      }
    }, [userDataAuth]);
  } catch (error) {
    setLoggedIn(false);
  }
  const sendAdminTo = () => {
    if (userData.role === 'superAdmin' ||
      (userData.roles.length > 0 && userData.role === 'admin')
    ) {
      const roles = userData.roles.map(r => {
        return {
          source_table: r.source_table,
          view: `${r.view}` === '1'
        }
      }).filter(r => r.view === true)
        .map(r => {
          return r.source_table
        });

      const firstLinkToAdmin = getFirstLinkToAdmin(roles);
      if (userData.role === 'superAdmin') {
        router.push('/admin/Courses');
      } else {
        router.push(firstLinkToAdmin);
      }
    } else {
      let counter: number = 0;
      let route: string = '/';
      userData.roles.forEach((role) => {
        if (counter === 0) {
          if (role.view == '1') {
            counter++;
            if (role.role === 'course') {
              route = 'Courses';
            } else if (role.role === 'coupons') {
              route = 'Coupons';
            } else if (role.role === 'blogs') {
              route = 'Blog';
            } else if (role.role === 'rewards') {
              route = 'Rewards';
            } else if (role.role === 'users') {
              route = 'Users';
            } else if (role.role === 'landing') {
              route = 'Landing';
            } else if (role.role === 'payments') {
              route = 'Pago';
            } else if (role.role === 'homeworks') {
              route = 'HomeWork';
            } else if (role.role === 'comments') {
              route = 'Comments';
            } else if (role.role === 'distributors') {
              route = 'Distributors';
            } else if (role.role === 'active_memberships') {
              route = 'MembershipStats';
            } else if (role.role === 'memberships_list') {
              route = 'Memberships';
            } else if (role.role === 'forms') {
              route = 'Forms';
            } else if (role.role === 'forms_list') {
              route = 'Forms';
            } else if (role.role === 'subscriptions') {
              route = 'SuscriptionStats';
            } else if (role.role === 'tickets_list') {
              route = 'Tickets';
            } else if (role.role === 'trivias') {
              route = 'Trivias';
            } else if (role.role === 'trivias_list') {
              route = 'Trivias';
            }
          }
        }
      });
      if (route !== '/') {
        router.push('/admin/' + route);
      }
    }
    if (isDistributor && userData.role !== 'superAdmin') {
      router.push('/admin/DistributorDetails');
    }

  };
  const updateNotificationStatus = () => {
    let data = {
      userId: userData.user_id,
    };
    updateAllNotificationStatusApi(data).then(() => {
      setUnReadNotification(0);
      userNotifications(data.userId);
    });
  };
  const logoutFunc = () => {
    localStorage.clear();
    if (userData.provider === 'web') {
      window.location.href = '/';
    }
    if (userData.provider === 'google') {
      googleLogout();
      window.location.href = '/';
    }
    if (userData.provider === 'facebook') {
      api?.logout();
      window.location.href = '/';
    }
  };

  // COLOR NAVBAR
  return (
    <NavContainer pathname={pathname} color={color}>
      {firstTime && (
        <RetryPayModal
          show={showRetryPaymentModal}
          onHide={() => {
            setShowRetryPaymentModal(false);
            setFirstTime(false);
          }}
          withSubscription={withSubscription}
        />
      )}
      {(hamburger || ingresarOptionsMenuIsOpen || newHamburgerMenuIsOpen) && (
        <div
          className='bg-transparent'
          onClick={(e) => {
            closeNavbar();
            e.preventDefault();
          }}
        ></div>
      )}
      <LogoContain>
        {pathname == '/' ? (
          <>
            {color == 0 && (
              <Link href='/'>
                <Logo
                  style={{
                    width: '130px',
                    height: '30px',
                  }}
                  src='/images/Navbar/gonvar_purple.png'
                />
              </Link>
            )}
            {color == 1 && (
              <Link href='/'>
                <Logo
                  style={{
                    width: '130px',
                    height: '30px',
                  }}
                  src='/images/Navbar/gonvar_white.png'
                />
              </Link>
            )}
          </>
        ) : (
          <Link href='/'>
            <Logo
              style={{
                width: '130px',
                height: '30px',
              }}
              src='/images/Navbar/gonvar_purple.png'
            />
          </Link>
        )}
      </LogoContain>
      <NavTags>
        <Link href='/trivias'>
          <NavText
            pathname={pathname}
            color={color}
            title='trivia'
            style={
              pathname == '/trivias'
                ? { fontWeight: 600, opacity: 1 }
                : { fontWeight: '' }
            }
          >
            Trivias
          </NavText>
        </Link>
        <Link href={PLAN_PATH}>
          <NavText
            pathname={pathname}
            color={color}
            title='Inicio'
            style={
              pathname === PLAN_PATH
                ? { fontWeight: 600, opacity: 1 }
                : { fontWeight: '' }
            }
          >
            Planes
          </NavText>
        </Link>
        <Link href={PREVIEW_PATH}>
          <NavText
            pathname={pathname}
            color={color}
            title='Inicio'
            style={
              pathname === PREVIEW_PATH
                ? { fontWeight: 600, opacity: 1 }
                : { fontWeight: '' }
            }
          >
            Cursos
          </NavText>
        </Link>
        <NavText
          pathname={pathname}
          color={color}
          title='Tienda'
          target='_blank'
          href='Https://gonvarnails.mx'
        >
          Tienda
        </NavText>
        {loggedIn && (isAdmin || isDistributor) && (
          <NavText
            pathname={pathname}
            color={color}
            title='Admin'
            onClick={sendAdminTo}
            style={
              position == '/admin'
                ? { fontWeight: 600, opacity: 1 }
                : { fontWeight: '' }
            }
          >
            admin
          </NavText>
        )}
        <Link href={BLOGS_PATH}>
          <NavText
            pathname={pathname}
            color={color}
            title='Inicio'
            style={
              pathname === BLOGS_PATH
                ? { fontWeight: 600, opacity: 1 }
                : { fontWeight: '' }
            }
          >
            Blog
          </NavText>
        </Link>
        {loggedIn && (
          <UserContain color={color}>
            <Link href={REWARDS_PATH}>
              <div className='rewards-circle'>
                <div className='inside' />
                <HoverText className='hover-text'>Recompensas</HoverText>
              </div>
            </Link>
            <div className='bell-contain'>
              <SlBell className='bell' onClick={openNotifications} />
              {unReadNotification > 0 && (
                <p className='notifications' onClick={openNotifications}>
                  {unReadNotification}
                </p>
              )}
              <NotificationContainer
                ref={modalNotificationsRef}
                id='notification-container'
                show={showNotification}
                empty={notifications.length === 0}
              >
                <div className='title-container'>
                  <h1 className='title'>Notificaciones</h1>
                </div>
                <div className='all-notifications'>
                  {notifications.length === 0 ? (
                    <div style={{ paddingLeft: '20px' }}>
                      <p>Actualmente no hay notificaciones</p>
                    </div>
                  ) : (
                    notifications.map((notification, index) => {
                      return (
                        <Notifications
                          notification={notification}
                          user={userData}
                          openNotifications={openNotifications}
                          unReadNotification={unReadNotification}
                          setUnReadNotification={setUnReadNotification}
                          key={'Notifications_' + index}
                          setOpenNotification={setOpenNotification}
                        />
                      );
                    })
                  )}
                </div>
                {notifications.length > 0 && (
                  <p
                    className='read-all-tag'
                    onClick={updateNotificationStatus}
                  >
                    Marcar todas como leído
                  </p>
                )}
              </NotificationContainer>
              {!showNotification && (
                <HoverText className='hover-text' style={{ top: 39 }}>
                  Notificaciones
                </HoverText>
              )}
            </div>
            <Link href={PROFILE_PATH}>
              <UserImage>
                {userData && userData.photo ? (
                  <img
                    src={userData.photo}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                ) : (
                  <img src={DEFAULT_USER_IMG} />
                )}
                <HoverText className='hover-text' style={{ top: 43 }}>
                  Perfil
                </HoverText>
              </UserImage>
            </Link>
          </UserContain>
        )}
        {!loggedIn && (
          <>
            <Link href={LOGIN_PATH}>
              <ShopDeco color={color}>
                <NavText
                  pathname={pathname}
                  color={color}
                  title='Iniciar Sesion'
                  style={
                    pathname === LOGIN_PATH ||
                      pathname === SIGNUP_PAST_USER_PATH
                      ? { fontWeight: 600, opacity: 1 }
                      : { fontWeight: '' }
                  }
                >
                  Iniciar Sesión
                </NavText>
              </ShopDeco>
            </Link>
            <Link href={SIGNUP_PATH}>
              <PurpleButton>Registrarse</PurpleButton>
            </Link>
          </>
        )}
      </NavTags>
      <NavResponsive>
        {!loggedIn && (
          <>
            <Link href='/'>
              <LogoS />
            </Link>
            <TagsResp>
              <div style={{ margin: 'auto 20px' }}>
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
              <div className='hamburguer-contain'>
                <p className='title'>Menu</p>
                <HamburgerMenu
                  src='/images/Navbar/menu2.png'
                  onClick={toggleNewHamburgerMenuIsOpen}
                />
                <HamburgerMenuOptionsList isOpen={newHamburgerMenuIsOpen}>
                  <Link href='/trivias'>
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
                  <a href='https://gonvarnails.mx/' target='_blank'>
                    <FloatingMenuItem onClick={toggleNewHamburgerMenuIsOpen}>
                      Tienda
                    </FloatingMenuItem>
                  </a>
                </HamburgerMenuOptionsList>
              </div>
            </TagsResp>
          </>
        )}
        {loggedIn && (
          <>
            <div
              id='hola'
              style={{
                display: 'flex',
                width: 'auto',
                height: '100%',
              }}
            >
              <Link href='/'>
                <LogoS_2 />
              </Link>
            </div>
            <UserContain color={color}>
              <Link href={REWARDS_PATH}>
                <div className='hamburguer-contain'>
                  <p className='title' style={{ bottom: -37 }}>
                    Recompensas
                  </p>
                  <div className='rewards-circle' onClick={closeHamburgerMenu}>
                    <div className='inside' />
                  </div>
                </div>
              </Link>
              <div className='bell-contain'>
                <SlBell className='bell' onClick={openNotifications} />
                {unReadNotification > 0 && (
                  <p className='notifications' onClick={openNotifications}>
                    {unReadNotification}
                  </p>
                )}
                <NotificationContainer
                  ref={modalNotificationsRef}
                  id='notification-container'
                  show={showNotification}
                  empty={notifications.length === 0}
                >
                  <div className='title-container'>
                    <h1 className='title'>Notificaciones</h1>
                  </div>
                  <div className='all-notifications'>
                    {notifications.length === 0 ? (
                      <div style={{ paddingLeft: '20px' }}>
                        <p>Actualmente no hay notificaciones</p>
                      </div>
                    ) : (
                      notifications.map((not, index) => {
                        return (
                          <Notifications
                            notification={not}
                            user={userData}
                            openNotifications={openNotifications}
                            unReadNotification={unReadNotification}
                            setUnReadNotification={setUnReadNotification}
                            key={'Notifications_' + index}
                            setOpenNotification={setOpenNotification}
                          />
                        );
                      })
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <p
                      className='read-all-tag'
                      onClick={updateNotificationStatus}
                    >
                      Marcar todas como leído
                    </p>
                  )}
                </NotificationContainer>
                {!showNotification && (
                  <HoverText className='hover-text' style={{ top: 39 }}>
                    Notificaciones
                  </HoverText>
                )}
              </div>
              <div className='hamburguer-contain'>
                <p className='title'>Menu</p>
                <UserImage
                  onClick={() => {
                    setHamburger(!hamburger);
                  }}
                >
                  {userData && userData.photo ? (
                    <img
                      src={userData.photo}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  ) : (
                    <img src={DEFAULT_USER_IMG} />
                  )}
                </UserImage>
              </div>
            </UserContain>

            <HamburgerContain
              onClick={() => {
                closeHamburgerMenu();
              }}
              className='menu-pane'
              hamburger={hamburger}
              admin={isAdmin}
            >
              <HBMenu className='menu-hamburger'>
                <Link href={PROFILE_PATH}>
                  <HBList
                    onClick={() => {
                      closeHamburgerMenu();
                    }}
                    style={pathname === PROFILE_PATH ? { fontWeight: 600 } : {}}
                  >
                    Mi Perfil
                  </HBList>
                </Link>
                {loggedIn && (isAdmin || isDistributor) && (
                  <a>
                    <HBList
                      onClick={sendAdminTo}
                      style={
                        position == '/admin'
                          ? { fontWeight: 600, opacity: 1 }
                          : { fontWeight: '' }
                      }
                    >
                      admin
                    </HBList>
                  </a>
                )}
                <Link href='/trivias'>
                  <HBList
                    onClick={() => {
                      closeHamburgerMenu();
                    }}
                    style={pathname == '/trivias' ? { fontWeight: 600 } : {}}
                  >
                    Trivias
                  </HBList>
                </Link>
                <Link href={PLAN_PATH}>
                  <HBList
                    onClick={() => {
                      closeHamburgerMenu();
                    }}
                    style={pathname === PLAN_PATH ? { fontWeight: 600 } : {}}
                  >
                    Planes
                  </HBList>
                </Link>
                <Link href={PREVIEW_PATH}>
                  <HBList
                    onClick={() => {
                      closeHamburgerMenu();
                    }}
                    style={pathname === PREVIEW_PATH ? { fontWeight: 600 } : {}}
                  >
                    Cursos
                  </HBList>
                </Link>
                <a href='Https://gonvarnails.mx' target='_blank'>
                  <HBList
                    onClick={() => {
                      closeHamburgerMenu();
                    }}
                  >
                    Tienda
                  </HBList>
                </a>
                <Link href={BLOGS_PATH}>
                  <HBList
                    onClick={() => {
                      closeHamburgerMenu();
                    }}
                    style={pathname === BLOGS_PATH ? { fontWeight: 600 } : {}}
                  >
                    Blog
                  </HBList>
                </Link>
                <HBList
                  onClick={() => {
                    closeHamburgerMenu();
                    logoutFunc();
                  }}
                >
                  Cerrar Sesion
                </HBList>
              </HBMenu>
            </HamburgerContain>
          </>
        )}
      </NavResponsive>
    </NavContainer>
  );
};
export default NavBar;
