import React, { useEffect, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import router, { useRouter } from "next/router";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { db, functions } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { updateCoupon } from "../../../store/actions/CouponsActions";
import { getWholeCourse } from "../../../store/actions/courseActions";
import {
  addCourseUser,
  addInvoice,
  addPaymentMethod,
  getPaymentmethods,
  updateUserPlan,
} from "../../../store/actions/PaymentActions";
import ModalPurchase1 from "./Modal1/ModalPurchase1";
import {
  AlertIcon,
  BotContainer,
  ButtonContain,
  CardIconResp,
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
  InputCard,
  InputText,
  LoaderContainSpinner,
  NewMethodBox,
  NewMethodBox2,
  NewMethodBoxPaypal,
  NewMethodContain,
  PastCircle,
  PastText,
  PaymentsContainer,
  PaymentContain,
  PaymentDetail,
  PaymentMethod,
  PayBox,
  PayPal,
  PayText,
  PayText2,
  ProcessCircle,
  ProcessText,
  PurchaseContain,
  PurchaseData,
  PurchaseText,
  PurpleButton,
  PurpleBuyButton,
  RowCard,
  SubContainer,
  SubContainer2,
  Text,
  Text2,
  Text3,
  TextPosition,
  Title,
  TransparentButton,
  VisaPay,
} from "./Purchase.styled";
import PurchaseComplete from "./PurchaseComplete";
import PurchaseDetails from "./PurchaseDetails";
import { getPaidCourses } from "../../../store/actions/UserActions";

const Purchase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const [userData, setUserData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const [process, setProcess] = useState(true);
  const [paypal, setPaypal] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [pay, setPay] = useState(false);
  const [coupon, setCoupon] = useState<any>();
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });
  const [defaultCard, setDefaultCard] = useState<any>([]);
  const [product, setProduct] = useState<any>({});
  const [plan, setPlan] = useState<any>({ method: 'stripe' });
  const [cards, setCards] = useState<Array<any>>(new Array());
  const router = useRouter()
  const { type, id } = router.query;
  const [loader, setLoader] = useState<any>(false);
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
    setLoggedIn(false);
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
        setIsLoading(false);
      })
    } catch (error) {
      return false
    }
  }
  const getUserCourses = (user: any) => {
    getPaidCourses(user).then((res) => {
      res = res.filter((course: any, index: any) => course.id == router.query.id)
      if (res[0] == null) {
        res[0] = []
      }
      else {
        if (res[0].id == router.query.id) {
          window.location.href = "/Preview";
        }
      }
    })
  }
  useEffect(() => {

    fetchDB_data();

  }, [loggedIn]);

  useEffect(() => {
    if (type == 'subscription') {
      setProduct({ ...product, title: subscription.title, price: subscription.price, duration: subscription.duration, type: 'Suscripción' })
    } else {
      getWholeCourse(id).then((res: any) => {
        setProduct({ ...product, title: res.courseTittle, price: res.coursePrice, duration: res.courseDuration, type: 'course', category: res.courseCategory, lessons: res.totalLessons, img: res.coursePath })
      })
    }
  }, [])

  const setDefault = (card: any, idx: any) => {
    setCard({ ...card, brand: card.brand, last4: card.last4, paymentMethod: card.cardId });
    defaultCard.forEach((element: any, index: any) => {
      if (index == idx) {
        defaultCard[index] = true
      } else {
        defaultCard[index] = false
      }
    });
    setDefaultCard(defaultCard);
  }

  const handleConfirm = async () => {
    console.log(coupon);
    console.log('pos entra')
    setLoader(true);
    if ((!cardInfo && !payment && plan.method !== 'paypal') || (!cardInfo && payment && !card.paymentMethod)) {
      alert("Por favor seleccione un método de pago!");
    }
    if (cardInfo) {
      delete card.brand
      delete card.cardId
      delete card.last4
      delete card.status
      delete card.paymentMethod
    }
    if (cardInfo && Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!')
      setLoader(false)
    }
    if (cardInfo && Object.values(card).every(value => value !== '')) {
      const data = {
        card: card,
        stripe_id: userData.stripeId
      }
      const addCard = httpsCallable(functions, 'createPaymentMethodStripe');
      await addCard(data).then(async (res: any) => {
        if ("raw" in res.data) {
          alert("Hay un error en los datos de la tarjeta!")
        } else {
          setCard({ ...card, cardId: res.data.id, brand: res.data.card.brand, last4: res.data.card.last4, status: true })
          setProcess(false);
          setConfirmation(true);
        }
        setLoader(false)
      })
    }
    if (payment && card.paymentMethod) {
      setCard({ ...card, status: false });
      setProcess(false);
      setConfirmation(true);
      setLoader(false);
    }
    if (plan.method == 'paypal') {
      setLoader(false);
      setPaypal(!paypal);
      setProcess(false);
      setConfirmation(true);
    }
    setLoader(false);
  }

  const Return = () => {
    setProcess(true);
    setConfirmation(false);
    setCoupon(null);
    Object.keys(card).forEach(key => {
      card[key] = '';
    });
    setPaypal(true)
    setPlan({ method: '' })
    setDefaultCard(new Array(defaultCard.length).fill(false));
    setCard(card);
  }

  const FinishPayment = async () => {
    setLoader(true)
    let invoice = {
      amount: 0,
      userName: userData.name,
      userEmail: userData.email,
      paidAt: new Date(),
      product: product.title,
      brand: card.brand,
      userId: userData.id,
      method: plan.method
    }
    if (plan.method == 'stripe') {
      console.log('entro al metodo')
      if (type == 'subscription') {
        const pay = httpsCallable(functions, 'payWithStripeSubscription');
        const data = {
          new: card.status,
          cardId: card.cardId,
          paymentMethod: card.paymentMethod,
          stripeId: userData.stripeId,
          priceId: 'price_1LVioCAaQg7w1ZH2iNrxboKk',
          method: 'stripe'
        }
        await pay(data).then((res: any) => {
          if ("raw" in res.data) {
            if (res.data.raw.code == "card_declined" || "expired_card" || "incorrect_cvc" || "processing_error" || "incorrect_number") {
              alert(
                res.data.raw.code == "card_declined" && (
                  res.data.raw.decline_code == "generic_decline" && "Pago Rechazado" ||
                  res.data.raw.decline_code == "insufficient_funds" && "Tarjeta rechazada: fondos insuficientes" ||
                  res.data.raw.decline_code == "lost_card" && "Pago Rechazado: Tarjeta extraviada" ||
                  res.data.raw.decline_code == "stolen_card" && "Pago Rechazado: Tarjeta robada"
                ) ||
                res.data.raw.code == "expired_card" && "Tarjeta expirada" ||
                res.data.raw.code == "incorrect_cvc" && "Codigo incorrecto" ||
                res.data.raw.code == "processing_error" && "Error de proceso" ||
                res.data.raw.code == "incorrect_number" && "Tarjeta Incorrecta"
              )
            }
            console.log('entro al error')
            setLoader(false);
          } else {
            updateUserPlan({ ...plan, finalDate: res.data.current_period_end, paymentMethod: card.cardId || card.paymentMethod, id: res.data.id, name: product.title }, userData.id)
            if (card.status) {
              addPaymentMethod(card, userData.id);
            }
            setConfirmation(false);
            setPay(true);
            setLoader(false);
          }
        });
      } else {
        const data = {
          new: card.status,
          cardId: card.cardId,
          paymentMethod: card.paymentMethod,
          stripeId: userData.stripeId,
          amount: product.price,
          method: 'stripe'
        }
        const pay = httpsCallable(functions, 'payWithStripeCourse');
        await pay(data).then((res: any) => {
          if ("raw" in res.data) {
            if (res.data.raw.code == "card_declined" || "expired_card" || "incorrect_cvc" || "processing_error" || "incorrect_number") {
              alert(
                res.data.raw.code == "card_declined" && (
                  res.data.raw.decline_code == "generic_decline" && "Pago Rechazado" ||
                  res.data.raw.decline_code == "insufficient_funds" && "Tarjeta rechazada: fondos insuficientes" ||
                  res.data.raw.decline_code == "lost_card" && "Pago Rechazado: Tarjeta extraviada" ||
                  res.data.raw.decline_code == "stolen_card" && "Pago Rechazado: Tarjeta robada"
                ) ||
                res.data.raw.code == "expired_card" && "Tarjeta expirada" ||
                res.data.raw.code == "incorrect_cvc" && "Codigo incorrecto" ||
                res.data.raw.code == "processing_error" && "Error de proceso" ||
                res.data.raw.code == "incorrect_number" && "Tarjeta Incorrecta"
              )
            }
            console.log('entro al pagocurso')
            setLoader(false);
          } else {
            let price = res.data.amount / 100
            if (coupon) {
              if (coupon.type == 'amount') {
                price = price - coupon.discount;
              } else {
                price = (price - (coupon.discount / 100) * price)
              }
              updateCoupon(coupon, coupon.id);
            }
            invoice.amount = price * 100;
            const course = {
              id: id,
              duration: (new Date().getTime() / 1000) + product.duration * 86400
            }
            addCourseUser(course, userData.id);
            addInvoice(invoice);
            if (card.status) {
              addPaymentMethod(card, userData.id);
            }
            console.log('entro al final')
            setConfirmation(false);
            setPay(true);
            setLoader(false);
          }
        })
      }
    }
    if (plan.method == 'paypal') {
      setLoader(false);
      if (type == 'subscription') {
        setConfirmation(false);
        setPay(true);
      } else {
        let price = product.price
        if (coupon) {
          if (coupon.type == 'amount') {
            price = price - coupon.discount;
          } else {
            price = (price - (coupon.discount / 100) * price)
          }
          updateCoupon(coupon, coupon.id);
        }
        delete invoice.brand;
        invoice.amount = price * 100
        const course = {
          id: id,
          duration: (new Date().getTime() / 1000) + product.duration * 86400
        }
        addCourseUser(course, userData.id);
        addInvoice(invoice);
        setConfirmation(false);
        setPay(true);
      }
    }
  }
  const handleShow = () => setShow(true);

  const handleCoupons = (value: any) => {
    setCoupon(value);
  }

  useEffect(() => {
    console.log(plan);
  }, [card, plan])
  useEffect(() => {
    console.log(router.query.type)
    if (router.query.type == "subscription" && userData?.membership.planName == "Gonvar Plus") {
      window.location.href = "/Preview";
    }
    if (userData !== null) {
      getUserCourses(userData.id);
    }
  }, [isLoading])
  return (
    <>
      {isLoading ? <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background> :
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
                        Confirmación
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
                          Confirmación
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
                            Confirmación
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
                    {cards.length > 0 && <PaymentContain active={payment} onClick={() => {
                      setPayment(true),
                        setCardInfo(false),
                        setPlan({ method: 'stripe' })
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
                    <PaymentsContainer>
                      <>
                        <NewMethodBox active={cardInfo} plan={plan.method} onClick={() => {
                          setPayment(false),
                            setCardInfo(true),
                            setPlan({ method: 'stripe' })
                        }}>
                          <ContainTitle>
                            Nuevo Método de Pago
                          </ContainTitle>
                          <NewMethodContain>
                            <VisaPay />
                          </NewMethodContain>
                          <PayText2>
                            Tarjeta de Crédito / Débito
                          </PayText2>
                        </NewMethodBox>
                      </>
                      <NewMethodBoxPaypal plan={plan.method} onClick={() => {
                        setPayment(false),
                          setCardInfo(false),
                          setPlan({ method: 'paypal' })
                      }}>
                        <ContainTitle>
                          Paypal
                        </ContainTitle>
                        <NewMethodContain>
                          <PayPal />
                        </NewMethodContain>

                      </NewMethodBoxPaypal>
                    </PaymentsContainer>
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
                            <InputCard mask='9999 9999 9999 9999' maskChar={null} placeholder="XXXX XXXX XXXX XXXX" onChange={(e: any) => {
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
                          <div className="row-costum">
                            <InputText>
                              Fecha de expiración
                              <Input placeholder="MM" onChange={(e) => {
                                setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                              }} />
                            </InputText>
                            <InputText>
                              &nbsp;
                              <Input placeholder="YYYY" maxLength={4} onChange={(e) => {
                                setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                              }} />
                            </InputText>
                            <InputText>
                              CVC
                              <Input type="password" placeholder="123" maxLength={3} onChange={(e) => {
                                setCard((card: any) => ({ ...card, cvc: e.target.value }));
                              }} />
                            </InputText>
                          </div>

                          {/* <Row>
                            <RowCard>
                              <Col md={4}>
                                <Form.Group>
                                  <Form.Label font>Fecha de expiración</Form.Label>
                                  <Form.Control type="text" placeholder="MM" onChange={(e) => {
                                    setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                                  }} />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group>
                                  <Form.Label>&nbsp;</Form.Label>
                                  <Form.Control type="text" placeholder="YYYY" maxLength={4} onChange={(e) => {
                                    setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                                  }} />
                                </Form.Group>
                              </Col>
                            </RowCard>
                            <RowCard>
                              <Col md={4}>
                                <Form.Group>
                                  <Form.Label>CVV</Form.Label>
                                  <Form.Control type="text" placeholder="123" maxLength={3} onChange={(e) => {
                                    setCard((card: any) => ({ ...card, cvc: e.target.value }));
                                  }} />
                                </Form.Group>
                              </Col>
                            </RowCard>
                          </Row> */}
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
                      {(type == 'course' && !coupon) && <TransparentButton onClick={handleShow}>
                        Agregar Cupón
                      </TransparentButton>}
                      {coupon && <TransparentButton style={{ cursor: "auto" }}>
                        Cupón agregado <FaCheck></FaCheck>
                      </TransparentButton>}
                      {!loader && <PurpleButton onClick={handleConfirm}>
                        Continuar
                      </PurpleButton>}
                      {loader && <LoaderContainSpinner />}
                    </ButtonContain>
                  </SubContainer2>
                </>
              }
              {
                confirmation == true &&
                <>
                  <SubContainer2>
                    <PaymentDetail >
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
                          {product.title}
                        </PurchaseData>
                      </PurchaseText>
                      <PurchaseText>
                        Método de Pago:
                        <InfoCard>
                          <CardIconResp brand={card.brand} />
                          {plan.method == 'stripe' ? <PurchaseData>
                            Tarjeta de Crédito/Débito
                            <br />
                            {card.brand} terminada en {card.last4}
                          </PurchaseData> :
                            <PurchaseData>
                              Paypal
                            </PurchaseData>}
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
                        {coupon && <PurchaseText>
                          Descuento:
                          {coupon.type == 'amount' ? <PurchaseData>
                            - $ {coupon.discount}
                          </PurchaseData> :
                            <PurchaseData>
                              - {coupon.discount}%
                            </PurchaseData>
                          }
                        </PurchaseText>}
                        <Divider />
                        {!coupon ? <PurchaseText>
                          Total:
                          <PurchaseText>
                            $ {product.price}.00
                          </PurchaseText>
                        </PurchaseText> :
                          <PurchaseText>
                            Total:
                            {coupon.type == 'amount' ? <PurchaseText>
                              $ {product.price - coupon.discount}
                            </PurchaseText> :
                              <PurchaseText>
                                $ {product.price - (coupon.discount / 100) * product.price}
                              </PurchaseText>}
                          </PurchaseText>}
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
                    </PaymentDetail>
                    <ButtonContain >
                      <TransparentButton onClick={Return}>
                        Regresar
                      </TransparentButton>
                      {(paypal && !loader) && <PurpleBuyButton onClick={FinishPayment}>
                        Proceder con Compra
                      </PurpleBuyButton>}
                      {(paypal && loader) && <LoaderContainSpinner />}
                      {!paypal && <PayPalScriptProvider deferLoading={paypal} options={{
                        "client-id": "AcoNY4gJGdLGKDXKh8FnQfKKYn1A7aAFeSJYqbpdLkVauf360_0UnGNN7penwq7EuJIPNCk-y7FRHxtR",
                        currency: "MXN",
                        'vault': true,
                      }}
                      >
                        {type == 'subscription' && <PayPalButtons
                          style={{
                            color: "gold",
                            layout: 'horizontal',
                            shape: 'pill',
                            height: 50,
                          }}
                          createSubscription={(data, actions) => {
                            return actions.subscription.create({
                              plan_id: 'P-6P515571TU0367642MMDGG4Y'
                            })
                          }}
                          onApprove={(data: any, actions) => {
                            let today = new Date().getTime() / 1000;
                            let finalDate = 0;
                            finalDate = today + 2629800;
                            updateUserPlan({ ...plan, finalDate: finalDate, paymentMethod: '', id: data.subscriptionID, name: product.title }, userData.id).then(() => {
                              setConfirmation(false);
                              setPay(true);
                            })
                            return data
                          }}
                        />}
                        {type == 'course' && <PayPalButtons
                          style={{
                            color: "gold",
                            layout: 'horizontal',
                            shape: 'pill',
                          }}
                          createOrder={(data, actions) => {
                            let price = product.price
                            if (coupon) {
                              if (coupon.type == 'amount') {
                                price = price - coupon.discount;
                              } else {
                                price = (price - (coupon.discount / 100) * price)
                              }
                            }
                            return actions.order.create({

                              purchase_units: [
                                {
                                  amount: {
                                    value: price,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions: any) => {
                            return actions.order.capture().then((details: any) => {
                              FinishPayment()
                            });
                          }}
                        />}
                      </PayPalScriptProvider>}
                    </ButtonContain>
                  </SubContainer2>
                </>
              }
              {!pay && <PurchaseDetails data={product} type={type} />}
              {
                pay == true &&
                <>
                  <PurchaseComplete data={product} card={card} id={id} coupon={coupon} plan={plan} />
                </>
              }
            </SubContainer>
          </PayBox>
          <ModalPurchase1 show={show} setShow={setShow} handleCoupons={handleCoupons} userId={userData?.id} />
        </Container>}
    </>
  )
}
export default Purchase;
