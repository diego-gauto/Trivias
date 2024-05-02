import { useMediaQuery } from 'react-responsive';
import { IWhiteButtonProps } from './IWhiteButtonProps';
import { WhiteButtonContainer } from './WhiteButton.styled';

export const WhiteButton = (props: IWhiteButtonProps) => {
  const { text, onClick } = props;
  return (
    <WhiteButtonContainer id='white-btn' onClick={onClick}>
      {text}
    </WhiteButtonContainer>
  );
};
