import styled, { css } from "styled-components";

export const NavContainer = styled("div")<{ pathname: any; color: any }>`
  z-index: 10;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #3f1168;
  padding-block: 10px;
  padding-inline: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  ${(props) =>
    props.pathname == "/" &&
    css`
      position: fixed;
      background-color: #dad3e5;
      box-shadow: none;
    `}
  ${(props) =>
    props.color == 1 &&
    css`
      background-color: #3f1168;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
    @media(max-width: 1023px) {
    background-color: #dad3e5;
    padding-block: 0;
    padding-inline: 0;
    // padding-top: 60px;
  }
`;
export const NavTags = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const Logo = styled.img`
  background-repeat: no-repeat;
  width: 130px;
  height: 70px;
  cursor: pointer;
`;
export const LogoContain = styled.div`
  display: flex;

  @media (max-width: 1023px) {
    display: none;
  }
`;
export const NavText = styled("a")<{ pathname: any; color: any }>`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  cursor: pointer;
  margin: 0;
  font-weight: 500;
  &:hover {
    color: white;
    opacity: 0.6;
    transition: 0.1s ease all;
  }

  @media (max-width: 1023px) {
    font-size: 16px;
  }
  ${(props) =>
    props.color == 0 &&
    props.pathname == "/" &&
    css`
      color: #3f1168;
      &:hover {
        color: #3f1168;
      }
    `}
`;

export const HamburgerMenu = styled.img`
  height: 37px;
`;

export const FloatingMenu = styled("ul")<{ isOpen: boolean }>`
  max-height: 0;
  padding: 0;
  transition: 0.05s linear;
  & li {
    display: none;
  }
  ${(props) =>
    props.isOpen &&
    css`
      max-height: 500%;
      & li {
        display: block;
      }
    `}
  list-style-type: none;
  margin: 0;
  position: absolute;
  background-color: #dad3e5;
  border-radius: 0 0 15% 15%;
  top: 50px;
`;

export const IngresarOptionsList = styled(FloatingMenu)<{ isOpen: boolean }>`
  width: 130px;
  ${(props) =>
    props.isOpen &&
    css`
      padding: 15px 0px 20px 0px;
    `}
`;

export const HamburgerMenuOptionsList = styled(FloatingMenu)<{
  isOpen: boolean;
}>`
  width: 100px;
  right: 3%;
  ${(props) =>
    props.isOpen &&
    css`
      padding: 15px 0px 20px 0px;
    `}
`;

export const FloatingMenuItem = styled.li`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;

  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
`;

export const ShopDeco = styled("div")<{ color: any }>`
  color: white;
  border: 1px solid #3f1168;
  border-radius: 100px;

  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  margin: 0;
  font-weight: 500;
  &:hover {
    color: white;
    opacity: 0.6;
    transition: 0.1s ease all;
  }

  @media (max-width: 1023px) {
    font-size: 16px;
  }
  ${(props) =>
    props.color == 1 &&
    css`
      color: white;

      border: 1px solid white;
      &:hover {
        color: white;
      }
    `}
`;
export const PurpleButton = styled.button`
  background-color: #942ced;
  color: #fff;
  padding-block: 15px;
  padding-inline: 25px;
  font-size: 12px;

  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  border-radius: 25px;
  border: none;
  &:hover {
    background-color: #3f1168;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    padding-block: 7.5px;
  }
  @media (max-width: 450px) {
    padding-block: 8px;
    padding-inline: 12px;
    font-size: 14px;
  }
`;
export const UserContain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const Level = styled.i`
  background-image: url(../images/Navbar/lvl.png);
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
export const UserImage = styled.i`
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  background-size: contain;
`;
export const LogoS = styled.i`
  background-size: contain;
  background-position: center;
  background-image: url(../images/Navbar/NavbarLogo.png);
  background-repeat: no-repeat;
  margin-left: 35px;
  cursor: pointer;
  width: 110px;
  height: 100%;
`;
export const LogoS_2 = styled.i`
  background-size: contain;
  background-position: center;

  margin-left: 35px;
  background-image: url(../images/Navbar/NavbarLogo.png);
  background-repeat: no-repeat;
  cursor: pointer;
  width: 110px;
  height: 100%;
`;
export const TextA = styled.a`
  color: #3f1168 !important;
  margin-right: 15px;
  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
`;
export const NavResponsive = styled.div`
  z-index: 10;
  display: none;
  align-items: center;
  width: 100%;
  padding-block: 10px;
  // padding-bottom: 25px;
  padding-right: 40px !important;
  padding-inline: 20px;
  justify-content: space-between;
  background-color: #dad3e5;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    display: flex;
  }
  @media (max-width: 450px) {
    // padding-block: 5px;
    padding-inline: 10px;
    // padding-bottom: 15px;
  }
  input.hamburger-checkbox {
    position: absolute;
    top: 1vh;
    right: 2vw;
    width: 12vw;
    opacity: 0;
    z-index: 15;
    height: 6vh;
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  #openmenu:checked ~ .menu-pane {
    transform: translateY(113%);
    @media (max-width: 1023px) {
      transform: translateY(127%);
    }
    @media (max-width: 550px) {
      transform: translateY(135%);
    }
    @media (min-width: 425px) {
      transform: translateY(125%);
    }
    @media (max-width: 350px) {
      transform: translateY(145%);
    }
  }
  #openmenu:checked ~ .hamburger-icon span:nth-of-type(2) {
    transform: rotate(45deg);
    background-color: #5000b5;
  }
  #openmenu:checked ~ .hamburger-icon span:nth-of-type(1) {
    transform: translate(0%, 220%) rotate(-45deg);
    background-color: #5000b5;
  }
  #openmenu:checked ~ .hamburger-icon span:nth-of-type(3) {
    opacity: 0;
  }
`;
export const HamburgerContain = styled.div<{ hamburger: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: white;
  padding-block: 20px;
  transition: 0.4s ease-in-out;
  padding-inline: 30px;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: -548px;
  left: 0;

  @media (max-width: 424px) {
    padding: 20px;
  }
  @media (max-width: 350px) {
    padding: 10px;
  }
  ${(props) =>
    props.hamburger &&
    css`
      top: 0;
    `}
`;
export const Close = styled.i`
  background-image: url(../images/Navbar/CloseIcon.png);
  background-repeat: no-repeat;
  width: 26px;
  height: 26px;
  cursor: pointer;
`;
export const MenuIcon = styled.i`
  width: 40px;
  height: 30px;
  cursor: pointer;
  span {
    height: 5px;
    width: 40px;
    background-color: #411369;
    display: block;
    border-radius: 5px;
    margin: 0px 0px 7px 0px;
    transition: 0.7s ease-in-out;
    transform: none;
  }
`;
export const Points = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  margin: 0;
  position: absolute;
  left: 60px;
`;
export const PointsContain = styled.div`
  display: flex;
  align-items: center;
  padding-right: 75px;
  position: relative;
`;
export const IconsContain = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
export const TagsResp = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1023px) {
    display: flex;
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 450px) {
    height: 37px;
  }
  a {
    color: black;
    text-decoration: none;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    margin: 0;
    &:hover {
      color: black;
      text-decoration: none;
    }
    &::active {
      font-weight: 600;
    }
  }
`;
export const HBMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  list-style: none;
  @media (max-width: 424px) {
    padding: 10px;
  }
  a {
    text-decoration: none;
  }
`;
export const HBList = styled.li`
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-family: "Montserrat", sans-seriff;
  padding-block: 20px;
  cursor: pointer;
  @media (max-width: 424px) {
    font-size: 16px;
  }
  @media (max-width: 350px) {
    font-size: 14px;
  }
  a {
    display: flex;
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
    font-weight: 600;
  }
`;
