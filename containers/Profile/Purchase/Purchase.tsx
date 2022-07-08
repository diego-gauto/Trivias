import Image from 'next/image';
import React, { useState } from 'react'
import ModalPurchase1 from './Modal1/ModalPurchase1';
import { ButtonContain, Card, CardContain, Container, ContainTitle, CourseCost, CourseId, CourseImage, CourseInfo, CourseName, CourseText, DataPayment, DataPaymentContain, Division, NewMethod, NewMethodBox, NewMethodContain, PayBox, PaymentContain, PaymentMethod, PaypalIcon, PayText, ProcessCircle, ProcessCircle2, ProcessText, ProcessText2, PurchaseContainer, PurpleButton, SubContainer, SubContainer2, Subtitle, Title, TitleCourse, TransparentButton, VisaIcon } from './Purchase.styled';

const Purchase = () => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true);
  return (
    <Container>
      <Title>
        Proceso de Pago
      </Title>
      <PayBox>
        <DataPayment>
          <DataPaymentContain>
            <ProcessCircle>
            </ProcessCircle>
            <ProcessText>
              Datos de pago
            </ProcessText>
          </DataPaymentContain>
          <Division></Division>
          <DataPaymentContain>
            <ProcessCircle2>
            </ProcessCircle2>
            <ProcessText2>
              Confirmación
            </ProcessText2>
          </DataPaymentContain>
          <Division></Division>
          <DataPaymentContain>
            <ProcessCircle2>
            </ProcessCircle2>
            <ProcessText2>
              Compra Exitosa
            </ProcessText2>
          </DataPaymentContain>
        </DataPayment>
        <SubContainer>
          <SubContainer2>
            <PaymentContain>
              <ContainTitle>
                Métodos en tu cuenta
              </ContainTitle>
              <PaymentMethod>
                <VisaIcon />
                <PayText>
                  Visa terminada en 1486
                </PayText>
              </PaymentMethod>
              <PaymentMethod>
                <PaypalIcon />
                <PayText>
                  Paypal Mofupiyo
                </PayText>
              </PaymentMethod>
            </PaymentContain>
            <ContainTitle>
              Nuevo Método de Pago
            </ContainTitle>
            <NewMethod>
              <NewMethodBox>
                <NewMethodContain>
                  <Image src="/images/McPay.png" width={144} height={96} />
                  <Image src="/images/VisaPay.png" width={144} height={96} />
                </NewMethodContain>
                <PayText>
                  Tarjeta de Crédito / Débito
                </PayText>
              </NewMethodBox>
              <NewMethodBox>
                <NewMethodContain>
                  <Image src="/images/PaypalPay.png" width={144} height={96} />
                </NewMethodContain>
                <PayText>
                  Cuenta de Paypal
                </PayText>
              </NewMethodBox>
            </NewMethod>
            <ButtonContain>
              <TransparentButton onClick={handleShow}>
                Agregar Cupón
              </TransparentButton>
              <PurpleButton>
                Continuar
              </PurpleButton>
            </ButtonContain>
          </SubContainer2>

          <PurchaseContainer>
            <ContainTitle>
              Detalles de la compra
            </ContainTitle>
            <CourseId>
              Curso 3
            </CourseId>
            <CourseName>
              Curso de Uñas Francesas
              <CourseCost>
                $ 2,149.00
              </CourseCost>

            </CourseName>
            <CardContain>
              <Card>
                <CourseImage src="/images/Lukedemo.png" width={600} height={250} />
                <CourseText>
                  <TitleCourse>
                    Curso 3: Lorem Ipsum
                  </TitleCourse>
                  <Subtitle>
                    Subtítulo de categoría
                  </Subtitle>
                </CourseText>
              </Card>
            </CardContain>
            <CourseInfo>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tellus fames velit at eget ut lacinia. Bibendum cras enim mus fermentum malesuada tincidunt vivamus. Ipsum est urna elit pharetra sed amet, rhoncus sapien. Quisque sit ac nulla dui rhoncus nisi, a ac. Posuere vulputate nunc nulla ut in. Magna pretium vulputate id quam.
              <br />
              <br />
              Sapien purus interdum nisi, egestas scelerisque. Nascetur mattis viverra vitae, tempor. In diam, risus cras feugiat est suspendisse nisl eu, fringilla.
            </CourseInfo>
          </PurchaseContainer>

        </SubContainer>
      </PayBox>
      <ModalPurchase1 show={show} setShow={setShow} />
    </Container>
  )
}
export default Purchase;