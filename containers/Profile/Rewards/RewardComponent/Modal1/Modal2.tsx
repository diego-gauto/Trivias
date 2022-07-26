

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import {
  AddText,
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

const Modal2 = ({ show, setShow }: any) => {
  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);

  return (
    <>
      <ModalContain >
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <ModalCont style={{ gap: "80px" }}>
            <Title closeButton>
              20% en una membresía
            </Title>
            <ModalPay>
              <ModalPayment>
                <PaymentIcon>
                  <Image src="/images/Rewards/reward3.png" width={"180%"} height={"180%"} />
                </PaymentIcon>
              </ModalPayment>
              <ModalForm>
                <Inputs>
                  <AlertMsg style={{ marginTop: "-50px", fontWeight: "700", color: "black" }}>
                    Recompensa por desbloquear
                  </AlertMsg>
                  <AddText style={{ fontWeight: "400" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Tellus ultrices id feugiat cursus velit.
                    Aliquam pulvinar in orci malesuada. Pellentesque
                    aliquam aliquam nulla sodales tortor pretium aliquet
                    ultricies. Interdum et suspendisse nunc gravida.
                  </AddText>
                </Inputs>
              </ModalForm>
            </ModalPay>
            <ButtonDiv>
              <RewardText style={{
                fontWeight: "700",
                fontSize: "16px",
                marginLeft: "10%",
                top: responsive480 ? "50%" : " 60%",
              }}>
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
export default Modal2;