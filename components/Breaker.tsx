import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { parseCSS } from "../scripts/FunctionsBundle";

// ############################ INTERFACES & PROPS ################################

interface BreakerProps {
  className?: string;

  _size?: string;
  _style?: CSSProperties;
}

const BreakerDefaultProps: BreakerProps = {
  _size: "64px",
};

// ################################ RENDERING COMPONENT ################################

const _Breaker: React.FunctionComponent<BreakerProps> = (props) => {
  return <div className={props.className} />;
};

// ################################ STYLES ################################

const BreakerStyled = styled(_Breaker)`
  position: relative;
  flex: none;

  ${(props) => css`
    height: ${props._size};

    ${parseCSS(props._style)}
  `}
`;

// ################################ FUNCTIONAL COMPONENT ################################

const Breaker: React.FunctionComponent<BreakerProps> = (props) => {
  return (
    <>
      <BreakerStyled {...props} />
    </>
  );
};

Breaker.defaultProps = BreakerDefaultProps;

// ################################ EXPORTS ################################

export default Breaker;
