import Link from 'next/link';

import {
  Container,
  ButtonContainer,
  OptionText,
  SelectorTriviasButton,
} from './selectorTrivias.styled';

const SelectorTrivias = () => {
  return (
    <Container>
      <ButtonContainer>
        <Link href='/admin/trivias/trivias'>
          <SelectorTriviasButton>Admin Trivias</SelectorTriviasButton>
        </Link>
        <OptionText>Creación y edición de trivias</OptionText>
      </ButtonContainer>
      <ButtonContainer>
        <Link href='/admin/trivias/users'>
          <SelectorTriviasButton>Listados de usuarios</SelectorTriviasButton>
        </Link>
        <OptionText>
          Listados de usuarios que hayan jugado a las trivias
        </OptionText>
      </ButtonContainer>
    </Container>
  );
};
export default SelectorTrivias;