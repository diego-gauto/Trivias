import { IPurpleModule2ButtonProps } from './IPurpleModule2ButtonProps';
import {
  PurpleModule2ButtonContainer,
  Text2,
  Text1,
} from './PurpleModule2ButtonContainer.styled';

export const PurpleModule2Button = (props: IPurpleModule2ButtonProps) => {
  const { n1text, b1text, onClick } = props;

  return (
    <PurpleModule2ButtonContainer onClick={onClick}>
      <div>
        <Text1>{b1text}</Text1>
        <Text2>{n1text}</Text2>
      </div>
    </PurpleModule2ButtonContainer>
  );
};
