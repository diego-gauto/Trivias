

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import {
  AddText,
  AlertCont,
  AlertIcon,
  AlertMsg,
  ButtonContain,
  ButtonDiv,
  ImageReward,
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
  TransparentButton,
} from "./Modal1.styled";
import { addRequest } from "../../../../../store/actions/RewardActions";
import { useEffect, useState } from "react";

const Modal1 = ({ show, setShow, data, score }: any) => {

  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);
  const [request, setRequest] = useState({
    user: "andrei",
    points: 100,
    createAt: 10,
    phoneNumber: 6623,
    unBlocked: 20,
    type: "digital",
    product: "Gonvar"

  })

  const sendRequest = async () => {
    addRequest(request).then((res: any) => {
      setRequest(res);
      console.log(res);
    })
  }
  return (
    <>
      <ModalContain >
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <ModalCont >
            <Title closeButton>
              {data.title}
            </Title>
            <ModalPay>
              <ModalPayment>
                <PaymentIcon>
                  <ImageReward path={data.path} />
                </PaymentIcon>
              </ModalPayment>
              <ModalForm>
                <Inputs>
                  <AddText >
                    {data.about}
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
                Recompensa por <br /> {data.points} puntos
              </RewardText>
              <ButtonContain>
                {
                  data.points <= score &&
                  <TransparentButton onClick={() => {
                    sendRequest();
                  }}>
                    Reclamar Recompensa
                  </TransparentButton>
                }
                <PurpleButton onClick={handleClose}>
                  Entendido
                </PurpleButton>
              </ButtonContain>
            </ButtonDiv>
          </ModalCont>
        </Modal>
      </ModalContain>
    </>
  )
}
export default Modal1;