

import { IWhiteButtonProps } from "./IWhiteButtonProps";
import { WhiteButtonContainer } from "./WhiteButton.styled";

export const WhiteButton = (props: IWhiteButtonProps) => {
  const { text, onClick } = props;

  return (
    <WhiteButtonContainer>
      {text}
    </WhiteButtonContainer>
  )
}
