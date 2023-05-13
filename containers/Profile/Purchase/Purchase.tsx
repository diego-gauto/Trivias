import React, { useEffect, useState } from "react";
import Link from "next/link";
import InputMask from "react-input-mask";
import router, { useRouter } from "next/router";
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAuth } from "../../../hooks/useAuth";
import { BackgroundLoader, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import {
  Container,
  LoaderContainSpinner,
} from "./Purchase.styled";
import ModalError from "./Modal1/ModalError";
import ErrorModal from "../../../components/Error/ErrorModal";
import { addUserCouponApi, createInvoiceApi, createPaymentMethodApi, getCourseForCheckoutApi, stripePaymentApi, stripeSubscriptionApi } from "../../../components/api/checkout";
import { getUserApi, updateMembership } from "../../../components/api/users";
import { retrieveCoupons } from "../../../components/api/admin";

const Purchase = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const [error, setError] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [step2, setStep2] = useState(false);
  const [payment, setPayment] = useState(false);
  const [cardInfo, setCardInfo] = useState(true);
  const [paypal, setPaypal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [pay, setPay] = useState(false);
  const [coupon, setCoupon] = useState<any>();
  const [coupons, setCoupons] = useState<any>([]);
  const [code, setCode] = useState('');
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });
  const [defaultCard, setDefaultCard] = useState<any>({});
  const [product, setProduct] = useState<any>({});
  const [plan, setPlan] = useState<any>({ method: 'stripe' });
  const [cards, setCards] = useState<Array<any>>(new Array());
  const router = useRouter()
  const { type, id, trial } = router.query;
  const [loader, setLoader] = useState<any>(false);

  const subscription = {
    price: 149.00,
    title: 'Gonvar Plus',
    duration: 'Mensual'
  }

  useEffect(() => {
    if (localStorage.getItem("email")) {
      localStorage.removeItem("trial")
      getUserApi(localStorage.getItem("email")).then((res) => {
        getAllCoupons();
        setPaypal(!paypal)
        if (type == 'subscription') {
          setProduct({ ...product, title: subscription.title, price: subscription.price, duration: subscription.duration, type: 'Suscripción' })
          setPaypal(false);
        } else {
          getCourseForCheckoutApi(id).then((res: any) => {
            setProduct({ ...product, title: res.title, price: res.price, duration: res.duration, type: 'course', img: res.image });
            setPaypal(false);
          })
        }
        guardCheckout(res);
        let cards = res.payment_methods;
        if (cards.length > 0) {
          setPayment(true);
          if (cards.filter((x: any) => x.default).length === 0) {
            cards[0].default = true;
          }
          cards.forEach((element: any) => {
            if (element.default) {
              let tempCard = {
                paymentMethod: element.id,
                status: false,
                exp_month: element.card.exp_month,
                exp_year: element.card.exp_year
              }
              setDefaultCard({ ...tempCard });
            }
          });
        }
        setUserData(res);
        setCards(res.payment_methods);
        setLoggedIn(true);
        setIsLoading(false);
      })
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('trial') == "true") {
        localStorage.setItem("trial", "true");
      }
      if (searchParams.get('type') === "subscription") {
        localStorage.setItem("sub", "true");
      }
      window.location.href = "/auth/Register";
      setLoggedIn(false)
    }
  }, [])

  const guardCheckout = (userData: any) => {
    let today = new Date().getTime() / 1000;
    if (router.query.type == "subscription" && userData.level === 1) {
      window.location.href = "/Preview";
    }
  }

  useEffect(() => {
    if (payment) {
      if (cards.length > 0) {
        if (cards.filter((x: any) => x.default).length === 0) {
          cards[0].default = true;
        }
        cards.forEach((element: any) => {
          if (element.default) {
            let tempCard = {
              paymentMethod: element.id,
              status: false,
              exp_month: element.card.exp_month,
              exp_year: element.card.exp_year
            }
            setDefaultCard({ ...tempCard });
          }
        });
      }
    }
  }, [payment])

  const setDefault = (idx: any) => {
    let tempCard = {
      paymentMethod: cards[idx].id,
      status: false,
      exp_month: cards[idx].card.exp_month,
      exp_year: cards[idx].card.exp_year
    }
    setDefaultCard(tempCard);
  }

  const handleConfirm = async () => {
    setLoader(true);
    if (cardInfo) {
      delete card.brand
      delete card.cardId
      delete card.last4
      delete card.status
      delete card.paymentMethod
    }
    if (cardInfo && Object.keys(card).some(key => card[key] === '')) {
      setError(true);
      setLoader(false)
    }
    if (cardInfo && Object.values(card).every(value => value !== '')) {
      createPaymentMethodApi(card).then((res) => {
        if (res.status === 400) {
          setError(true);
          setErrorMsg("Hay un error en los datos de la tarjeta!")
          setLoader(false);
        } else {
          setCard({ ...card, cardId: res.id, brand: res.card.brand, last4: res.card.last4, status: true })
        }
      })
    }
    if (payment && defaultCard.paymentMethod) {
      FinishPayment();
    }
    if (plan.method == 'paypal') {
      setPaypal(!paypal);
    }
  }

  const FinishPayment = async () => {
    if (plan.method == 'stripe') {
      if (type == 'subscription') {
        const data = {
          new: card.cardId ? card.status : false,
          cardId: card.cardId,
          paymentMethod: card.cardId ? card.paymentMethod : defaultCard.paymentMethod,
          stripeId: userData.stripe_id,
          priceId: !trial ? '9d8fa0e3-2977-46dc-8cb2-19024cd66bb9' : "45f502b3-3e0c-492e-986a-4e0e85e1a34d",
          method: 'stripe'
        }
        stripeSubscriptionApi(data).then((res) => {
          if (res.error) {
            setCard({ ...card, cardId: "" })
            if (res.error.raw.code == "card_declined" || "expired_card" || "incorrect_cvc" || "processing_error" || "incorrect_number") {
              setError(true);
              setErrorMsg(res.error.raw.code == "card_declined" && (
                res.error.raw.decline_code == "generic_decline" && "Pago Rechazado" ||
                res.error.raw.decline_code == "insufficient_funds" && "Tarjeta rechazada: fondos insuficientes" ||
                res.error.raw.decline_code == "lost_card" && "Pago Rechazado: Tarjeta extraviada" ||
                res.error.raw.decline_code == "stolen_card" && "Pago Rechazado: Tarjeta robada"
              ) ||
                res.error.raw.code == "expired_card" && "Tarjeta expirada" ||
                res.error.raw.code == "incorrect_cvc" && "Codigo incorrecto" ||
                res.error.raw.code == "processing_error" && "Error de proceso" ||
                res.error.raw.code == "incorrect_number" && "Tarjeta Incorrecta")
            }
            setLoader(false);
          } else {
            localStorage.removeItem("trial")
            setPay(true);
            setLoader(false);
            updateMembership({ ...plan, final_date: res.subscription.current_period_end, payment_method: card.cardId || card.paymentMethod, plan_id: res.subscription.id, plan_name: product.title, start_date: new Date().getTime() / 1000, userId: userData.user_id })
            setConfirmation(false);
          }
        })
      } else {
        let price = product.price
        if (coupon) {
          if (coupon.type == 'amount') {
            price = price - coupon.discount;
          } else {
            price = (price - (coupon.discount / 100) * price)
          }
        }
        const data = {
          new: card.cardId ? card.status : false,
          cardId: card.cardId,
          paymentMethod: card.cardId ? card.paymentMethod : defaultCard.paymentMethod,
          stripeId: userData.stripe_id,
          amount: price,
          method: 'stripe',
          userId: userData.user_id
        }
        stripePaymentApi(data).then(async (res) => {
          if (res.error) {
            setCard({ ...card, cardId: "" })
            if (res.error.raw.code == "card_declined" || "expired_card" || "incorrect_cvc" || "processing_error" || "incorrect_number") {
              setError(true);
              setErrorMsg(res.error.raw.code == "card_declined" && (
                res.error.raw.decline_code == "generic_decline" && "Pago Rechazado" ||
                res.error.raw.decline_code == "insufficient_funds" && "Tarjeta rechazada: fondos insuficientes" ||
                res.error.raw.decline_code == "lost_card" && "Pago Rechazado: Tarjeta extraviada" ||
                res.error.raw.decline_code == "stolen_card" && "Pago Rechazado: Tarjeta robada"
              ) ||
                res.error.raw.code == "expired_card" && "Tarjeta expirada" ||
                res.error.raw.code == "incorrect_cvc" && "Codigo incorrecto" ||
                res.error.raw.code == "processing_error" && "Error de proceso" ||
                res.error.raw.code == "incorrect_number" && "Tarjeta Incorrecta")
            }
            setLoader(false);
          } else {
            let invoice = {
              amount: res.paymentIntent.amount,
              product: product.title,
              method: 'stripe',
              user_id: userData.user_id,
              course_id: id,
              final_date: (new Date().getTime() / 1000) + product.duration * 86400
            }
            if (coupon) {
              let tempCoupon = {
                coupons_id: coupon.id,
                user_id: userData.user_id
              }
              await addUserCouponApi(tempCoupon)
            }
            createInvoiceApi(invoice).then((res) => {
              setConfirmation(false);
              setPay(true);
              setLoader(false);
            })
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
        }
        let invoice = {
          amount: price * 100,
          product: product.title,
          method: 'paypal',
          user_id: userData.user_id,
          course_id: id,
          final_date: (new Date().getTime() / 1000) + product.duration * 86400
        }
        if (coupon) {
          let tempCoupon = {
            coupons_id: coupon.id,
            user_id: userData.user_id
          }
          await addUserCouponApi(tempCoupon)
        }
        createInvoiceApi(invoice).then((res) => {
          setConfirmation(false);
          setPay(true);
          setLoader(false);
        })
      }
    }
  }

  const getAllCoupons = () => {
    retrieveCoupons().then((res) => {
      res.data.coupons.forEach((element: any) => {
        let tempUsers: any = []
        element.users.forEach((user: any) => {
          tempUsers.push(user.user_id);
        });
        element.users = tempUsers;
      });
      setCoupons(res.data.coupons);
    })
  }

  const handleCoupons = (value: any) => {
    setCoupon(value);
  }

  const checkCoupon = () => {
    let coupon;
    setPaypal(true)
    coupon = coupons.filter((x: any) => x.code == code && x.status);
    if (coupon.length > 0) {
      if (coupon[0].users.includes(userData?.user_id)) {
        setCouponError(true);
        setErrorMsg("Este cupón ya ha sido canjeado")
        setCode('');
      } else {
        coupon[0].users.push(userData?.user_id);
        handleCoupons({ ...coupon[0] });
        setCode('');
      }
    } else {
      setCouponError(true);
      setErrorMsg('Este cupón no existe!')
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

  return (
    <>
      {isLoading ? <BackgroundLoader>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader> :
        <Container>
          {(pay && !loader) && <div className="static-modal">
            <div className="modal-costum">
              <h1>¡Grandes noticias, <span>{user}!</span></h1>
              <p><span>¡Tu compra ha sido exitosa!</span> Enviamos el <br />
                recibo de pago a tu correo electrónico. <br /> <br />

                Ahora formas parte de la comunidad Gonvar+. <br />
                <b>¡No esperes más y comienza a aprender!</b></p>

              <button className="full">
                <Link href="/Preview">Ver los cursos</Link>
              </button>
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
              <p className="title">Ya puedes realizar tu compra, <span>{userData.name}!</span></p>
              <div className="security-info">
                <div className="top">
                  <AiFillLock></AiFillLock>
                  <p>Pago <span>100% seguro</span></p>
                </div>
                <p>Este certificado garantiza la seguridad de todas tus conexiones mediante cifrado. <br />
                  Tus tarjetas se guardan de forma segura para que puedas reutilizar el método de pago.</p>
              </div>
              <img className="cards" src="../images/purchase/tarjetas_gonvar.png" alt="" />
              <div className="payment-methods">
                <div className="stripe">
                  {cards.length === 0 ? null :
                    <div className="option">
                      <input type="radio" checked={payment} onClick={() => {
                        setPayment(true),
                          setCardInfo(false),
                          setPlan({ method: 'stripe' })
                        setCard({ ...card, cardId: "" })
                      }} />
                      <p>Pagaré con <span>tarjetas guardadas</span></p>
                    </div>
                  }
                  {payment && <select className="cards" onChange={(e) => {
                    setDefault(e.target.value)
                  }}>
                    <option value="" disabled>--</option>
                    {cards.map((x: any, idC: number) => {
                      return (
                        <option key={"cards_pay_" + idC} value={idC} selected={x.default}>{x.card.last4}</option>
                      )
                    })}
                  </select>}
                  <div className="option">
                    <input type="radio" checked={!payment} onClick={() => {
                      setPayment(false);
                      setCardInfo(true);
                      setPlan({ method: 'stripe' });
                      delete card.paymentMethod;
                      setCard({ ...card, cardId: "" })
                    }} />
                    <p>Pagaré con <span>tarjeta de crédito o débito</span></p>
                  </div>
                  {!payment && <div className="form-row">
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
                  </div>}
                  <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                    <div className="form-row">
                      <label>Fecha de expiración</label>
                      {!payment ? <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                        <select className="short" onChange={(e) => {
                          setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                        }}>
                          {payment && defaultCard &&
                            cards.map((x: any, idC: number) => {
                              console.log('hola pap', x.defaultCard)
                              return (
                                <option value={x.exp_month} selected={x.defaultCard} hidden>{(x.exp_month < 10) ? '0' + x.exp_month.toString() : x.exp_month.toString()}</option>
                              )
                            })
                          }
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
                          {payment && defaultCard &&
                            cards.map((x: any, idC: number) => {
                              return (
                                <option value={idC} selected={defaultCard == x} hidden>{x.exp_year - 2000}</option>
                              )
                            })
                          }
                          <option value="">Año</option>
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
                          <option value="35">35</option>
                        </select>
                      </div> :
                        <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                          <input className="short" disabled={payment} value={defaultCard.exp_month} />
                          <input className="short" disabled={payment} value={defaultCard.exp_year} />
                        </div>}
                    </div>
                    <div className="form-row">
                      <label>CVV</label>
                      <input className="short" type="password" disabled={payment} placeholder="∗∗∗" maxLength={4} onChange={(e) => {
                        setCard((card: any) => ({ ...card, cvc: e.target.value }));
                      }} />
                    </div>
                  </div>
                  {!loader && <button onClick={handleConfirm}>Confirmar compra</button>}
                  {(loader) && <LoaderContainSpinner />}
                </div>
                {!trial && <div className="paypal" onClick={() => {

                }}>
                  {!paypal && <PayPalScriptProvider deferLoading={paypal} options={{
                    "client-id": "ATu3hpVYAX9Jq288cIdG2ZU0WftbBjcKGt0cwEe7naroEao2JgBfBmpQXGaxSwDgUEP4mc4l8JNJjBbz",
                    currency: "MXN",
                    'vault': true,
                  }}
                  >
                    {type == 'subscription' && <PayPalButtons
                      style={{
                        color: "blue",
                        tagline: false,
                        layout: 'horizontal',
                        shape: 'pill',
                        height: 50,

                      }}
                      createSubscription={(data, actions) => {
                        setPlan({ method: "paypal" })
                        return actions.subscription.create({
                          plan_id: 'P-2P063165RR167053TMRKD7BQ'
                        })
                      }}
                      onApprove={(data: any, actions) => {
                        let today = new Date().getTime() / 1000;
                        let finalDate = 0;
                        finalDate = today + 2629800;
                        updateMembership({ method: "paypal", final_date: finalDate, plan_id: data.subscriptionID, plan_name: product.title, start_date: new Date().getTime() / 1000, userId: userData.user_id })
                        setConfirmation(false);
                        setPay(true);
                        return data
                      }}
                    />}
                    {type == 'course' && <PayPalButtons
                      style={{
                        color: "blue",
                        tagline: false,
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
                </div>}
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
          <div className="purchase-responsive">
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
            <div className="second-section">
              {type == "course" && <div className="coupon-container">
                <img src="../images/purchase/coupon.png" alt="" />
                <a>Haz click aquí</a>
                <p>si cuentas con un <br />
                  código de descuento.</p>
                <div className="coupon">
                  <input type="text" placeholder="gonvarbuenfin22" value={code} onChange={(e) => { setCode(e.target.value) }} />
                  <button onClick={checkCoupon}><FaArrowRight style={{ color: "white" }}></FaArrowRight></button>
                </div>
              </div>}
              {type == "course" && <div className="line"></div>}
              <div className="price-container">
                <p className="title" style={{ lineHeight: "25px", textAlign: "end" }}>Total <span>a pagar</span></p>
                {type == "subscription" && <p className="total">$ 149 <span>MXN</span></p>}
                {(type == "course" && !coupon) && <p className="total">$ {product.price} <span>MXN</span></p>}
                {(type == "course" && coupon) && <p className="total">$ {coupon.type == 'amount' ? (product.price - coupon.discount) :
                  (product.price - (coupon.discount / 100) * product.price)} <span>MXN</span></p>}
              </div>
            </div>
            <div className="slider-container">
              <div className="pay-slide">
                <p className="title">Ya puedes realizar <br /> tu compra, <span>{userData.name}!</span></p>
                <div className="info-container">
                  <div className="security-info">
                    <div className="top">
                      <AiFillLock></AiFillLock>
                      <p>Pago <span>100% seguro</span></p>
                    </div>
                    <p>Este certificado garantiza la seguridad de todas tus conexiones mediante cifrado. <br />
                      Tus tarjetas se guardan de forma segura para que puedas reutilizar el método de pago.</p>
                  </div>
                  <img src="../images/purchase/tarjetas_gonvar.png" alt="" />
                </div>
                <div className="payment-methods">
                  <div className="stripe">
                    {cards.length === 0 ? null :
                      <div className="option">
                        <input type="radio" checked={payment} onClick={() => {
                          setPayment(true),
                            setCardInfo(false),
                            setPlan({ method: 'stripe' })
                          setCard({ ...card, cardId: "" })
                        }} />
                        <p>Pagaré con <span>tarjetas guardadas</span></p>
                      </div>
                    }
                    {payment && <select className="cards" onChange={(e) => {
                      setDefault(e.target.value)
                    }}>
                      <option value="" disabled>--</option>
                      {cards.map((x: any, idC: number) => {
                        return (
                          <option key={"cards_pay_" + idC} value={idC} selected={x.default}>{x.card.last4}</option>
                        )
                      })}
                    </select>}
                    <div className="option">
                      <input type="radio" checked={!payment} onClick={() => {
                        setPayment(false);
                        setCardInfo(true);
                        setPlan({ method: 'stripe' });
                        delete card.paymentMethod;
                        setCard({ ...card, cardId: "" })
                      }} />
                      <p>Pagaré con <span>tarjeta de crédito o débito</span></p>
                    </div>
                    {!payment && <div className="form-row">
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
                    </div>}
                    <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                      <div className="form-row">
                        <label>Fecha de expiración</label>
                        {!payment ? <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                          <select className="short" onChange={(e) => {
                            setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                          }}>
                            {payment && defaultCard &&
                              cards.map((x: any, idC: number) => {
                                console.log('hola pap', x.defaultCard)
                                return (
                                  <option value={x.exp_month} selected={x.defaultCard} hidden>{(x.exp_month < 10) ? '0' + x.exp_month.toString() : x.exp_month.toString()}</option>
                                )
                              })
                            }
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
                            {payment && defaultCard &&
                              cards.map((x: any, idC: number) => {
                                return (
                                  <option value={idC} selected={defaultCard == x} hidden>{x.exp_year - 2000}</option>
                                )
                              })
                            }
                            <option value="">Año</option>
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
                            <option value="35">35</option>
                          </select>
                        </div> :
                          <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                            <input className="short" disabled={payment} value={defaultCard.exp_month} />
                            <input className="short" disabled={payment} value={defaultCard.exp_year} />
                          </div>}
                      </div>
                      <div className="form-row">
                        <label>CVV</label>
                        <input className="short" type="password" disabled={payment} placeholder="∗∗∗" maxLength={4} onChange={(e) => {
                          setCard((card: any) => ({ ...card, cvc: e.target.value }));
                        }} />
                      </div>
                    </div>
                    {!loader && <button onClick={handleConfirm}>Confirmar compra</button>}
                    {(loader) && <LoaderContainSpinner />}
                  </div>
                  {!trial && <div className="paypal" onClick={() => {

                  }}>
                    {!paypal && <PayPalScriptProvider deferLoading={paypal} options={{
                      "client-id": "ATu3hpVYAX9Jq288cIdG2ZU0WftbBjcKGt0cwEe7naroEao2JgBfBmpQXGaxSwDgUEP4mc4l8JNJjBbz",
                      currency: "MXN",
                      'vault': true,
                    }}
                    >
                      {type == 'subscription' && <PayPalButtons
                        style={{
                          color: "blue",
                          tagline: false,
                          layout: 'horizontal',
                          shape: 'pill',
                          height: 50,

                        }}
                        createSubscription={(data, actions) => {
                          setPlan({ method: "paypal" })
                          return actions.subscription.create({
                            plan_id: 'P-2P063165RR167053TMRKD7BQ'
                          })
                        }}
                        onApprove={(data: any, actions) => {
                          let today = new Date().getTime() / 1000;
                          let finalDate = 0;
                          finalDate = today + 2629800;
                          updateMembership({ method: "paypal", final_date: finalDate, plan_id: data.subscriptionID, plan_name: product.title, start_date: new Date().getTime() / 1000, userId: userData.user_id })
                          setConfirmation(false);
                          setPay(true);
                          return data
                        }}
                      />}
                      {type == 'course' && <PayPalButtons
                        style={{
                          color: "blue",
                          tagline: false,
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
                  </div>}
                </div>
                {/* <div className="payment-methods">
                  <div className="stripe">
                    <div className="option">
                      <input type="radio" checked={cardInfo} onClick={() => {
                        setPayment(false),
                          setCardInfo(!cardInfo),
                          setPlan({ method: 'stripe' })
                      }} />
                      <p>Pagaré con <span>tarjeta de crédito o débito</span></p>
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
                  {!trial && <div className="paypal" onClick={() => {

                  }}>
                    {!paypal && <PayPalScriptProvider deferLoading={paypal} options={{
                      "client-id": "ATu3hpVYAX9Jq288cIdG2ZU0WftbBjcKGt0cwEe7naroEao2JgBfBmpQXGaxSwDgUEP4mc4l8JNJjBbz",
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
                          tagline: false
                        }}
                        createSubscription={(data, actions) => {
                          setPlan({ method: "paypal" })
                          return actions.subscription.create({
                            plan_id: 'P-2P063165RR167053TMRKD7BQ'
                          })
                        }}
                        onApprove={(data: any, actions) => {
                          let today = new Date().getTime() / 1000;
                          let finalDate = 0;
                          finalDate = today + 2629800;
                          updateMembership({ method: "paypal", final_date: finalDate, plan_id: data.subscriptionID, plan_name: product.title, start_date: new Date().getTime() / 1000, userId: userData.user_id })
                          setConfirmation(false);
                          setPay(true);
                          return data
                        }}
                      />}
                      {type == 'course' && <PayPalButtons
                        style={{
                          color: "gold",
                          layout: 'horizontal',
                          shape: 'pill',
                          height: 50,
                          tagline: false
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
                  </div>}
                </div> */}
              </div>
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
              </div>
              <div className="bottom">
                <p className="terms">Al confirmar tu compra, aceptas los <br />
                  <span>términos, condiciones y políticas de Gonvar</span></p>
                <div className="bg"></div>
                <img className="hand" src="../images/purchase/neworange.png" alt="" />
              </div>
            </div>
          </div>
          {/* <ModalPurchase1 show={show} setShow={setShow} handleCoupons={handleCoupons} userId={userData?.id} /> */}
          <ModalError error={error} setError={setError} errorMsg={errorMsg}></ModalError>
          <ErrorModal show={couponError} setShow={setCouponError} error={errorMsg}></ErrorModal>
        </Container>}
    </>
  )
}
export default Purchase;
