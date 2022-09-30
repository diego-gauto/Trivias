

import { IWhiteButtonProps } from "./IWhiteButtonProps";
import { WhiteButtonContainer } from "./WhiteButton.styled";

export const WhiteButton = (props: IWhiteButtonProps) => {
  const { text, onClick } = props;

  return (
    <WhiteButtonContainer onClick={onClick}>
      {text}
    </WhiteButtonContainer>
  )
}
