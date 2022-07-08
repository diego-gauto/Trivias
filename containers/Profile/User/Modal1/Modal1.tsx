import Image from 'next/image';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { AddText, BottomInputs, ButtonDiv, CardText, InputInfo, Inputs, ModalCont, ModalContain, ModalForm, ModalInput, ModalPay, ModalPayment, PaymentIcon, PaymentMethod, PurpleButton, Title } from './Modal1.styled';

const Modal1 = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);

  return (
    <>
      <ModalContain>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <ModalCont>
            <Title closeButton>
              Ingresar Nuevo Método de Pago
            </Title>
            <ModalPay>
              <ModalPayment>
                <PaymentMethod>
                  <PaymentIcon>
                    <Image src="/images/McPay.png" width={90} height={60} />
                    <Image src="/images/VisaPay.png" width={90} height={60} />
                  </PaymentIcon>
                  <CardText>
                    Tarjeta de Crédito/Débito
                  </CardText>
                </PaymentMethod>
                <PaymentMethod>
                  <Image src="/images/PaypalPay.png" width={90} height={60} />
                  <CardText>
                    Cuenta de Paypal
                  </CardText>
                </PaymentMethod>
              </ModalPayment>
              <ModalForm>
                <Inputs>
                  <InputInfo>
                    <AddText>
                      Número de la Tarjeta
                    </AddText>
                    <ModalInput placeholder="XXXX XXXX XXXX XXXX" />
                  </InputInfo>
                  <InputInfo>
                    <AddText>
                      Nombre
                    </AddText>
                    <ModalInput placeholder="Nombre del propietario" />
                  </InputInfo>
                  <BottomInputs>
                    <InputInfo>
                      <AddText>
                        Fecha de Expiración
                      </AddText>
                      <ModalInput placeholder="MM-YYYY" />
                    </InputInfo>
                    <InputInfo>
                      <AddText>
                        CVV
                      </AddText>
                      <ModalInput placeholder="XXX" />
                    </InputInfo>
                  </BottomInputs>
                </Inputs>
              </ModalForm>
            </ModalPay>
            <ButtonDiv>
              <PurpleButton>
                Agregar Método
              </PurpleButton>
            </ButtonDiv>
          </ModalCont>
        </Modal>
      </ModalContain>
    </>
  )
}
export default Modal1;