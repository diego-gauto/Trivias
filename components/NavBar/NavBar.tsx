import Link from "next/link";
import { INavBar } from "./INavBar";
import { Logo, NavContainer, NavTags, NavText, PurpleButton } from "./NavBar.styled";

const NavBar = () => {

  return (
    <NavContainer>
      <Logo src="/images/logo.png" width={130} height={70} />
      <NavTags>
        <Link href="/Screens/Landings">
          <NavText>
            Inicio
          </NavText>
        </Link>
        <Link href="/Screens/Profile">
          <NavText>
            Perfil Usuario{" (Temp)"}
          </NavText>
        </Link>
        <Link href="/Screens/Purchase">
          <NavText>
            Comprar{" (Temp)"}
          </NavText>
        </Link>
        <Link href="/Screens/Lesson">
          <NavText>
            Lesson{" (Temp)"}
          </NavText>
        </Link>
        <Link href="/Screens/Preview">
          <NavText>
            Preview{" (Temp)"}
          </NavText>
        </Link>
        <Link href="/auth/Login">
          <NavText>
            Iniciar Sesión
          </NavText>
        </Link>
        <Link href="/auth/Register">
          <PurpleButton>
            Suscribirse Ya
          </PurpleButton>
        </Link>
      </NavTags>
    </NavContainer>
  )
}
export default NavBar;
