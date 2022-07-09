import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { AddText, ButtonsDiv, Container, CouponContain, CouponText, DiscountText, InputInfo, ModalContain, ModalInput, PurpleButton, Title, TransparentButton } from './ModalPurchase1.styled';
import ModalPurchase2 from './ModalPurchase2';

export const ModalPurchase1 = ({ show, setShow }: any) => {

  const [show2, setShow2] = useState(false)

  const handleClose = () => setShow(false);

  return (
    <ModalContain>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Canjea un cupón
          </Title>
          <CouponContain>
            <CouponText>
              Gonvair Verano 2022
            </CouponText>
            <DiscountText>
              40% descuento
            </DiscountText>
          </CouponContain>
          <InputInfo>
            <AddText>
              Código del Cupón
            </AddText>
            <ModalInput placeholder="GON22VER" />
          </InputInfo>
          <ButtonsDiv>
            <TransparentButton onClick={handleClose}>
              Cancelar
            </TransparentButton>
            <PurpleButton onClick={() => { setShow2(true); setShow(false) }}>
              Canjear
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>
      <ModalPurchase2 show={show2} setShow={setShow2} setShow1={setShow} />
    </ModalContain>
  )
}
export default ModalPurchase1;