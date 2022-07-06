import Link from "next/link";
import { INavBar } from "./INavBar";
import { Logo, NavContainer, NavTags, NavText, PurpleButton } from "./NavBar.styled";

const NavBar = () => {

  return (
    <NavContainer>
      <Logo src="/images/logo.png" width={130} height={70} />
      <NavTags>
        <Link href="/home">
          <NavText>
            Inicio
          </NavText>
        </Link>
        <Link href="/profile">
          <NavText>
            Tienda
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
