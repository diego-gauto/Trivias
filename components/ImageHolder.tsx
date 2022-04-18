import Image from "next/image";
import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { parseCSS } from "../scripts/FunctionsBundle";

// ############################ INTERFACES & PROPS ################################

interface ImageHolderProps {
  className?: string;

  _debug?: boolean;

  _imageScr?: string | StaticImageData;
  _imageAlt?: string;
  _imageSize?: [string, string] | string;
  _imagePosition?: number;
  _imageStyle?: CSSProperties;
  _imageLayer?: "top" | "bottom";

  _canvasWidth?: string;
  _canvasHeight?: string;
  _canvasPosition?:
    | {
        top?: string;
        left?: string;
        bottom?: string;
        right?: string;
      }
    | "top"
    | "bottom"
    | "bottom-in"
    | "top-in";
  _canvasStyle?: CSSProperties;

  _wrapperStyle?: CSSProperties;
}

const ImageHolderDefaultProps: ImageHolderProps = {
  _debug: false,

  _canvasPosition: "bottom",
  _canvasWidth: "100%",
  _canvasHeight: "auto",

  _imagePosition: 7,
  _imageAlt: "Displayed Image",
  _imageSize: "auto",
  _imageScr: "https://picsum.photos/200/300",
  _imageLayer: "bottom",
};

// ################################ RENDERING COMPONENT ################################

const _ImageHolder: React.FunctionComponent<ImageHolderProps> = (props) => {
  return (
    <div className={props.className}>
      <div
        className={"imageholder-canvas"}
        onTouchStart={(e) => {
          e.preventDefault();
        }}
        style={{ ...props._canvasStyle }}
      >
        {props.children ? (
          props.children
        ) : typeof props._imageScr === "string" ? (
          <img
            className={"imageholder-image singleImage"}
            src={props._imageScr!}
            alt={props._imageAlt}
          />
        ) : (
          <div className={"imageholder-image"}>
            <Image
              className={"imageholder-image singleImage"}
              src={props._imageScr!}
              alt={props._imageAlt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ################################ STYLES ################################

const ImageHolderStyled = styled(_ImageHolder)`
  position: relative;
  pointer-events: none;

  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;

  * {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -o-user-select: none;
  }

  .imageholder-canvas {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: max-content;
    pointer-events: none;
    z-index: inherit;

    ${(props) => css`
      width: ${props._canvasWidth};
      height: ${props._canvasHeight};
      background: ${props._debug
        ? `repeating-linear-gradient(45deg, #606cbc2a, #606cbc2a 10px, #4652982a 10px, #4652982a 20px)`
        : ""};

      ${parseCSS(props._canvasStyle)}
    `}

    .imageholder-image {
      position: relative;
      pointer-events: none;

      z-index: inherit;

      ${(props) => css`
        width: ${typeof props._imageSize !== "string"
          ? props._imageSize![0]
          : props._imageSize} !important;
        height: ${typeof props._imageSize !== "string"
          ? props._imageSize![1]
          : props._imageSize} !important;
      `}

      span {
        display: block !important;
        position: relative !important;
        pointer-events: none !important;

        width: 100% !important;
        height: 100% !important;

        z-index: inherit !important;
      }

      &.singleImage {
        position: relative;
        pointer-events: none;

        z-index: inherit;

        ${(props) => css`
          width: ${typeof props._imageSize !== "string"
            ? props._imageSize![0]
            : props._imageSize} !important;
          height: ${typeof props._imageSize !== "string"
            ? props._imageSize![1]
            : props._imageSize} !important;

          ${parseCSS(props._imageStyle)}
        `}
      }
    }
  }

  ${(props) => css`
    z-index: ${props._imageLayer === "top" ? "5" : "-5"};

    ${parseCSS(props._wrapperStyle)}
  `}
`;

// ################################ FUNCTIONAL COMPONENT ################################

const ImageHolder: React.FunctionComponent<ImageHolderProps> = (props) => {
  var canvasPosition = {};
  var canvasDisplay = {};

  if (props._canvasPosition === "bottom-in") canvasPosition = { bottom: "0%" };
  else if (props._canvasPosition === "bottom") canvasPosition = { top: "100%" };
  else if (props._canvasPosition === "top") canvasPosition = { bottom: "100%" };
  else if (props._canvasPosition === "top-in") canvasPosition = { top: "0%" };
  else canvasPosition = { ...props._canvasPosition };

  if ([2, 5, 8].includes(props._imagePosition || 0))
    canvasDisplay = { justifyContent: "center" };
  else if ([3, 6, 9].includes(props._imagePosition || 0))
    canvasDisplay = { justifyContent: "flex-end" };
  else canvasDisplay = { justifyContent: "flex-start" };

  if ([4, 5, 6].includes(props._imagePosition || 0))
    canvasDisplay = { ...canvasDisplay, alignItems: "center" };
  else if ([1, 2, 3].includes(props._imagePosition || 0))
    canvasDisplay = { ...canvasDisplay, alignItems: "flex-end" };
  else canvasDisplay = { ...canvasDisplay, alignItems: "flex-start" };

  return (
    <ImageHolderStyled
      {...props}
      _canvasStyle={{
        ...canvasDisplay,
        ...canvasPosition,
        ...props._canvasStyle,
      }}
    >
      {props.children}
    </ImageHolderStyled>
  );
};

ImageHolder.defaultProps = ImageHolderDefaultProps;

// ################################ EXPORTS ################################

export default ImageHolder;
