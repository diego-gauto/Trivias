import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import { updatePaymentMethod } from "../../../../store/actions/ProfileActions";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../firebase/firebaseConfig";
import {
  ButtonsDiv,
  CardInfo,
  CardIconResp,
  CardText,
  ChangeMethod,
  Container,
  Membership,
  MemberText,
  Modal2Contain,
  PaymentMethod,
  PayMethod,
  PurpleButton,
  RenewalText,
  Title,
  NewMethod
} from "./Modal2.styled";
import { LoaderContain, PaypalIcon } from "../User.styled";
import { IUserDataProps } from "../../../../interfaces/IUserData";

interface props {
  show: boolean,
  setShow: any,
  data: IUserDataProps,
  pm: any,
}

const Modal2 = ({ show, setShow, data, pm }: props) => {
  const handleClose = () => setShow(false);
  const [methods, setMethods] = useState(false);
  const [loader, setLoader] = useState<any>(false);
  let tempDate = new Date(data.membership.finalDate * 1000);
  let tempDay = tempDate.getDate()
  let tempMonth = tempDate.getUTCMonth() + 1;

  let tempYear = tempDate.getFullYear()
  let formatDate = `${tempDay}/${tempMonth}/${tempYear}`

  const updateUserCard = async (card: any) => {
    setLoader(!loader);
    let info = {
      cardId: card.cardId,
      stripeId: data.stripeId
    }
    const updateCard = httpsCallable(functions, 'setDefaultPaymentMethod');
    await updateCard(info).then(async (res: any) => {
      updatePaymentMethod(card.cardId, data.id).then(() => {
        setLoader(!loader);
        window.location.reload();
      })
    })
  }


  return (
    <Modal2Contain>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Tu Sucripción
          </Title>
          <Membership>
            <MemberText>
              Gonvar Plus
            </MemberText>
            <RenewalText>
              Renovación el {formatDate}
            </RenewalText>
          </Membership>
          <PaymentMethod>
            <MemberText>
              Método de Pago
            </MemberText>
            <PayMethod>
              {data.membership.method == 'stripe' && <CardInfo>
                <CardIconResp brand={data.membership.brand} />
                <CardText>
                  {data.membership.brand} terminada en {data.membership.last4}
                </CardText>
              </CardInfo>}
              {data.membership.method == 'paypal' && <CardInfo>
                <PaypalIcon />
              </CardInfo>}
              {data.membership.method == 'stripe' && <ChangeMethod onClick={() => {
                setMethods(!methods)
              }}>
                Cambiar método
              </ChangeMethod>}

            </PayMethod>
          </PaymentMethod>
          {methods && <PaymentMethod>
            <MemberText>
              Métodos de Pago
            </MemberText>
            {!loader && pm.map((cards: any) => {
              return (
                <PayMethod>
                  <CardInfo>
                    <CardIconResp brand={cards.brand} />
                    <CardText>
                      {cards.brand} terminada en {cards.last4}
                    </CardText>
                  </CardInfo>

                  {!cards.default ? <NewMethod onClick={() => {
                    updateUserCard(cards)
                  }}>
                    Hacer predeterminada
                  </NewMethod> : <NewMethod>
                    Predeterminada
                  </NewMethod>}

                </PayMethod>
              )
            })}
            {loader && <LoaderContain />}
          </PaymentMethod>}
          <ButtonsDiv>
            <PurpleButton onClick={() => {
              setShow(false)
            }} >
              Aceptar
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>

    </Modal2Contain>
  )
}
export default Modal2;