import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Level, Logo, LogoS, MenuIcon, NavContainer, NavHome, NavResponsive, NavTags, NavTags2, NavText, Points, PointsContain, PurpleButton, UserContain, UserImage, UserText } from "./NavBar.styled";
import Scroll from "./scroll";

const NavBar = () => {


  // Nav Change Color
  const [color, setColor] = useState(false)
  useEffect(() => {
    if (color == true)
      return HomeNav2()
    else (color == false)
    return HomeNav()
  }, [color])

  const [route, setRoute] = useState("Landings");
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
    setRoute("Landings");
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
    if (pathname == '/Screens/Landings') return HomeNav();
    if (pathname == '/auth/Login' || pathname == '/auth/Register') return LoginNav();
    if (pathname == '/Screens/Profile' ||
      pathname == '/Screens/Rewards' ||
      pathname == '/Screens/Purchase' ||
      pathname == '/Screens/Lesson' ||
      pathname == '/Screens/Preview'
    ) return UserNav();

  }, [pathname])
  return (

    <>
      {
        pathname == '/Screens/Landings'
          ?
          <>
            <NavHome style={{ background: `${colorBack}`, boxShadow: `${shadow}` }}>
              <Scroll color={color} setColor={setColor} pathname={pathname} />
              <Link href="/Screens/Landings">
                <Logo src={`${logo}`} width={130} height={70} />
              </Link>
              <NavTags>
                <Link href="/Screens/Landings">
                  <NavText style={{ color: `${fontColor}` }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: `${fontColor}` }}>
                  Tienda
                </NavText>
                <Link href="/Screens/Profile">
                  <NavText style={{ color: `${fontColor}` }}>
                    Perfil Usuario{" (Temp)"}
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
              <Link href="/Screens/Landings">
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
      {
        pathname == '/auth/Login' ||
          pathname == '/auth/Register'
          ?
          <>
            <NavContainer style={{ background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
              <Link href="/Screens/Landings">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags>
                <Link href={`/Screens/${route}`}>
                  <NavText style={{ color: 'black' }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: 'black' }}>
                  Tienda
                </NavText>
                <Link href="/Screens/Profile">
                  <NavText style={{ color: 'black' }}>
                    Perfil Usuario{" (Temp)"}
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
              <Link href="/Screens/Landings">
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
      {
        pathname == '/Screens/Profile' ||
          pathname == '/Screens/Rewards' ||
          pathname == '/Screens/Purchase' ||
          pathname == '/Screens/Lesson' ||
          pathname == '/Screens/Preview'
          ?
          <>
            <NavContainer style={{ background: 'white', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
              <Link href="/Screens/Landings">
                <Logo src="/images/logo3.png" width={130} height={70} />
              </Link>
              <NavTags>
                <Link href={`/Screens/${route}`}>
                  <NavText style={{ color: 'black' }}>
                    Inicio
                  </NavText>
                </Link>
                <NavText style={{ color: 'black' }}>
                  Tienda
                </NavText>

                <Link href="/Screens/Purchase">
                  <NavText style={{ color: 'black' }}>
                    Comprar{" (Temp)"}
                  </NavText>
                </Link>
                <Link href="/Screens/Lesson">
                  <NavText style={{ color: 'black' }}>
                    Lesson{" (Temp)"}
                  </NavText>
                </Link>
                <Link href="/Screens/Preview">
                  <NavText style={{ color: 'black' }}>
                    Cátalogo
                  </NavText>
                </Link>
                <UserContain>
                  <Level />
                  <Link href="/Screens/Profile">
                    <UserText>
                      Mofupiyo
                    </UserText>
                  </Link>
                  < UserImage />
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
              <MenuIcon />
            </NavResponsive>
          </>

          : <></>
      }
    </>

  )
}
export default NavBar;

