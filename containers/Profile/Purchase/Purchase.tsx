import Image from 'next/image';
import React, { useState } from 'react'
import ModalPurchase1 from './Modal1/ModalPurchase1';
import {
  AlertIcon, BotContainer, ButtonContain, CirclePosition, Container, ContainerCard,
  ContainTitle, CourseInfo, DataPayment, DataPaymentContain, Divider,
  Division, Division2, InfoCard, Input, InputContain, InputText, MasterCard,
  NewMethod, NewMethodBox, NewMethodContain, PastCircle, PastText, PayBox, PaymentContain,
  PaymentMethod, PayPal, PaypalIcon, PayText, PayText2, ProcessCircle,
  ProcessText, PurchaseContain, PurchaseData,
  PurchaseText, PurpleButton, SubContainer, SubContainer2, Text, Text2, Text3,
  TextPosition,
  Title, TransparentButton, VisaIcon, VisaIconResp, VisaPay
} from './Purchase.styled';
import PurchaseComplete from './PurchaseComplete';
import PurchaseDetails from './PurchaseDetails';

const Purchase = () => {

  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState(true);
  const [cardInfo, setCardInfo] = useState(false);
  const [process, setProcess] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [pay, setPay] = useState(false);


  const handleConfirm = () => {
    setProcess(false);
    setConfirmation(true);
  }
  const Return = () => {
    setProcess(true);
    setConfirmation(false);
  }
  const FinishPayment = () => {
    setConfirmation(false);
    setPay(true);
  }

  const handleShow = () => setShow(true);
  return (
    <Container>
      <Title>
        Proceso de Pago
      </Title>
      <PayBox>
        <DataPayment>
          {
            process == true
              ? <>
                <DataPaymentContain>
                  <CirclePosition />
                  <TextPosition>
                    Datos de pago
                  </TextPosition>
                </DataPaymentContain>
                <Division />
                <DataPaymentContain>
                  <ProcessCircle />
                  <ProcessText>
                    Confirmacion
                  </ProcessText>
                </DataPaymentContain>
                <Division />
                <DataPaymentContain>
                  <ProcessCircle />
                  <ProcessText>
                    Compra exitosa
                  </ProcessText>
                </DataPaymentContain>
              </>
              : confirmation == true ?
                <>
                  <DataPaymentContain>
                    <PastCircle />
                    <PastText>
                      Datos de pago
                    </PastText>
                  </DataPaymentContain>
                  <Division2 />
                  <DataPaymentContain>
                    <CirclePosition />
                    <TextPosition>
                      Confirmacion
                    </TextPosition>
                  </DataPaymentContain>
                  <Division />
                  <DataPaymentContain>
                    <ProcessCircle />
                    <ProcessText>
                      Compra exitosa
                    </ProcessText>
                  </DataPaymentContain>
                </>
                : pay == true ?
                  <>
                    <DataPaymentContain>
                      <PastCircle />
                      <PastText>
                        Datos de pago
                      </PastText>
                    </DataPaymentContain>
                    <Division2 />
                    <DataPaymentContain>
                      <PastCircle />
                      <PastText>
                        Confirmacion
                      </PastText>
                    </DataPaymentContain>
                    <Division2 />
                    <DataPaymentContain>
                      <CirclePosition />
                      <TextPosition>
                        Compra exitosa
                      </TextPosition>
                    </DataPaymentContain>
                  </>
                  : <></>
          }

        </DataPayment>
        <SubContainer>
          {
            process == true &&
            <>
              <SubContainer2>
                <PaymentContain onClick={() => {
                  setPayment(true),
                    setCardInfo(false);
                }}>
                  <ContainTitle style={{ cursor: 'pointer' }}>
                    Métodos en tu cuenta
                  </ContainTitle>
                  {
                    payment === true &&
                    <>
                      <PaymentMethod>
                        <VisaIcon />
                        <PayText>
                          Visa terminada en 1486
                        </PayText>
                      </PaymentMethod>
                      <PaymentMethod>
                        <VisaIcon />
                        <PayText>
                          Visa terminada en 3990
                        </PayText>
                      </PaymentMethod>
                    </>
                  }
                </PaymentContain>
                <ContainTitle>
                  Nuevo Método de Pago
                </ContainTitle>

                <NewMethodBox onClick={() => {
                  setPayment(false),
                    setCardInfo(true);
                }}>
                  <NewMethodContain>
                    <MasterCard />
                    <VisaPay />
                  </NewMethodContain>
                  <PayText2>
                    Tarjeta de Crédito / Débito
                  </PayText2>
                </NewMethodBox>

                {
                  cardInfo == true &&
                  <ContainerCard>
                    <InputText>
                      Número de la Tarjeta
                      <Input placeholder="XXXX XXXX XXXX XXXX" />
                    </InputText>
                    <InputText>
                      Nombre
                      <Input placeholder="Nombre del Propietario" />
                    </InputText>
                    <InputContain>
                      <InputText>
                        Fecha de Expiración
                        <Input placeholder="MM-YYYY" />
                      </InputText>
                      <InputText>
                        CVV
                        <Input placeholder="XXX" />
                      </InputText>
                    </InputContain>
                    <BotContainer>
                      <Text>
                        <AlertIcon />
                        ¿Cómo protegemos tu compra?
                      </Text>
                      <Text2>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Felis, velit velit, mattis scelerisque diam
                        scelerisque vitae.
                      </Text2>
                    </BotContainer>
                  </ContainerCard>
                }
                <ButtonContain >
                  <TransparentButton onClick={handleShow}>
                    Agregar Cupón
                  </TransparentButton>
                  <PurpleButton onClick={handleConfirm}>
                    Continuar
                  </PurpleButton>
                </ButtonContain>
              </SubContainer2>
              <PurchaseDetails />
            </>

          }
          {
            confirmation == true &&
            <>
              <SubContainer2>
                <PaymentContain >
                  <ContainTitle >
                    Confirmar detalles
                  </ContainTitle>
                  <CourseInfo>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Turpis tellus fames velit at eget ut lacinia. Bibendum cras enim
                    mus fermentum malesuada tincidunt vivamus. Ipsum est urna elit
                    pharetra sed amet, rhoncus sapien. Quisque sit ac nulla dui rhoncus
                    nisi, a ac. Posuere vulputate nunc nulla ut in. Magna pretium vulputate
                    id quam.
                  </CourseInfo>
                  <PurchaseText>
                    Compra:
                    <PurchaseData style={{ color: "#6717CD" }}>
                      Curso 3: Curso de Uñas Francesas
                    </PurchaseData>
                  </PurchaseText>
                  <PurchaseText>
                    Método de Pago:
                    <InfoCard>
                      <VisaIconResp />
                      <PurchaseData>
                        Tarjeta de Crédito/Débito
                        <br />
                        Visa terminada en 2022
                      </PurchaseData>
                    </InfoCard>
                  </PurchaseText>
                  <PurchaseText>
                    Duración de Alquiler:
                    <PurchaseData>
                      90 dias
                    </PurchaseData>
                  </PurchaseText>
                  <Text3>
                    Compra
                  </Text3>
                  <PurchaseContain>
                    <PurchaseText>
                      Compra:
                      <PurchaseData>
                        $ 2,149.00
                      </PurchaseData>
                    </PurchaseText>
                    <PurchaseText>
                      Descuento:
                      <PurchaseData>
                        - $ 400.00
                      </PurchaseData>
                    </PurchaseText>
                    <Divider />
                    <PurchaseText>
                      Total:
                      <PurchaseText>
                        $ 1,749.00
                      </PurchaseText>
                    </PurchaseText>
                  </PurchaseContain>
                  <BotContainer>
                    <Text>
                      <AlertIcon />
                      ¿Cómo protegemos tu compra?
                    </Text>
                    <Text2>
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Felis, velit velit, mattis scelerisque diam
                      scelerisque vitae.
                    </Text2>
                  </BotContainer>
                </PaymentContain>
                <ButtonContain >
                  <TransparentButton onClick={Return}>
                    Regresar
                  </TransparentButton>
                  <PurpleButton onClick={FinishPayment}>
                    Proceder con Compra
                  </PurpleButton>
                </ButtonContain>
              </SubContainer2>
              <PurchaseDetails />
            </>
          }
          {
            pay == true &&
            <>
              <PurchaseComplete />
            </>
          }
        </SubContainer>
      </PayBox>
      <ModalPurchase1 show={show} setShow={setShow} />
    </Container>
  )
}
export default Purchase;