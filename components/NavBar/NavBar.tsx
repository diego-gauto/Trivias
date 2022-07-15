import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { INavBar } from "./INavBar";
import { Level, Logo, NavContainer, NavTags, NavText, PurpleButton, UserContain, UserImage, UserText } from "./NavBar.styled";

const NavBar = () => {

  const router = useRouter();

  const { pathname } = location;

  const [route, setRoute] = useState("Landings");
  const [place, setPlace] = useState("fixed");
  const [logo, setLogo] = useState("/images/logo.png");
  const [colorBack, setColorBack] = useState("transparent");
  const [fontColor, setFontColor] = useState("white");

  const HomeNav = () => {
    setLogo("/images/logo.png");
    setColorBack("transparent");
    setFontColor("white");
    setPlace("fixed");
  }
  const LoginNav = () => {
    setLogo("/images/logo3.png");
    setColorBack("white");
    setFontColor("black");
    setPlace("unset");
  }
  const UserNav = () => {
    setLogo("/images/logo3.png");
    setColorBack("white");
    setFontColor("black");
    setRoute("Preview");
    setPlace("unset");
  }
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

  console.log(pathname);
  return (
    <NavContainer style={{ background: `${colorBack}`, position: `${place}` }}>

      <Link href="/Screens/Landings">
        <Logo src={`${logo}`} width={130} height={70} />
      </Link>
      <NavTags>
        <Link href={`/Screens/${route}`}>
          <NavText style={{ color: `${fontColor}` }}>
            Inicio
          </NavText>
        </Link>
        <NavText style={{ color: `${fontColor}` }}>
          Tienda
        </NavText>

        {
          pathname == '/Screens/Landings' ||
            pathname == '/auth/Login' ||
            pathname == '/auth/Register'
            ?
            <>
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
              <Link href="/Screens/Purchase">
                <NavText style={{ color: `${fontColor}` }}>
                  Comprar{" (Temp)"}
                </NavText>
              </Link>
              <Link href="/Screens/Lesson">
                <NavText style={{ color: `${fontColor}` }}>
                  Lesson{" (Temp)"}
                </NavText>
              </Link>
              <Link href="/Screens/Preview">
                <NavText style={{ color: `${fontColor}` }}>
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
            </>
            : <></>
        }

      </NavTags>
    </NavContainer >
  )
}
export default NavBar;

