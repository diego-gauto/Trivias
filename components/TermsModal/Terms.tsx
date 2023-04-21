import React from 'react'
import { Modal } from 'react-bootstrap';
import { ITerms } from './ITerms';
import { TermsContainer } from './Terms.styled';

const Terms = (props: ITerms) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <TermsContainer>

      </TermsContainer>
    </Modal>
  )
}
export default Terms;