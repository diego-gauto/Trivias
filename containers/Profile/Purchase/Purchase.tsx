import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Form, Row } from "react-bootstrap";
import InputMask from "react-input-mask";

import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import router, { useRouter } from "next/router";
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { db, functions } from "../../../firebase/firebaseConfig";
import { useAuth } from "../../../hooks/useAuth";
import { Background, BackgroundLoader, LoaderContain, LoaderImage, PurpleButton2 } from "../../../screens/Login.styled";
import { getCoupons, updateCoupon } from "../../../store/actions/CouponsActions";
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
  VisaLogo,
  MastercardLogo,
  AmexLogo,
} from "./Purchase.styled";
import PurchaseComplete from "./PurchaseComplete";
import PurchaseDetails from "./PurchaseDetails";
import { getPaidCourses } from "../../../store/actions/UserActions";
import ModalError from "./Modal1/ModalError";

const Purchase = () => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const [userData, setUserData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [step2, setStep2] = useState(false);
  const [payment, setPayment] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const [process, setProcess] = useState(true);
  const [paypal, setPaypal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [pay, setPay] = useState(false);
  const [coupon, setCoupon] = useState<any>();
  const [coupons, setCoupons] = useState<any>([]);
  const [code, setCode] = useState('');
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
          setUser(e.data().name);
          getPaymentmethods(e.id).then((res) => {
            setCards(res);
            res.forEach((element: any) => {
              temp_cards.push(false)
            });
            setDefaultCard(temp_cards)
          })
          setUserData({ ...e.data(), id: e.id })
          if (type == 'subscription') {
            setProduct({ ...product, title: subscription.title, price: subscription.price, duration: subscription.duration, type: 'Suscripción' })
          } else {
            getWholeCourse(id).then((res: any) => {
              setProduct({ ...product, title: res.courseTittle, price: res.coursePrice, duration: res.courseDuration, type: 'course', category: res.courseCategory, lessons: res.totalLessons, img: res.coursePath })
            })
          }
        });
        setIsLoading(false);
        // setPaypal(true);
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
      // else {
      //   if (res[0].id == router.query.id) {
      //     window.location.href = "/Preview";
      //   }
      // }
    })
  }

  useEffect(() => {

    fetchDB_data();

  }, [loggedIn]);

  useEffect(() => {
    getAllCoupons();
    setPaypal(!paypal)
    if (type == 'subscription') {
      setProduct({ ...product, title: subscription.title, price: subscription.price, duration: subscription.duration, type: 'Suscripción' })
      setPaypal(false);
    } else {
      getWholeCourse(id).then((res: any) => {
        setProduct({ ...product, title: res.courseTittle, price: res.coursePrice, duration: res.courseDuration, type: 'course', category: res.courseCategory, lessons: res.totalLessons, img: res.coursePath })
        setPaypal(false);
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
    setLoader(true);
    if ((!cardInfo && !payment && plan.method !== 'paypal') || (!cardInfo && payment && !card.paymentMethod)) {
      setError(true);
      setErrorMsg("Por favor seleccione un método de pago!")
    }
    if (cardInfo) {
      delete card.brand
      delete card.cardId
      delete card.last4
      delete card.status
      delete card.paymentMethod
    }
    if (cardInfo && Object.keys(card).some(key => card[key] === '')) {
      setError(true);
      // alert('Por favor acomplete todos los campos!')
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
          setError(true);
          // alert("Hay un error en los datos de la tarjeta!")
        } else {
          setCard({ ...card, cardId: res.data.id, brand: res.data.card.brand, last4: res.data.card.last4, status: true })
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
    }
    setLoader(false);
  }

  const FinishPayment = async () => {
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
  const getAllCoupons = () => {
    getCoupons().then((res: any) => {
      setCoupons(res);
    })
  }

  const checkCoupon = () => {
    let coupon;
    setPaypal(true)
    coupon = coupons.filter((x: any) => x.code == code && x.status);
    if (coupon.length > 0) {
      if (coupon[0].users.includes(userData?.id)) {
        alert("Este cupón ya ha sido canjeado");
        setCode('');
      } else {
        coupon[0].users.push(userData?.id);
        handleCoupons({ ...coupon[0] });
        setCode('');
      }
    } else {
      alert('Este cupón no existe!');
      handleCoupons(null);
      setCode('');
    }
    setTimeout(() => {
      setPaypal(false)
    }, 500);
  }

  useEffect(() => {
    if (card.cardId) {
      FinishPayment();
    }
    if (plan.method == "paypal" && type == "course") {
      FinishPayment();
    }
  }, [card, plan])

  useEffect(() => {
    if (router.query.type == "subscription" && userData?.membership.level == 1) {
      window.location.href = "/Preview";
    }
    if (userData !== null) {
      getUserCourses(userData.id);
    }
  }, [isLoading])

  return (
    <>
      {isLoading ? <BackgroundLoader>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader> :
        <Container>
          {pay && <div className="static-modal">
            <div className="modal-costum">
              <h1>¡Grandes noticias, <span>{user}!</span></h1>
              <p><span>¡Tu compra ha sido exitosa!</span> Enviamos el <br />
                recibo de pago a tu correo electrónico. <br /> <br />

                Ahora formas parte de la comunidad Gonvar+. <br />
                <b>¡No esperes más y comienza a aprender!</b></p>

              <button className="full">
                <Link href="/Preview">Ver los cursos</Link>
              </button>
              <button>Ver el recibo del pedido</button>
            </div>
          </div>}
          <div className="purchase-container">
            <div className="left-section">
              <div className="steps">
                <div className="circle">
                  <FaCheck style={{ color: "white" }}></FaCheck>
                </div>
                <div className="line" style={{ backgroundColor: step2 ? '#9900ed' : 'none', border: step2 ? "none" : "" }}></div>
                {step2 ? <div className="circle">
                  <FaCheck style={{ color: "white" }}></FaCheck>
                </div> :
                  <div className="circle-no-fill">
                  </div>}
                <div className="left-info">
                  <p>Paso 1</p>
                  <div className="rect"></div>
                  <p className="lower">Configuración <br />
                    de la cuenta</p>
                </div>
                <div className="right-info">
                  <p>Paso 2</p>
                  <div className="rect"></div>
                  <p className="lower">Proceso <br />
                    de pago</p>
                </div>
              </div>
              <p className="title">Ya puedes realizar tu compra, <span>{user}!</span></p>
              <div className="security-info">
                <div className="top">
                  <AiFillLock></AiFillLock>
                  <p>Pago <span>100% seguro</span></p>
                </div>
                <p>Este certificado garantiza la seguridad de todas tus conexiones mediante cifrado. <br />
                  Tus tarjetas se guardan de forma segura para que puedas reutilizar el método de pago.</p>
              </div>
              <img src="../images/purchase/tarjetas_gonvar.png" alt="" />
              <div className="payment-methods">
                <div className="stripe">
                  <div className="option">
                    <input type="radio" checked={cardInfo} onClick={() => {
                      setPayment(false),
                        setCardInfo(!cardInfo),
                        setPlan({ method: 'stripe' })
                    }} />
                    <p>Pagaré con <span>tarjeta de crédito o débito</span></p>
                  </div>
                  <div className="option">
                    <input type="radio" checked={payment} onClick={() => {
                      setPayment(!payment),
                        setCardInfo(false),
                        setPlan({ method: 'stripe' })
                    }} />
                    <p>Pagaré con <span>tarjetas guardadas</span></p>
                  </div>
                  <div className="form-row">
                    <label>Número de tarjeta</label>
                    <InputMask type="text" mask='9999 9999 9999 9999' maskChar={null} placeholder="∗∗∗∗ ∗∗∗∗ ∗∗∗∗ ∗∗∗∗" onChange={(e: any) => {
                      setCard((card: any) => ({ ...card, number: e.target.value }));
                    }} />
                    <div className="form-row">
                      <label>Nombre</label>
                      <input type="text" placeholder="Nombre del Propietario" onChange={(e) => {
                        setCard((card: any) => ({ ...card, holder: e.target.value }));
                      }} />
                    </div>
                  </div>
                  <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                    <div className="form-row">
                      <label>Fecha de expiración</label>
                      <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                        <select className="short" onChange={(e) => {
                          setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                        }}>
                          <option value="">Mes</option>
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <select className="short" onChange={(e) => {
                          setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                        }}>
                          <option value="">Año</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <label>CVV</label>
                      <input className="short" type="password" placeholder="∗∗∗" maxLength={4} onChange={(e) => {
                        setCard((card: any) => ({ ...card, cvc: e.target.value }));
                      }} />
                    </div>
                  </div>
                  {!loader && <button onClick={handleConfirm}>Confirmar compra</button>}
                  {loader && <LoaderContainSpinner />}
                </div>
                <div className="paypal" onClick={() => {

                }}>
                  {!paypal && <PayPalScriptProvider deferLoading={paypal} options={{
                    "client-id": "AcoNY4gJGdLGKDXKh8FnQfKKYn1A7aAFeSJYqbpdLkVauf360_0UnGNN7penwq7EuJIPNCk-y7FRHxtR",
                    currency: "MXN",
                    'vault': true,
                  }}
                  >
                    {type == 'subscription' && <PayPalButtons
                      style={{
                        color: "blue",
                        layout: 'horizontal',
                        shape: 'pill',
                        height: 50,

                      }}
                      createSubscription={(data, actions) => {
                        setPlan({ method: "paypal" })
                        return actions.subscription.create({
                          plan_id: 'P-6P515571TU0367642MMDGG4Y'
                        })
                      }}
                      onApprove={(data: any, actions) => {
                        let today = new Date().getTime() / 1000;
                        let finalDate = 0;
                        finalDate = today + 2629800;
                        updateUserPlan({ ...plan, finalDate: finalDate, paymentMethod: '', id: data.subscriptionID, name: product.title, method: "paypal" }, userData.id).then(() => {
                          setConfirmation(false);
                          setPay(true);
                        })
                        return data
                      }}
                    />}
                    {type == 'course' && <PayPalButtons
                      style={{
                        color: "blue",
                        layout: 'horizontal',
                        shape: 'pill',
                        height: 50,
                      }}
                      createOrder={(data, actions) => {
                        let price = product.price;
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
                          setPlan({ method: "paypal" })
                        });
                      }}
                    />}
                  </PayPalScriptProvider>}
                  <i>Para seguir con este método de compra, deberás iniciar sesión con tu cuenta de PayPal.</i>
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="box">
                <p className="title">¿Qué estás adquiriendo?</p>
                <p className="subtitle">PRODUCTOS</p>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
                  {type == "subscription" ? <p className="title">Suscripción <span>Gonvar+</span> <sub>(Gonvar Plus)</sub></p> :
                    <p className="title" style={{ textAlign: "initial" }}>Curso <span>{product.title}</span></p>}
                </div>
                <div className="info">
                  <p>Obtén decenas de cursos y clases de decoración y aplicación de uñas por <span>$149 MXN/mes. </span><br /><br />
                    Aprende desde diseños de uñas, hasta cursos específicos desde cero en técnicas como: mano alzada,
                    stamping, uñas exprés, 3D <span>y muchos más.</span></p>
                  <img src="../images/purchase/chica_banner.png" alt="" />
                </div>
                {type == "course" && <div className="coupon-container">
                  <img src="../images/purchase/coupon.png" alt="" />
                  <a>Haz click aquí</a>
                  <p>si cuentas con un <br />
                    código de descuento.</p>
                  <div className="coupon">
                    <input type="text" placeholder="gonvarbuenfin22" value={code} onChange={(e) => { setCode(e.target.value) }} />
                    <button onClick={checkCoupon}><FaArrowRight style={{ color: "white" }}></FaArrowRight></button>
                  </div>
                  <div className="line"></div>
                </div>}
                <div className="price-container">
                  <p className="title" style={{ lineHeight: "25px", textAlign: "end" }}>Total <br /><span>a pagar</span></p>
                  {type == "subscription" && <p className="total">$ 149 <span>MXN</span></p>}
                  {(type == "course" && !coupon) && <p className="total">$ {product.price}<span>MXN</span></p>}
                  {(type == "course" && coupon) && <p className="total">$ {coupon.type == 'amount' ? (product.price - coupon.discount) :
                    (product.price - (coupon.discount / 100) * product.price)}<span>MXN</span></p>}
                </div>
                <div className="bg"></div>
                <img className="image" src="../images/purchase/neworange.png" alt="" />
              </div>
            </div>
          </div>
          <div className="purchase-info">
            <p>Los precios están sujetos a cambios sin previo aviso. Los códigos de descuento no son acumulables. <br />
              Al adquirir tu suscripción <b>Gonvar+</b>, obtienes acceso ilimitado a todos los cursos incluidos en la membresía
              para verlos todas las veces que desees durante el tiempo que cubra tu pago. <br />
              Cuentas con acceso a la comunidad exclusiva de <b>Gonvar</b> donde podrás intercambiar experiencias con
              los instructores. <br />
              La suscripción mensual <b>Gonvar+</b> es autorrenovable, por lo que el siguiente cobro se llevará a cabo exactamente
              un mes después de la inscripción inicial. <br />
              Al cancelar la renovación de la membresía, tu plan actual seguirá disponible hasta que termine el mes de
              duración. <b>Puedes cancelar en cualquier momento.</b> <br />
              Al confirmar tu compra, aceptas <b>los términos, condiciones y políticas de Gonvar.</b></p>
          </div>
          {/* <PayBox>
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
                            <PaymentMethod key={"cards " + index} active={defaultCard[index]} onClick={() => {
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
                            <div style={{ display: "flex", alignItems: "initialx" }}>
                              <InputCard style={{ flexGrow: 1 }} mask='9999 9999 9999 9999' maskChar={null} placeholder="XXXX XXXX XXXX XXXX" onChange={(e: any) => {
                                setCard((card: any) => ({ ...card, number: e.target.value }));

                              }}>
                              </InputCard>
                              {(card.number.startsWith("49") || card.number.startsWith("44") || card.number.startsWith("47") || card.number.startsWith("42")
                                || card.number.startsWith("45") || card.number.startsWith("48"))
                                && <VisaLogo></VisaLogo>}
                              {(card.number.startsWith("51"))
                                && <MastercardLogo></MastercardLogo>}
                              {(card.number.startsWith("34"))
                                && <AmexLogo></AmexLogo>}
                            </div>
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
          </PayBox> */}
          {/* <ModalPurchase1 show={show} setShow={setShow} handleCoupons={handleCoupons} userId={userData?.id} /> */}
          <ModalError error={error} setError={setError} errorMsg={errorMsg}></ModalError>
        </Container>}
    </>
  )
}
export default Purchase;
