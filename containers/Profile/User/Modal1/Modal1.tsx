

import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import { httpsCallable } from "firebase/functions";

import { functions } from "../../../../firebase/firebaseConfig";
import { addPaymentMethod } from "../../../../store/actions/PaymentActions";
import {
  AddText,
  BottomInputs,
  ButtonDiv,
  Inputs,
  InputCard,
  InputInfo,
  ModalCont,
  ModalContain,
  ModalForm,
  ModalInput,
  ModalPay,
  PurpleButton,
  Title,
} from "./Modal1.styled";

const Modal1 = ({ show, setShow, data }: any) => {

  const responsive480 = useMediaQuery({ query: "(max-width: 870px)" });
  const handleClose = () => setShow(false);
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });

  const addNewCard = async () => {
    let temp_new = {}
    if (Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!')
    } else {
      const addCard = httpsCallable(functions, 'createPaymentMethodStripe');
      const info = {
        card: card,
        stripe_id: data.stripeId
      }
      await addCard(info).then(async (res: any) => {
        if ("raw" in res.data) {
          alert("Hay un error en los datos de la tarjeta!");
          setCard({ holder: '', number: '', cvc: '', exp_month: '', exp_year: '' });
        } else {
          temp_new = {
            cardId: res.data.id,
            brand: res.data.card.brand,
            last4: res.data.card.last4,
            cvc: card.cvc,
            holder: card.holder,
            exp_month: parseInt(card.exp_month),
            exp_year: parseInt(card.exp_year)
          }
          addPaymentMethod(temp_new, data.id);
          let newCard = {
            cardId: res.data.id,
            stripeId: data.stripeId
          }
          const attach = httpsCallable(functions, 'attachPaymentMethodStripe');
          await attach(newCard).then((res) => {
            window.location.reload();
          })
        }
      })
    }
  }
  useEffect(() => {


  }, [card])

  useEffect(() => {
    if (show) {
      Object.keys(card).forEach(key => {
        card[key] = '';
      });
      setCard(card);
    }
  }, [show])

  return (
    <>
      <ModalContain>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <ModalCont>
            <Title closeButton>
              Ingresar Nuevo Método de Pago
            </Title>
            <ModalPay>
              <ModalForm>
                <Inputs>
                  <InputInfo>
                    <AddText>
                      Número de la Tarjeta
                    </AddText>
                    <InputCard placeholder="XXXX XXXX XXXX XXXX" mask='9999 9999 9999 99999' /*maskChar=""*/ onChange={(e: any) => {
                      setCard((card: any) => ({ ...card, number: e.target.value }));
                    }}>
                    </InputCard>
                  </InputInfo>
                  <InputInfo>
                    <AddText>
                      Nombre
                    </AddText>
                    <ModalInput placeholder="Nombre del propietario" onChange={(e) => {
                      setCard((card: any) => ({ ...card, holder: e.target.value }));
                    }} />
                  </InputInfo>
                  <BottomInputs>
                    <InputInfo>
                      <AddText>
                        Fecha de Expiración
                      </AddText>
                      <ModalInput placeholder="MM" maxLength={2} onChange={(e) => {
                        setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                      }} />
                    </InputInfo>
                    <InputInfo>
                      <AddText>
                        Fecha de Expiración
                      </AddText>
                      <ModalInput placeholder="YYYY" maxLength={4} onChange={(e) => {
                        setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                      }} />
                    </InputInfo>
                  </BottomInputs>
                  <InputInfo>
                    <AddText>
                      CVV
                    </AddText>
                    <ModalInput maxLength={4} placeholder="XXX" onChange={(e) => {
                      setCard((card: any) => ({ ...card, cvc: e.target.value }));
                    }} />
                  </InputInfo>
                </Inputs>
              </ModalForm>
            </ModalPay>
            <ButtonDiv>
              <PurpleButton onClick={() => {
                addNewCard();
              }}>
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