

import { IPurpleButtonProps } from "./IPurpleButtonProps";
import { PurpleButtonContainer } from "./PurpleButton.styled";

export const PurpleButton = (props: IPurpleButtonProps) => {
  const { text, onClick } = props;

  return (
    <PurpleButtonContainer onClick={onClick}>
      {text}
    </PurpleButtonContainer>
  )
}
