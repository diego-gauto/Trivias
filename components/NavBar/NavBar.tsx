import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  Close, HamburgerContain, HBList, HBMenu,
  IconsContain, Logo, LogoContain,
  LogoS, MenuIcon, NavContainer, NavResponsive,
  NavTags, NavText, Points, PointsContain, PurpleButton,
  TagsResp, UserContain, UserImage
} from './NavBar.styled';
import { DEFAULT_USER_IMG } from "../../constants/paths";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import UserLevel from '../../containers/Profile/Rewards/UserLevel/UserLevel';
import RespLevel from '../../containers/Profile/Rewards/UserLevel/RespLevel';

const NavBar = () => {


  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hamburger, setHamburger] = useState(false);

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
  // COLOR NAVBAR
  const [color, setColor] = useState<any>(0)
  const router = useRouter();
  let { pathname }: any = router;

  const ChangeNav = () => {
    if (['/', ''].includes(pathname) && window.scrollY >= 700) {
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
    [],
  );
  // COLOR NAVBAR
  return (
    <NavContainer pathname={pathname} color={color}>
      <LogoContain>
        {
          pathname == "/" ?
            <>
              {
                color == 1 &&
                <Link href="/">
                  <Logo src="/images/logo3.png" width={130} height={70} />
                </Link>
              }
              {
                color == 0 &&
                <Link href="/">
                  <Logo src="/images/logo.png" width={130} height={70} />
                </Link>
              }
            </>
            :
            <Link href="/">
              <Logo src="/images/logo3.png" width={130} height={70} />
            </Link>
        }
      </LogoContain>
      <NavTags>
        {
          loggedIn ?
            <Link href="/Preview">
              <NavText pathname={pathname} color={color}>
                Inicio
              </NavText>
            </Link>
            : !loggedIn ?
              <Link href="/">
                <NavText pathname={pathname} color={color}>
                  Inicio
                </NavText>
              </Link>
              : <></>
        }
        <NavText pathname={pathname} color={color} target="_blank" href="Https://gonvarnails.mx">
          Tienda
        </NavText>
        {
          (loggedIn && isAdmin) &&
          <Link href="/admin/General">
            <NavText pathname={pathname} color={color}>
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
                <NavText pathname={pathname} color={color}>
                  {userData ? userData.name : "Bienvenido"}
                </NavText>
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
          </>
        }
        {!loggedIn &&
          <>
            <Link href="/auth/Login">
              <NavText pathname={pathname} color={color}>
                Iniciar Sesión
              </NavText>
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
              <Link href="/auth/Login">
                <a>
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
                    <a href="Https://gonvarnails.mx" target="_blank">
                      <HBList onClick={() => { setHamburger(false) }}>
                        Tienda
                      </HBList>
                    </a>
                    <Link href="/Preview">
                      <HBList onClick={() => { setHamburger(false) }}>
                        Catálogo
                      </HBList>
                    </Link>
                    <Link href="/Profile">
                      <HBList onClick={() => { setHamburger(false) }}>

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
                      <HBList onClick={() => { setHamburger(false) }}>
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