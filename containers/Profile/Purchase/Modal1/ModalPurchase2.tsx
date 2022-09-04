import React from 'react'
import { Modal } from 'react-bootstrap';
import { ButtonsDiv2, Container, CouponContain, CouponText, DiscountApproved, DiscountText, ModalContain, PurpleButton, Title } from './ModalPurchase1.styled';

export const ModalPurchase2 = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);

  return (
    <ModalContain>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Canjea un cupón
          </Title>
          {/* <CouponContain>
            <CouponText>
              Gonvair Verano 2022
            </CouponText>
            <DiscountText>
              40% descuento
            </DiscountText>
          </CouponContain> */}
          <DiscountApproved>
            ¡Cupón canjeado!
          </DiscountApproved>
          <ButtonsDiv2>
            <PurpleButton onClick={handleClose}>
              Regresar
            </PurpleButton>
          </ButtonsDiv2>
        </Container>
      </Modal>
    </ModalContain>
  )
}
export default ModalPurchase2;