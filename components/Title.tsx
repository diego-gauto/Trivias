import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import {
  parseCSS,
  styleText,
  styleTextOptions,
} from "../scripts/FunctionsBundle";

// ############################ INTERFACES & PROPS ################################

interface TitleProps {
  className?: string;

  _head?: string;
  _headStyle?: CSSProperties;
  _headStyleText?: styleTextOptions;

  _body?: string;
  _bodyStyle?: CSSProperties;
  _bodyStyleText?: styleTextOptions;

  _marginTopBody?: string;
  _marginBottomBody?: string;

  _style?: CSSProperties;
}

const TitleDefaultProps: TitleProps = {
  _head: "",
  _body: "",

  _marginTopBody: "20px",
  _marginBottomBody: "0px",
};

// ################################ RENDERING COMPONENT ################################

const _Title: React.FunctionComponent<TitleProps> = (props) => {
  return (
    <div className={props.className}>
      <h1 className={"title-head"}>
        {styleText({ ...props._headStyleText, _text: props._head })}
      </h1>
      <p className={"title-body"}>
        {styleText({ ...props._bodyStyleText, _text: props._body })}
      </p>
      {props.children}
    </div>
  );
};

// ################################ STYLES ################################

const TitleStyled = styled(_Title)`
  .title-head {
    font-family: "Montserrat";
    font-style: normal;
    font-size: 48px;
    line-height: 150%;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    white-space: pre-wrap;

    ${(props) => css`
      ${parseCSS(props._headStyle)}
    `}
  }

  .title-body {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    color: #ffffff;

    white-space: pre-wrap; // Preserva el texto tal cual, pero permite ajustarlo rompiendo palabras

    ${(props) => css`
      margin-bottom: ${props._marginBottomBody};
      margin-top: ${props._marginTopBody};

      ${parseCSS(props._bodyStyle)}
    `}
  }

  ${(props) => css`
    ${parseCSS(props._style)}
  `}
`;

// ################################ FUNCTIONAL COMPONENT ################################

const Title: React.FunctionComponent<TitleProps> = (props) => {
  return (
    <>
      <TitleStyled {...props} />
    </>
  );
};

Title.defaultProps = TitleDefaultProps;

// ################################ EXPORTS ################################

export default Title;
