import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { parseCSS } from "../scripts/FunctionsBundle";

// ############################ INTERFACES & PROPS ################################

interface ThemeButtonProps {
  className?: string;

  _href?: string;
  _type?: "Primary" | "Secondary" | "Tertiary";

  _style?: CSSProperties;
}

const ThemeButtonDefaultProps: ThemeButtonProps = {
  _href: "/",
  _type: "Primary",
};

// ################################ RENDERING COMPONENT ################################

const _ThemeButton: React.FunctionComponent<ThemeButtonProps> = (props) => {
  return (
    <a className={props.className} href={props._href}>
      {props.children}
    </a>
  );
};

// ################################ STYLES ################################

const ThemeButtonStyled = styled(_ThemeButton)`
  text-align: center;
  border-radius: 100px;
  background-color: transparent;
  border: none;
  color: white;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 25px;
  box-shadow: none;

  white-space: pre-wrap;

  text-decoration: none;
  cursor: pointer;

  ${(props) => css`
    ${parseCSS(props._style)}
  `}
`;

// ################################ FUNCTIONAL COMPONENT ################################

const ThemeButton: React.FunctionComponent<ThemeButtonProps> = (props) => {
  var themeStyle: CSSProperties;

  if (props._type === "Primary") {
    themeStyle = {
      backgroundColor: "#6717cd",
    };
  } else if (props._type === "Secondary") {
    themeStyle = {
      border: "1px solid #ffffff",
    };
  } else {
    themeStyle = {
      // boxShadow: "0px 0px 10px 5px rgba(103, 23, 205, 0.25);",
    };
  }

  return (
    <>
      <ThemeButtonStyled
        {...props}
        _style={{
          ...themeStyle,
          ...props._style,
        }}
      >
        {props.children}
      </ThemeButtonStyled>
    </>
  );
};

ThemeButton.defaultProps = ThemeButtonDefaultProps;

// ################################ EXPORTS ################################

export default ThemeButton;
