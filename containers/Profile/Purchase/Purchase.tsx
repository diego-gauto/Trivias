import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ModalPurchase1 from "./Modal1/ModalPurchase1";
import {
  AlertIcon,
  BotContainer,
  ButtonContain,
  CirclePosition,
  Container,
  ContainerCard,
  ContainTitle,
  CourseInfo,
  DataPayment,
  DataPaymentContain,
  Divider,
  Division,
  Division2,
  InfoCard,
  Input,
  InputContain,
  InputCard,
  InputText,
  NewMethodBox,
  NewMethodBox2,
  NewMethodContain,
  PastCircle,
  PastText,
  PaymentContain,
  PaymentMethod,
  PayBox,
  PayText,
  PayText2,
  ProcessCircle,
  ProcessText,
  PurchaseContain,
  PurchaseData,
  PurchaseText,
  PurpleButton,
  PurpleBuyButton,
  SubContainer,
  SubContainer2,
  Text,
  Text2,
  Text3,
  TextPosition,
  Title,
  TransparentButton,
  CardIconResp,
  VisaPay,
} from "./Purchase.styled";
import PurchaseComplete from "./PurchaseComplete";
import PurchaseDetails from "./PurchaseDetails";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot
} from "firebase/firestore";
import { httpsCallable } from 'firebase/functions';
import { functions } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { addPaymentMethod, getPaymentmethods, updateUserPlan } from "../../../store/actions/PaymentActions";


const Purchase = () => {
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const [userData, setUserData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState(true);
  const [cardInfo, setCardInfo] = useState(false);
  const [process, setProcess] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [pay, setPay] = useState(false);
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });
  const [defaultCard, setDefaultCard] = useState<any>([]);
  const [product, setProduct] = useState<any>({});
  const [plan, setPlan] = useState<any>({ method: 'stripe' });
  const [cards, setCards] = useState<Array<any>>(new Array());
  const router = useRouter()
  const { type } = router.query;

  const subscription = {
    price: 149.00,
    title: 'Gonvar Plus',
    duration: 'Mensual'
  }

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    console.log(error)
    setLoggedIn(false)
  }

  const fetchDB_data = async () => {
    try {
      let temp_cards: any = []
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        response.forEach((e) => {
          getPaymentmethods(e.id).then((res) => {
            setCards(res);
            res.forEach((element: any) => {
              temp_cards.push(false)
            });
            setDefaultCard(temp_cards)
          })
          setUserData({ ...e.data(), id: e.id })
        });
      })
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    fetchDB_data()
    if (type == 'subscription') {
      setProduct({ ...product, title: subscription.title, price: subscription.price, duration: subscription.duration, type: 'Suscripción' })
    }
  }, [loggedIn]);

  const setDefault = (card: any, idx: any) => {
    setCard({ ...card, brand: card.brand, last4: card.last4, paymentMethod: card.cardId });
    defaultCard.forEach((element: any, index: any) => {
      if (index == idx) {
        defaultCard[index] = true
      } else {
        defaultCard[index] = false
      }
    });
    setDefaultCard(defaultCard)
  }

  const handleConfirm = async () => {
    delete card.brand
    delete card.cardId
    delete card.last4
    delete card.status
    if (cardInfo && Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!')
    }
    if (cardInfo && Object.values(card).every(value => value !== '')) {
      const data = {
        card: card,
        stripe_id: userData.stripeId
      }
      const addCard = httpsCallable(functions, 'createPaymentMethodStripe');
      await addCard(data).then(async (res: any) => {
        console.log(res);
        if ("raw" in res.data) {
          alert("Hay un error en los datos de la tarjeta!")
        } else {
          setCard({ ...card, cardId: res.data.id, brand: res.data.card.brand, last4: res.data.card.last4, status: true })
          setProcess(false);
          setConfirmation(true);
        }
      })
    }
    if (payment && card.paymentMethod) {
      setCard({ ...card, status: false })
      setProcess(false);
      setConfirmation(true);
    }
  }

  const Return = () => {
    setProcess(true);
    setConfirmation(false);
    Object.keys(card).forEach(key => {
      card[key] = '';
    });
    setDefaultCard(new Array(defaultCard.length).fill(false));
    setCard(card);
  }

  const FinishPayment = async () => {
    if (plan.method == 'stripe') {
      const pay = httpsCallable(functions, 'payWithStripeSubscription');
      const data = {
        new: card.status,
        cardId: card.cardId,
        paymentMethod: card.paymentMethod,
        stripeId: userData.stripeId,
        priceId: 'price_1LVioCAaQg7w1ZH2iNrxboKk'
      }
      await pay(data).then((res: any) => {
        console.log(res);

        if ("raw" in res.data) {
          if (res.data.raw.code == "card_declined" || "expired_card" || "incorrect_cvc" || "processing_error" || "incorrect_number") {
            alert("Su tarjeta ha sido declinada, por favor de contactar con su banco, gracias!")
          }
        } else {
          updateUserPlan({ ...plan, finalDate: res.data.current_period_end, paymentMethod: card.cardId || card.paymentMethod, id: res.data.id, name: product.title }, userData.id)
          if (card.status) {
            addPaymentMethod(card, userData.id);
          }
          setConfirmation(false);
          setPay(true);
        }
      })
    }
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(card);

  }, [card])

  return (
    <Container>
      <Title>
        Proceso de Pago
      </Title>
      <PayBox>
        <DataPayment>
          {
            process == true
              ? <>
                <DataPaymentContain>
                  <CirclePosition />
                  <TextPosition>
                    Datos de pago
                  </TextPosition>
                </DataPaymentContain>
                <Division />
                <DataPaymentContain>
                  <ProcessCircle />
                  <ProcessText>
                    Confirmacion
                  </ProcessText>
                </DataPaymentContain>
                <Division />
                <DataPaymentContain>
                  <ProcessCircle />
                  <ProcessText>
                    Compra exitosa
                  </ProcessText>
                </DataPaymentContain>
              </>
              : confirmation == true ?
                <>
                  <DataPaymentContain>
                    <PastCircle />
                    <PastText>
                      Datos de pago
                    </PastText>
                  </DataPaymentContain>
                  <Division2 />
                  <DataPaymentContain>
                    <CirclePosition />
                    <TextPosition>
                      Confirmacion
                    </TextPosition>
                  </DataPaymentContain>
                  <Division />
                  <DataPaymentContain>
                    <ProcessCircle />
                    <ProcessText>
                      Compra exitosa
                    </ProcessText>
                  </DataPaymentContain>
                </>
                : pay == true ?
                  <>
                    <DataPaymentContain>
                      <PastCircle />
                      <PastText>
                        Datos de pago
                      </PastText>
                    </DataPaymentContain>
                    <Division2 />
                    <DataPaymentContain>
                      <PastCircle />
                      <PastText>
                        Confirmacion
                      </PastText>
                    </DataPaymentContain>
                    <Division2 />
                    <DataPaymentContain>
                      <CirclePosition />
                      <TextPosition>
                        Compra exitosa
                      </TextPosition>
                    </DataPaymentContain>
                  </>
                  : <></>
          }

        </DataPayment>
        <SubContainer>
          {
            process == true &&
            <>
              <SubContainer2>
                {cards.length > 0 && <PaymentContain onClick={() => {
                  setPayment(true),
                    setCardInfo(false);
                }}>
                  <ContainTitle style={{ cursor: 'pointer' }}>
                    Métodos en tu cuenta
                  </ContainTitle>
                  {
                    payment === true &&
                    cards.map((card, index) => {
                      return (
                        <PaymentMethod active={defaultCard[index]} onClick={() => {
                          setDefault(card, index)
                        }}>
                          <CardIconResp brand={card.brand} />
                          <PayText>
                            {card.brand} terminada en {card.last4}
                          </PayText>
                        </PaymentMethod>
                      )
                    })
                  }
                </PaymentContain>}
                <ContainTitle>
                  Nuevo Método de Pago
                </ContainTitle>

                <NewMethodBox onClick={() => {
                  setPayment(false),
                    setCardInfo(true);
                }}>
                  <NewMethodContain>
                    <VisaPay />
                  </NewMethodContain>
                  <PayText2>
                    Tarjeta de Crédito / Débito
                  </PayText2>
                </NewMethodBox>

                {
                  cardInfo == true &&
                  <>
                    <NewMethodBox2 onClick={() => {
                      setPayment(true),
                        setCardInfo(false);
                    }}></NewMethodBox2>
                    <ContainerCard>
                      <InputText>
                        Número de la Tarjeta
                        <InputCard mask='9999 9999 9999 99999' maskChar="" placeholder="XXXX XXXX XXXX XXXX" onChange={(e: any) => {
                          setCard((card: any) => ({ ...card, number: e.target.value }));
                        }}>
                        </InputCard>
                      </InputText>
                      <InputText>
                        Nombre
                        <Input placeholder="Nombre del Propietario" onChange={(e) => {
                          setCard((card: any) => ({ ...card, holder: e.target.value }));
                        }} />
                      </InputText>
                      <InputContain>
                        <InputText>
                          Fecha de Expiración
                          <InputContain>
                            <Input maxLength={2} placeholder="MM" onChange={(e) => {
                              setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                            }} />
                            <Input maxLength={4} placeholder="YYYY" onChange={(e) => {
                              setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                            }} />
                          </InputContain>
                        </InputText>
                        <InputText>
                          CVV
                          <Input type="password" maxLength={4} placeholder="XXX" onChange={(e) => {
                            setCard((card: any) => ({ ...card, cvc: e.target.value }));
                          }} />
                        </InputText>
                      </InputContain>
                      <BotContainer>
                        <Text>
                          <AlertIcon />
                          ¿Cómo protegemos tu compra?
                        </Text>
                        <Text2>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Felis, velit velit, mattis scelerisque diam
                          scelerisque vitae.
                        </Text2>
                      </BotContainer>
                    </ContainerCard>
                  </>
                }
                <ButtonContain >
                  <TransparentButton onClick={handleShow}>
                    Agregar Cupón
                  </TransparentButton>
                  <PurpleButton onClick={handleConfirm}>
                    Continuar
                  </PurpleButton>
                </ButtonContain>
              </SubContainer2>
            </>
          }
          {
            confirmation == true &&
            <>
              <SubContainer2>
                <PaymentContain >
                  <ContainTitle >
                    Confirmar detalles
                  </ContainTitle>
                  <CourseInfo>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Turpis tellus fames velit at eget ut lacinia. Bibendum cras enim
                    mus fermentum malesuada tincidunt vivamus. Ipsum est urna elit
                    pharetra sed amet, rhoncus sapien. Quisque sit ac nulla dui rhoncus
                    nisi, a ac. Posuere vulputate nunc nulla ut in. Magna pretium vulputate
                    id quam.
                  </CourseInfo>
                  <PurchaseText>
                    Compra:
                    <PurchaseData style={{ color: "#6717CD" }}>
                      {product.type}: {product.title}
                    </PurchaseData>
                  </PurchaseText>
                  <PurchaseText>
                    Método de Pago:
                    <InfoCard>
                      <CardIconResp brand={card.brand} />
                      <PurchaseData>
                        Tarjeta de Crédito/Débito
                        <br />
                        {card.brand} terminada en {card.last4}
                      </PurchaseData>
                    </InfoCard>
                  </PurchaseText>
                  <PurchaseText>
                    Duración de Alquiler:
                    <PurchaseData>
                      {product.duration}
                    </PurchaseData>
                  </PurchaseText>
                  <Text3>
                    Compra
                  </Text3>
                  <PurchaseContain>
                    <PurchaseText>
                      Compra:
                      <PurchaseData>
                        $ {product.price}.00
                      </PurchaseData>
                    </PurchaseText>
                    {/* <PurchaseText>
                      Descuento:
                      <PurchaseData>
                        - $ 400.00
                      </PurchaseData>
                    </PurchaseText> */}
                    <Divider />
                    <PurchaseText>
                      Total:
                      <PurchaseText>
                        $ {product.price}.00
                      </PurchaseText>
                    </PurchaseText>
                  </PurchaseContain>
                  <BotContainer>
                    <Text>
                      <AlertIcon />
                      ¿Cómo protegemos tu compra?
                    </Text>
                    <Text2>
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Felis, velit velit, mattis scelerisque diam
                      scelerisque vitae.
                    </Text2>
                  </BotContainer>
                </PaymentContain>
                <ButtonContain >
                  <TransparentButton onClick={Return}>
                    Regresar
                  </TransparentButton>
                  <PurpleBuyButton onClick={FinishPayment}>
                    Proceder con Compra
                  </PurpleBuyButton>
                </ButtonContain>
              </SubContainer2>
            </>
          }
          {!pay && <PurchaseDetails id={'5'} type={type} />}
          {
            pay == true &&
            <>
              <PurchaseComplete data={product} card={card} />
            </>
          }
        </SubContainer>
      </PayBox>
      <ModalPurchase1 show={show} setShow={setShow} />
    </Container>
  )
}
export default Purchase;