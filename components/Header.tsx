import React, { useEffect, useState } from "react";
import ThemeButton from "./ThemeButton";
import styled, { css } from "styled-components";
import ImageProvider from "../scripts/ImageProvider";
import Image from "next/image";

// ############################ INTERFACES & PROPS ################################

interface HeaderProps {
  className?: string;
  _transition?: boolean;
}

const HeaderDefaultProps: HeaderProps = {
  _transition: false,
};

// ################################ RENDERING COMPONENT ################################

const _Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <nav className={props.className}>
      <a href="/" className={"header-logo-container"}>
        <Image
          className={"header-logo"}
          src={ImageProvider.icon.gonvar_logo_white}
        />
      </a>

      <div className={"header-link-container"}>
        <a className={"header-link"} href="/">
          Inicio
        </a>
        <a className={"header-link"} href="/">
          Tienda
        </a>
        <a className={"header-link"} href="/login">
          Iniciar Sesión
        </a>
        <ThemeButton _href="/">Subscribirse Ya</ThemeButton>
      </div>
    </nav>
  );
};

// ################################ STYLES ################################

const HeaderStyled = styled(_Header)`
  display: flex;
  align-items: center;
  background-color: white;
  min-height: 85px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all ease-in-out 0.4s;
  position: fixed;
  z-index: 100;
  width: 100%;

  --brightness: ${(props) => (props._transition ? "0%" : "100%")};

  .header-link-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    margin-right: 19px;

    .header-link {
      margin: 0px 20px;
      text-decoration: none;
      cursor: pointer;
      font-family: "Montserrat";
      font-size: 18px;
      line-height: 150%;
      font-weight: 500;
      color: black;
    }
  }

  .header-logo-container {
    margin: 0px 20px;
    display: flex;

    .header-logo {
      transition: all ease-in-out 0.4s;
      filter: brightness(var(--brightness));
    }
  }

  ${(props) =>
    !props._transition &&
    css`
      background-color: transparent;
      box-shadow: none;
      padding-top: 16px;
    `}
`;

// ################################ FUNCTIONAL COMPONENT ################################

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const [scrolled, setScrolled] = useState(false);

  const changeScroll = () => {
    if (window.scrollY > 100) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", changeScroll);
  }, []);

  return (
    <>
      <HeaderStyled {...props} _transition={scrolled}>
        {props.children}
      </HeaderStyled>
    </>
  );
};

Header.defaultProps = HeaderDefaultProps;

// ################################ EXPORTS ################################

export default Header;
