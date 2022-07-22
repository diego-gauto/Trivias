

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import {
  AddText,
  BottomInputs,
  ButtonDiv,
  CardText,
  Inputs,
  InputInfo,
  ModalCont,
  ModalContain,
  ModalForm,
  ModalInput,
  ModalPay,
  ModalPayment,
  PaymentIcon,
  PaymentIcon2,
  PaymentMethod,
  PaymentMethod2,
  PurpleButton,
  Title,
} from "./Modal1.styled";

const Modal1 = ({ show, setShow }: any) => {

  const responsive470 = useMediaQuery({ query: "(max-width: 470px)" });
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
                  <PaymentMethod2>
                    <PaymentIcon>
                      <Image src="/images/McPay.svg" width={"180%"} height={"180%"} />
                    </PaymentIcon>
                    <PaymentIcon2>
                      <Image src="/images/VisaPay.svg" width={"180%"} height={"180%"} />
                    </PaymentIcon2>
                  </PaymentMethod2>
                  <CardText >
                    Tarjeta de Crédito/Débito
                  </CardText>
                </PaymentMethod>
                <PaymentMethod>
                  <Image src="/images/Paypal.svg" width={"180%"} height={"180%"} />
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