import { CSSProperties, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { parseCSS } from "../scripts/FunctionsBundle";
import { Gradient } from "../scripts/StripeGradient";

// ############################ INTERFACES & PROPS ################################

interface StripeGradientProps {
  className?: string;

  _style?: CSSProperties;
}

const StripeGradientDefaultProps: StripeGradientProps = {};

// ################################ RENDERING COMPONENT ################################

const _StripeGradient: React.FunctionComponent<StripeGradientProps> = (
  props
) => {
  const [gradient, _] = useState(new Gradient());

  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, [gradient]);

  return (
    <canvas
      id={"gradient-canvas"}
      data-transition-in
      className={props.className}
    />
  );
};

// ################################ STYLES ################################

const StripeGradientStyled = styled(_StripeGradient)`
  height: 100%;
  width: 100%;
  z-index: -10;

  ${(props) => css`
    ${parseCSS(props._style)}
  `}
`;

// ################################ FUNCTIONAL COMPONENT ################################

const StripeGradient: React.FunctionComponent<StripeGradientProps> = (
  props
) => {
  return (
    <>
      <StripeGradientStyled {...props} />
    </>
  );
};

StripeGradient.defaultProps = StripeGradientDefaultProps;

// ################################ EXPORTS ################################

export default StripeGradient;
