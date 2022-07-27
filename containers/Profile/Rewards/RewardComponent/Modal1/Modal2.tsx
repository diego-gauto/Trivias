

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import {
  AddText,
  AlertCont,
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

  const responsive870 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);

  return (
    <>
      <ModalContain >
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <ModalCont style={{ height: responsive870 ? "700px" : "480px" }}>
            <Title style={{ marginTop: responsive870 ? "-20px" : "", marginBottom: responsive870 ? "20px" : "" }} closeButton>
              20% en una membresía
            </Title>
            <ModalPay>
              <ModalPayment>
                <PaymentIcon>
                  <Image src="/images/Rewards/reward3.png" width={"250%"} height={"250%"} />
                </PaymentIcon>
              </ModalPayment>
              <ModalForm>
                <Inputs>
                  <AlertMsg style={{ marginTop: responsive870 ? "35px" : "", fontWeight: "700", color: "black" }}>
                    Recompensa por desbloquear
                  </AlertMsg>
                  <AlertCont>
                    <AddText >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tellus ultrices id feugiat cursus velit. Aliquam pulvinar
                      in orci malesuada. Pellentesque aliquam aliquam nulla
                      sodales tortor pretium aliquet ultricies. Interdum et
                      suspendisse nunc gravida.
                    </AddText>
                  </AlertCont>
                  <AddText style={{ height: "50px", fontWeight: "700" }}>
                    <br />
                  </AddText>
                </Inputs>
              </ModalForm>
            </ModalPay>
            <ButtonDiv >
              <RewardText style={{ fontWeight: "700", fontSize: "16px", marginLeft: "10%", top: "320px" }}>
                Recompensa por <br /> 2,000 puntos
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
