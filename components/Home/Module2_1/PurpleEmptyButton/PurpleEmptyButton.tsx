import { IPurpleEmptyButtonProps } from './IPurpleEmptyButtonProps';
import {
  PurpleEmptyButtonContainer,
  Text1,
} from './PurpleEmptyButtonContainer.styled';

export const PurpleEmptyButton = (props: IPurpleEmptyButtonProps) => {
  const { text, onClick } = props;

  return (
    <PurpleEmptyButtonContainer onClick={onClick}>
      <Text1> {text}</Text1>
    </PurpleEmptyButtonContainer>
  );
};
