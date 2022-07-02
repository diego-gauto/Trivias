import { Link } from "react-router-dom";
import { INavBar } from "./INavBar";
import { Logo, NavContainer, NavTags, NavText, PurpleButton } from "./NavBar.styled";

export const NavBar = (props: INavBar) => {
  const { title } = props;
  return (
    <NavContainer>
      <Logo />
      <NavTags>
        <Link to="/">
          <NavText>
            Inicio
          </NavText>
        </Link>
        <NavText>
          Tienda
        </NavText>
        <Link to="/login">
          <NavText>
            Iniciar Sesión
          </NavText>
        </Link>
        <Link to="/register">
          <PurpleButton>
            Suscribirse Ya
          </PurpleButton>
        </Link>

      </NavTags>
    </NavContainer>

  )
}
