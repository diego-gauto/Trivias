

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import {
  AddText,
  BottomInputs,
  ButtonDiv,
  Inputs,
  InputInfo,
  ModalCont,
  ModalContain,
  ModalForm,
  ModalInput,
  ModalPay,
  PurpleButton,
  Title,
} from "./Modal1.styled";

const Modal1 = ({ show, setShow }: any) => {

  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
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
              {/* <ModalPayment>
                <PaymentMethod>
                  <PaymentMethod2>
                    <PaymentIcon>
                      <Image src="/images/McPay.svg" width={"180%"} height={"180%"} />
                    </PaymentIcon>
                    <PaymentIcon2>
                      <Image src="/images/VisaPay.svg" width={"180%"} height={"180%"} />
                    </PaymentIcon2>
                  </PaymentMethod2>
                  <CardTextContainer>
                    <CardText>
                      Tarjeta de
                    </CardText>
                    <CardText>
                      Crédito/Débito
                    </CardText>
                  </CardTextContainer>
                </PaymentMethod>
                <PaymentMethod>
                  <PaymentIcon>
                    <Image src="/images/Paypal.svg" width={"140%"} height={"140%"} />
                  </PaymentIcon>
                  <CardTextContainer>
                    <CardText>
                      Cuenta de
                    </CardText>
                    <CardText>
                      Paypal
                    </CardText>
                  </CardTextContainer>
                </PaymentMethod>
              </ModalPayment> */}
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