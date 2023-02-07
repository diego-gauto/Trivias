import styled, { css } from "styled-components";

export const NavContainer = styled("div")<{ pathname: any; color: any }>`
  z-index: 10;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #dad3e5;
  padding-block: 5px;
  padding-inline: 70px;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
    padding-block: 10px;
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
  padding-left: 0;
  cursor: pointer;
  @media (max-width: 1023px) {
    padding-left: 70px;
  }
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
  font-size: 16px;
  font-family: "MONTSERRAT-BOLD" !important;
  position: relative;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  cursor: pointer;
  margin: 0;
  font-weight: 600;
  &:hover {
    color: white;
    opacity: 0.6;
    transition: 0.1s ease all;
  }

  @media (max-width: 1023px) {
    font-size: 14px;
  }
  ${(props) =>
    props.pathname !== "/" &&
    css`
      color: #3f1168;
      &:hover {
        color: #3f1168;
        opacity: 0.6;
      }
    `}
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
  top: 65px;
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
export const UserContain = styled.div<{ pathname: any; color: any }>`
  display: flex;
  align-items: center;
  gap: 40px;
  @media (max-width: 1023px) {
    gap: 30px;
  }
  @media (max-width: 400px) {
    gap: 20px;
  }
  .bell-contain {
    position: relative;
    cursor: pointer;
    &:hover {
      .hover-text {
        opacity: 1;
        transition: 0.2s ease all;
      }
    }
    .bell {
      font-size: 26px;
      color: #3f1168;
      ${(props) =>
        props.color == 1 &&
        css`
          color: #dad3e5;
          @media (max-width: 1023px) {
            color: #3f1168;
          }
        `}
    }
    .notifications {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background-color: #e21047;
      position: absolute;
      top: -3px;
      right: 2px;
    }
  }
  .rewards-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    &:hover {
      .hover-text {
        opacity: 1;
        transition: 0.2s ease all;
      }
    }
    background: linear-gradient(59deg, #9a2fea 10%, #d244d1 40%, #fd8608 100%);
    cursor: pointer;
    .inside {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      position: absolute;
      background-color: #dad3e5;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      ${(props) =>
        props.color == 1 &&
        css`
          background-color: #3f1168;
          @media (max-width: 1023px) {
            background-color: #dad3e5;
          }
        `}
    }
  }
`;
export const HoverText = styled.p`
  font-size: 12px;
  position: absolute;
  border-radius: 100px;
  padding-block: 5px;
  padding-inline: 10px;
  font-style: normal;
  top: 40px;
  right: 50%;
  font-weight: 600;
  color: #3f1168;
  transform: translateX(50%);
  margin: 0;
  background-color: #dad3e5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  opacity: 0;
`;
export const Level = styled.i`
  background-image: url(../images/Navbar/lvl.png);
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
export const UserImage = styled.div`
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  cursor: pointer;
  border-radius: 50%;
  background-size: cover;
  position: relative;
  &:hover {
    .hover-text {
      opacity: 1;
      transition: 0.2s ease all;
    }
  }
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
  @media (max-width: 600px) {
    margin-left: 0;
  }
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
    padding-right: 20px !important;
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
  background-color: #d244d1;
  transition: 0.4s ease-in-out;
  position: absolute;
  border-radius: 0 0 30px 30px;
  z-index: 2;
  top: 75px;
  right: 0;
  height: 0;
  pointer-events: none;
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.4);
  .menu-hamburger {
    opacity: 0;
  }
  @media (max-width: 424px) {
    border-radius: 0 0 20px 20px;
  }
  @media (max-width: 350px) {
  }
  ${(props) =>
    props.hamburger &&
    css`
      pointer-events: auto;
      height: 136px;
      .menu-hamburger {
        transition: 0.5s ease-in-out;
        opacity: 1;
      }
      @media (max-width: 424px) {
        height: 110px;
      }
      @media (max-width: 350px) {
        height: 95px;
      }
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
  margin: 0;
  @media (max-width: 424px) {
    padding: 10px;
  }
  a {
    text-decoration: none;
  }
`;
export const HBList = styled.li`
  color: white;
  cursor: pointer;
  gap: 10px;
  font-size: 16px;
  font-family: "Montserrat", sans-seriff;
  @media (max-width: 424px) {
    font-size: 14px;
  }
  @media (max-width: 350px) {
    font-size: 12px;
  }
  a {
    display: flex;
    text-decoration: none;
  }
`;
