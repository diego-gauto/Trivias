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
  TextClaim,
  Title,
  TransparentButton,
} from "./Modal1.styled";
import { addRequest, addUserReward } from "../../../../../store/actions/RewardActions";
import { useState } from "react";

const Modal2 = ({ show, setShow, data, user, score }: any) => {

  const [userReward, setUserReward] = useState({
    id: data.id,
    status: false,
    title: data.title
  });
  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);

  const [request, setRequest] = useState({
    user: user.name,
    userPhoto: user.photoURL,
    month: score,
    createAt: new Date(),
    phoneNumber: user.phoneNumber,
    type: data.type,
    product: data.title,
    status: false,
  })

  const AddUserRewards = async () => {
    let tempReward = {
      id: data.id,
      status: true,
      title: data.title
    }
    addUserReward(tempReward, user.id).then((res: any) => {
      setUserReward(tempReward)
    });
  }
  const sendRequest = async () => {
    let tempRequest = {
      userId: user.id,
      user: user.name,
      userPhoto: user.photoURL,
      month: score,
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
                Recompensa por <br /> {data.month} puntos
              </RewardText>
              <ButtonContain>
                {
                  (data.month <= score)
                    ? <>
                      {
                        (data.status == false && userReward.status == false)
                          ? <TransparentButton onClick={() => {
                            sendRequest();
                            AddUserRewards();
                          }}>
                            Reclamar Recompensa
                          </TransparentButton>
                          : <TextClaim>Recompensa Reclamada!</TextClaim>
                      }
                    </>
                    : <></>
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
export default Modal2;
