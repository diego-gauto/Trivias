

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import {
  AddText,
  AlertCont,
  AlertIcon,
  AlertMsg,
  ButtonDiv,
  Inputs,
  ModalCont,
  ModalContain,
  ModalForm,
  ModalPay,
  ModalPayment,
  PaymentIcon,
  PurpleButton,
  RewardText,
  Title,
} from "./Modal1.styled";

const Modal1 = ({ show, setShow }: any) => {

  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);

  return (
    <>
      <ModalContain >
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <ModalCont >
            <Title closeButton>
              Gonvar Nails Leonardo Da Vinci
            </Title>
            <ModalPay>
              <ModalPayment>
                <PaymentIcon>
                  <Image src="/images/GonvarReward1.png" width={"250%"} height={"250%"} />
                </PaymentIcon>
              </ModalPayment>
              <ModalForm>
                <Inputs>
                  <AddText >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Tellus ultrices id feugiat cursus velit. Aliquam pulvinar
                    in orci malesuada. Pellentesque aliquam aliquam nulla sodales
                    tortor pretium aliquet ultricies. Interdum et suspendisse nunc
                    gravida.
                  </AddText>
                  <AlertCont>
                    <AlertIcon />
                    <AlertMsg>
                      Este es un producto físico y requiere entrega
                    </AlertMsg>
                  </AlertCont>
                  <AddText style={{ fontWeight: "700" }}>
                    Pronto el administrador se contactará para poder organizar la
                    entrega de la recompensa.
                  </AddText>
                </Inputs>
              </ModalForm>
            </ModalPay>
            <ButtonDiv>
              <RewardText style={{ fontWeight: "700", fontSize: "16px", marginLeft: "10%" }}>
                Recompensa por <br /> 1,100 puntos
              </RewardText>
              <PurpleButton onClick={handleClose}>
                Entendido
              </PurpleButton>
            </ButtonDiv>
          </ModalCont>
        </Modal>
      </ModalContain>
    </>
  )
}
export default Modal1;