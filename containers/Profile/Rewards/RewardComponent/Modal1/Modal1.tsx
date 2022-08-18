

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

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
import { addRequest, addUserReward, addUserReward2 } from "../../../../../store/actions/RewardActions";
import { useEffect, useState } from "react";

const Modal1 = ({ show, setShow, data, user }: any) => {

  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);
  const [request, setRequest] = useState({
    user: user.name,
    userPhoto: user.photoURL,
    points: user.score,
    createAt: new Date(),
    phoneNumber: user.phoneNumber,
    type: data.type,
    product: data.title,
    status: false,
  })

  const AddUserRewards = async () => {
    let tempReward = {
      id: data.id,
      status: false,
      title: data.title
    }
    addUserReward2(tempReward, user.id).then((res: any) => {
    });
  }
  const sendRequest = async () => {
    let tempRequest = {
      userId: user.id,
      user: user.name,
      userPhoto: user.photoURL,
      points: user.score,
      createAt: new Date(),
      phoneNumber: user.phoneNumber,
      type: data.type,
      product: data.title,
      status: false,
    }
    addRequest(tempRequest).then((res: any) => {
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
                  data.points <= user.score &&
                  <TransparentButton onClick={() => {
                    sendRequest();
                    AddUserRewards();
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