import React, { useEffect, useState } from "react";

import { AiFillLock } from "react-icons/ai";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import InputMask from "react-input-mask";

import router, { useRouter } from "next/router";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { retrieveCoupons } from "../../../components/api/admin";
import {
  addUserCouponApi,
  conektaOxxoApi,
  conektaPaymentApi,
  conektaSpeiApi,
  conektaSubscriptionApi,
  createInvoiceApi,
  getCourseForCheckoutApi,
} from "../../../components/api/checkout";
import { conektaPm, getUserApi, updateMembership, updateUser } from "../../../components/api/users";
import ErrorModal from "../../../components/Error/ErrorModal";
import { LESSON_PATH, LOGIN_PATH, PREVIEW_PATH } from "../../../constants/paths";
import { BackgroundLoader, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import ModalError from "./Modal1/ModalError";
import { Container, LoaderContainSpinner } from "./Purchase.styled";
import OxxoModal from "./Modals/Oxxo";
import SpeiModal from "./Modals/Spei";
import { createNotification } from "../../../components/api/notifications";
import { getUsersStripe } from "../../../components/api/conekta/test";
import ActiveUserConekta from "../../../pages/auth/Modals/ActiveUserConekta";
import { SOCIALS_ARRAY } from "../../../constants/arrays";
import { returnPrice, returnPriceTag } from "../../../utils/functions";
import { IUserInfoResult } from "../../../interfaces/IUser";
declare let window: any
const Purchase = () => {
  const [userData, setUserData] = useState<IUserInfoResult>({} as IUserInfoResult);
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
  const [plan, setPlan] = useState<any>({ method: 'conekta' });
  const [cards, setCards] = useState<Array<any>>(new Array());
  const router = useRouter()
  const { type, id, trial, frequency, nailmasterplusanual, v }: any = router.query;
  const [loader, setLoader] = useState<any>(false);
  const [terms, setTerms] = useState(false);
  const courseId = new URLSearchParams(window.location.search);
  const [show, setShow] = useState<any>(false);
  const [barcode, setBarcode] = useState("");
  const [reference, setReference] = useState("");
  const [bank_ref, setBank_ref] = useState("");
  const [expiresAt, setExpiresAt] = useState();
  const [oxxoIsActive, setOxxoIsActive] = useState<boolean>(false);
  const [speiIsActive, setSpeiIsActive] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  let idC = courseId.get('id');
  let tempPrice = 0;
  if (frequency === "month" && v === "1") tempPrice = 149;
  if (frequency === "month" && v === "2") tempPrice = 249;
  if (frequency === "month" && v === "3") tempPrice = 459;
  if (frequency === "anual" && v === "1") tempPrice = 1599;
  if (frequency === "anual" && v === "2") tempPrice = 1599;
  if (frequency === "anual" && v === "3") tempPrice = 3497;
  if (frequency === "cuatrimestral" && v === "3") tempPrice = 1599;
  if (type === "course") tempPrice = 1599;
  const subscription = {
    price: tempPrice,
    title: 'Gonvar Plus',
    duration: 'Mensual'
  }

  useEffect(() => {
    window.Conekta.setPublicKey('key_U5yJatlpMvd1DhENgON5ZYx');
  }, [])

  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then(async (res) => {
        getAllCoupons();
        setPaypal(!paypal)
        if (type == 'subscription') {
          setProduct({ ...product, title: subscription.title, price: subscription.price, duration: subscription.duration, type: 'Suscripción' })
          setPaypal(false);
        }
        if (type == 'course') {
          getCourseForCheckoutApi(id).then((res: any) => {
            setProduct({ ...product, title: res.title, price: res.price, duration: res.duration, type: 'course', img: res.image });
            setPaypal(false);
          })
        }
        if (nailmasterplusanual == 'true') {
          getCourseForCheckoutApi(30).then((res: any) => {
            setProduct({ ...product, title: "Nails Master 3.0+Anualidad", price: 2599, duration: 90, type: 'course', img: res.image });
            setPaypal(false);
          })
        }
        guardCheckout(res);
        let body = {
          conekta_id: res.conekta_id
        }
        let conektaCards = await conektaPm(body);
        const conektaPaymentMethods = conektaCards.data.payment_methods.data
        const extractedProperties = conektaPaymentMethods.map(({ id, brand, last4, default: boolean, exp_month, exp_year }: any) => ({ id, brand, last4, default: boolean, exp_month, exp_year }));
        let cards = extractedProperties;
        if (cards.length > 0) {
          setCardInfo(false);
          setPayment(true);
          cards.forEach((element: any) => {
            if (element.default) {
              let tempCard = {
                paymentMethod: element.id,
                status: false,
                exp_month: element.exp_month,
                exp_year: element.exp_year
              }
              setDefaultCard({ ...tempCard });
            }
          });
        }
        setUserData(res);
        setCards(extractedProperties);
        setLoggedIn(true);
        setIsLoading(false);
      })
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('trial') == "true") {
        localStorage.setItem("trial", "true");
      }
      if (searchParams.get('type') === "subscription" && searchParams.get('frequency') === "month" && searchParams.get('v') === "1") {
        localStorage.setItem("month_1", "true");
      }
      if (searchParams.get('type') === "subscription" && searchParams.get('frequency') === "month" && searchParams.get('v') === "2") {
        localStorage.setItem("month", "true");
      }
      if (searchParams.get('type') === "subscription" && searchParams.get('frequency') === "anual") {
        localStorage.setItem("anual", "true");
      }
      if (searchParams.get('type') === "course") {
        localStorage.setItem("course", `${idC}`);
      }
      window.location.href = "/auth/Register";
      setLoggedIn(false)
    }
  }, [])
  const guardCheckout = (userData: IUserInfoResult) => {
    let today = new Date().getTime() / 1000;
    if (router.query.type == "course") {
      let user_course = userData.user_courses.filter((x: any) => x.course_id === +id);
      if ((user_course.length > 0 && user_course[0].final_date > new Date().getTime() / 1000)) {
        router.push({
          pathname: LESSON_PATH,
          query: { id: id, season: 0, lesson: 0 },
        });
      }
    }
    /*
      [1, 4, 7] son niveles donde las usuarias debería de encontrarse en reintento de pago
      El resto de los niveles no tienen 10 días de gracia, debido a que no deberían
      de encontrarse en este proceso.
    */
    if (router.query.type == "subscription"
      && (([1, 4, 7].includes(userData.level) && userData.final_date > today - 10 * 24 * 60 * 60)
        || [0, 5, 6, 8].includes(userData.level) && userData.final_date > today)) {
      window.location.href = PREVIEW_PATH;
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
              exp_month: element.exp_month,
              exp_year: element.exp_year
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
      exp_month: cards[idx].exp_month,
      exp_year: cards[idx].exp_year
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
      setLoader(false);
    }

    if (cardInfo && Object.values(card).every(value => value !== '')) {
      if (!terms) {
        setErrorMsg('Por favor de aceptar los terminos y condiciones para poder continuar!');
        setShow(true);
        setLoader(false);
        return
      }
      if (plan.method === 'conekta') {
        let tempCard = {
          card: {
            number: card.number.replaceAll(" ", ""),
            name: card.holder,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            cvc: card.cvc,
          }
        }
        window.Conekta.Token.create(
          tempCard,
          conektaSuccessResponseHandler,
          conektaErrorResponseHandler, 'web'
        );
      }
    }
    if (payment && defaultCard.paymentMethod) {
      if (!terms) {
        setErrorMsg('Por favor de aceptar los terminos y condiciones para poder continuar!');
        setShow(true);
        setLoader(false);
        return
      }
      FinishPayment();
    }
    if (plan.method == 'paypal') {
      setPaypal(!paypal);
    }
  }
  const conektaSuccessResponseHandler = (token: any) => {
    let tokenId = token.id
    setCard({ ...card, id: tokenId });
  }
  const conektaErrorResponseHandler = (response: any) => {
    setErrorMsg('Verifique que los datos de su tarjeta sean los correctos!');
    setShow(true);
    setLoader(false)
  };

  const FinishPayment = async () => {
    if (plan.method == 'paypal') {
      setLoader(false);
      if (type == 'subscription') {
        setConfirmation(false);
        setPay(true);
        // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
        window.location.href = getRouteByFrequency(frequency, true);
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
          final_date: (new Date().getTime() / 1000) + product.duration * 86400,
          newPlan: nailmasterplusanual === 'true' ? true : false
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
          if (id === "57") {
            window.location.href = "/pagoexitosonailsmaster";
          }
          if (id === "45") {
            window.location.href = "/pagoexitosoalineacion";
          }
        })
      }
    }
    if (plan.method === 'conekta') {
      if (type === 'course' || nailmasterplusanual === 'true') {
        let price = product.price
        if (coupon) {
          if (coupon.type == 'amount') {
            price = price - coupon.discount;
          } else {
            price = (price - (coupon.discount / 100) * price)
          }
        }
        let data = {
          id: card.id ? card.id : defaultCard.paymentMethod,
          conekta_id: userData.conekta_id,
          price: price * 100,
          product_name: product.title,
          userId: userData.user_id
        }
        conektaPaymentApi(data).then(async (res) => {
          if (res.status === 200) {
            let invoice = {
              amount: price * 100,
              product: product.title,
              method: 'conekta',
              user_id: userData.user_id,
              course_id: id,
              final_date: (new Date().getTime() / 1000) + product.duration * 86400,
              newPlan: nailmasterplusanual === 'true' ? true : false
            }
            if (coupon) {
              let tempCoupon = {
                coupons_id: coupon.id,
                user_id: userData.user_id
              }
              await addUserCouponApi(tempCoupon)
            }
            if (res.data.data.payment_status === "paid" || res.data.data.payment_status === "pending_payment") {

              createInvoiceApi(invoice).then((res) => {
                setConfirmation(false);
                setPay(true);

                if (id === "57") {
                  window.location.href = "/pagoexitosonailsmaster";
                }
                if (id === "45") {
                  window.location.href = "/pagoexitosoalineacion";
                }
              })
              return;
            } else {
              setCard({ ...card, cardId: "" });
              let error = "Su pago fue declinado"
              let notification = {
                userId: userData.user_id,
                type: "8",
                notificationId: '',
                amount: price,
                productName: product.title,
                frequency: ''
              }
              await createNotification(notification);
              if (id === "57") {
                window.location.href = `/pagofallidonailsmaster?error=${error}`;
              }
              if (id === "45") {
                window.location.href = `/pagofallidoalineacion?error=${error}`;
              }
              setLoader(false)
              return
            }
          }
          if (res.response.status === 400) {
            setCard({ ...card, cardId: "" });
            let notification = {
              userId: userData.user_id,
              type: "8",
              notificationId: '',
              amount: price,
              productName: product.title,
              frequency: ''
            }
            await createNotification(notification);
            let error = res.response.data.error.data.details[0].message
            if (id === "57") {
              window.location.href = `/pagofallidonailsmaster?error=${error}`;
            }
            if (id === "45") {
              window.location.href = `/pagofallidoalineacion?error=${error}`;
            }
            setLoader(false)
          }
        })
      }
      if (type === 'subscription') {
        let price = "";
        if (trial === "true" && v === "1") price = "mes_gratis";
        if (trial === "true" && v === "2") price = "mes_gratis";
        if (trial === "true" && v === "3") price = "mes_gratis";
        if (frequency === "month" && v === "1") price = "mensual";
        if (frequency === "month" && v === "2") price = "mensual_v1_1";
        if (frequency === "month" && v === "3") price = "mensual_v1_2";
        if (frequency === "anual") price = "anual";
        if (frequency === "anual" && v === "3") price = "anual_v1_1";
        if (frequency === "cuatrimestral" && v === "3") price = "cuatrimestre";

        let data = {
          id: card.id ? card.id : defaultCard.paymentMethod,
          conekta_id: userData.conekta_id,
          plan_id: price,
          userId: userData.user_id
        }
        conektaSubscriptionApi(data).then(async (res) => {
          if (res?.data.data.status === 'active') {
            let sub = res.data.data;
            await updateMembership({ ...plan, final_date: sub.billing_cycle_end, payment_method: sub.card_id, plan_id: sub.id, plan_name: product.title, start_date: sub.billing_cycle_start, userId: userData.user_id, level: (frequency === "month" || trial === "true") ? 1 : frequency === "anual" ? 4 : 7 })
            // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
            window.location.href = getRouteByFrequency(frequency, true);
          } else {
            let notification = {
              userId: userData.user_id,
              type: "8",
              notificationId: '',
              amount: product.price,
              productName: product.title,
              frecuency: frequency
            }
            await createNotification(notification);
            const msg = "pago-rechazado"
            // window.location.href = frequency === "month" ? `/pagofallidomensualidad?error=${msg}` : `/pagofallidoanualidad?error=${msg}`;
            window.location.href = getRouteByFrequency(frequency, false, true, msg);
          }
        })
      }
    }
  }

  const getRouteByFrequency = (frequency: "month" | "anual" | "cuatrimestral", success: boolean, error: boolean = false, errorMessage?: string) => {
    // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
    let membership = '';
    const errorText = error ? `?error=${errorMessage}` : '';
    let successText = success ? 'exitoso' : 'fallido';
    switch (frequency) {
      case "month":
        membership = 'mensualidad';
        break;
      case "cuatrimestral":
        membership = 'cuatrimestre';
        break;
      case "anual":
        membership = 'anualidad';
        break;
    }
    const route = `/pago${successText}${membership}${errorText}`;
    return route;
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
    if (card.id) {
      FinishPayment();
    }
    if ((plan.method == "paypal" && type == "course") || (plan.method == "paypal" && nailmasterplusanual === 'true')) {
      FinishPayment();
    }
  }, [card, plan])

  const payWithOxxo = () => {
    const currentDate: any = new Date();
    const futureDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));

    let data = {
      conekta_id: userData.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: product.title,
      price: product.price * 100,
      meta: {
        type: type,
        course_id: type === "subscription" ? 0 : id,
        frecuency: type === "subscription" ? frequency : "",
        duration: type === "subscription" ? 0 : (new Date().getTime() / 1000) + product.duration * 86400
      }
    }
    conektaOxxoApi(data).then((res) => {
      let response = res.data.data;
      setBarcode(response.charges.data[0].payment_method.barcode_url);
      setReference(response.charges.data[0].payment_method.reference);
      setExpiresAt(response.charges.data[0].payment_method.expires_at)
      setOxxoIsActive(true);
    })
  }

  const payWitSpei = () => {
    const currentDate: any = new Date();
    const futureDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));

    let data = {
      conekta_id: userData.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: product.title,
      price: product.price * 100,
      meta: {
        type: type,
        course_id: type === "subscription" ? 0 : id,
        frecuency: type === "subscription" ? frequency : "",
        duration: type === "subscription" ? 0 : (new Date().getTime() / 1000) + product.duration * 86400
      }
    }

    conektaSpeiApi(data).then((res) => {
      const charges = res.data.data.charges.data[0];
      const reference = charges.payment_method.clabe;
      setBank_ref(reference);
      setSpeiIsActive(true);
    })
  }

  const returnPricePaypal = () => {
    let sub = ''
    if (frequency === "month" && v === "1") return sub = 'P-2P063165RR167053TMRKD7BQ';
    if (frequency === "anual" && v === "1") return sub = 'P-1VN62329L4770474AMSHBSZY';
    if (frequency === "month" && v === "2") return sub = 'P-2UH60720VG8742017MTYPHOQ';
    if (frequency === "anual" && v === "2") return sub = 'P-1VN62329L4770474AMSHBSZY';
    if (frequency === "month" && v === "3") return sub = 'P-1EG90467MN295414UMVEUKHI';
    if (frequency === "anual" && v === "3") return sub = 'P-0ND16663SN6195536MVEUMXI';
    if (frequency === "cuatrimestral" && v === "3") return sub = 'P-6RT70377G6729623WMVJLPYQ';
    return sub;
  }

  return (
    <>
      {isLoading ? <BackgroundLoader>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader> :
        <Container>
          {/* {
            frequency === "month" && v === "1" &&
            <ActiveUserConekta show={open} ondHide={() => { setOpen(false) }} user={userData} />
          } */}
          <ErrorModal show={show} setShow={setShow} error={errorMsg} />
          <OxxoModal show={oxxoIsActive} setShow={setOxxoIsActive} user={userData} product={product} barcode={barcode} reference={reference} expires_at={expiresAt} />
          <SpeiModal show={speiIsActive} setShow={setSpeiIsActive} user={userData} product={product} bank_ref={bank_ref} />
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
                          setPlan({ method: 'conekta' })
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
                        <option key={"cards_pay_" + idC} value={idC} selected={x.default}> **** **** **** {x.last4}</option>
                      )
                    })}
                  </select>}
                  <div className="option">
                    <input type="radio" checked={!payment} onClick={() => {
                      setPayment(false);
                      setCardInfo(true);
                      setPlan({ method: 'conekta' });
                      delete card.paymentMethod;
                      setCard({ ...card, cardId: "" })
                    }} />
                    <p>Pagaré con otra <span>tarjeta de crédito o débito</span></p>
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
                  <div className="terms-container">
                    <input type="checkbox" name="terms" id="terms" onChange={(e) => {
                      setTerms(e.target.checked)
                    }} />
                    <p className="terms">Al registrarte, aceptas los <a target="_blank" href="/terms-condition-subscription">términos, <br />
                      condiciones y políticas de Gonvar</a></p>
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
                          plan_id: returnPricePaypal()
                        })
                      }}
                      onApprove={async (data: any, actions) => {
                        let today = new Date().getTime() / 1000;
                        let finalDate = 0;
                        finalDate = today + frequency === "month" ? 2592000 : frequency === "anual" ? 31536000 : 10368000;
                        await updateMembership({
                          method: "paypal",
                          final_date: finalDate,
                          plan_id: data.subscriptionID,
                          plan_name: product.title,
                          start_date: new Date().getTime() / 1000,
                          userId: userData.user_id,
                          level: (frequency === "month" || trial === "true") ? 1 : frequency === "anual" ? 4 : 7,
                          type: product.price
                        })
                        setConfirmation(false);
                        setPay(true);
                        // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
                        window.location.href = getRouteByFrequency(frequency, true);
                        return data
                      }}
                    />}
                    {(type == 'course' || nailmasterplusanual === 'true') && <PayPalButtons
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
                {((type === "subscription" && (frequency === "anual" || frequency === "cuatrimestral")) || type === "course") && <img src="/images/purchase/oxxo.svg" onClick={payWithOxxo} />}
                {((type === "subscription" && (frequency === "anual" || frequency === "cuatrimestral")) || type === "course") && <img src="/images/purchase/spei.svg" onClick={payWitSpei} />}
              </div>
            </div>
            <div className="right-section">
              <div className="box">
                <p className="title">¿Qué estás adquiriendo?</p>
                <p className="subtitle">PRODUCTOS</p>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
                  {type == "subscription" ? <p className="title">Suscripción <span>Gonvar+ {(frequency === "month" || trial === "true") && "Mensual"} {frequency === "anual" && "Anual"} {frequency === "cuatrimestral" && "Cuatrimestral"}</span> <sub>(Gonvar Plus)</sub></p> :
                    <p className="title" style={{ textAlign: "initial" }}>Curso <span>{product.title}</span></p>}
                </div>
                <div className="info">
                  <p>Obtén decenas de cursos y clases de decoración y aplicación de uñas por <span>
                    ${returnPrice(trial, v, frequency, type, coupon, product.price)}
                  </span><br /><br />
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
                  <p dangerouslySetInnerHTML={{ __html: returnPriceTag(trial, v, frequency, type, coupon, product.price, nailmasterplusanual) }}></p>
                  {/* {(type == "subscription" && frequency === "month" && v === "1") && <p className="total">$ 149 <span>MXN</span></p>}
                  {(trial === "true" && v === "1") && <p className="total">$ 149 <span>MXN</span></p>}
                  {(type == "subscription" && frequency === "anual" && v === "1") && <p className="total">$ 1,599 <span>MXN</span></p>}
                  {(type == "subscription" && frequency === "month" && v === "2" && !trial) && <p className="total">$ 249 <span>MXN</span></p>}
                  {(trial === "true" && v === "2") && <p className="total">$ 249 <span>MXN</span></p>}
                  {(type == "subscription" && frequency === "anual" && v === "2") && <p className="total">$ 1,599 <span>MXN</span></p>}
                  {(type == "course" && !coupon) && <p className="total">$ {product.price}<span>MXN</span></p>}
                  {(type == "course" && coupon) && <p className="total">$ {coupon.type == 'amount' ? (product.price - coupon.discount) :
                    (product.price - (coupon.discount / 100) * product.price)}<span>MXN</span></p>}
                  {(nailmasterplusanual === "true") && <p className="total">$ 2,599 <span>MXN</span></p>} */}
                </div>
                <div className="bg"></div>
                <img className="image" src="../images/purchase/neworange.png" alt="" />
              </div>
            </div>
          </div>
          <div className="purchase-info">
            <p>Los precios están sujetos a cambios sin previo aviso. Los códigos de descuento no son acumulables.
              Al adquirir tu suscripción <b>Gonvar+</b>, obtienes acceso ilimitado a todos los cursos incluidos en la membresía
              para verlos todas las veces que desees durante el tiempo que cubra tu pago.
              Cuentas con acceso a la comunidad exclusiva de <b>Gonvar</b> donde podrás intercambiar experiencias con
              los instructores.</p><br />
            <p>La suscripción mensual <b>Gonvar+</b> es autorrenovable, por lo que el siguiente cobro se llevará a cabo exactamente
              un mes después de la inscripción inicial.</p><br />
            <p>Al cancelar la renovación de la membresía, tu plan actual seguirá disponible hasta que termine el mes de
              duración. <b>Puedes cancelar en cualquier momento.</b>
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
                {(type == "subscription" && frequency === "month") && <p className="title"><span>Suscripción Gonvar+ Mensual</span></p>}
                {(type == "subscription" && frequency === "anual") && <p className="title"><span>Suscripción Gonvar+ Anual</span></p>}
                {(type == "subscription" && frequency === "cuatrimestral") && <p className="title"><span>Suscripción Gonvar+ Cuatrimestral</span></p>}
                {(type == "course") && <p className="title"><span>{product.title}</span></p>}
                <p className="title" style={{ lineHeight: "25px", textAlign: "center" }}>Total <span>a pagar</span></p>
                <p dangerouslySetInnerHTML={{ __html: returnPriceTag(trial, v, frequency, type, coupon, product.price, nailmasterplusanual) }}></p>
                {/* {(type == "subscription" && frequency === "month" && v === "1") && <p className="total">$ 149 <span>MXN</span></p>}
                {(trial === "true" && v === "1") && <p className="total">$ 149 <span>MXN</span></p>}
                {(type == "subscription" && frequency === "anual" && v === "1") && <p className="total">$ 1,599 <span>MXN</span></p>}
                {(type == "subscription" && frequency === "month" && v === "2" && !trial) && <p className="total">$ 249 <span>MXN</span></p>}
                {(trial === "true" && v === "2") && <p className="total">$ 249 <span>MXN</span></p>}
                {(type == "subscription" && frequency === "anual" && v === "2") && <p className="total">$ 1,599 <span>MXN</span></p>}
                {(type == "course" && !coupon) && <p className="total">$ {product.price} <span>MXN</span></p>}
                {(type == "course" && coupon) && <p className="total">$ {coupon.type == 'amount' ? (product.price - coupon.discount) :
                  (product.price - (coupon.discount / 100) * product.price)} <span>MXN</span></p>}
                {(nailmasterplusanual === "true") && <p className="total">$ 2,599 <span>MXN</span></p>} */}
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
                            setPlan({ method: 'conekta' })
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
                          <option key={"cards_pay_" + idC} value={idC} selected={x.default}>**** **** **** {x.last4}</option>
                        )
                      })}
                    </select>}
                    <div className="option">
                      <input type="radio" checked={!payment} onClick={() => {
                        setPayment(false);
                        setCardInfo(true);
                        setPlan({ method: 'conekta' });
                        delete card.paymentMethod;
                        setCard({ ...card, cardId: "" })
                      }} />
                      <p>Pagaré con otra <span>tarjeta de crédito o débito</span></p>
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
                    <div className="terms-container">
                      <input type="checkbox" name="terms" id="terms" onChange={(e) => {
                        setTerms(e.target.checked)
                      }} />
                      <p className="terms">Al registrarte, aceptas los <a target="_blank" href="/terms-condition-subscription">términos, <br />
                        condiciones y políticas de Gonvar</a></p>
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
                            plan_id: returnPricePaypal()
                          })
                        }}
                        onApprove={async (data: any, actions) => {
                          let today = new Date().getTime() / 1000;
                          let finalDate = 0;
                          finalDate = today + frequency === "month" ? 2592000 : frequency === "anual" ? 31536000 : 10368000;
                          await updateMembership({
                            method: "paypal",
                            final_date: finalDate,
                            plan_id: data.subscriptionID,
                            plan_name: product.title,
                            start_date: new Date().getTime() / 1000,
                            userId: userData.user_id,
                            level: (frequency === "month" || trial === "true") ? 1 : frequency === "anual" ? 4 : 7,
                            type: product.price
                          })
                          setConfirmation(false);
                          setPay(true);
                          // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
                          window.location.href = getRouteByFrequency(frequency, true);
                          return data
                        }}
                      />}
                      {(type == 'course' || nailmasterplusanual === 'true') && <PayPalButtons
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
                  {((type === "subscription" && (frequency === "anual" || frequency === "cuatrimestral")) || type === "course") && <img src="/images/purchase/oxxo.svg" onClick={payWithOxxo} />}
                  {((type === "subscription" && (frequency === "anual" || frequency === "cuatrimestral")) || type === "course") && <img src="/images/purchase/spei.svg" onClick={payWitSpei} />}
                </div>
              </div>
              <div className="box">
                <p className="title">¿Qué estás adquiriendo?</p>
                <p className="subtitle">PRODUCTOS</p>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
                  {type == "subscription" ? <p className="title">Suscripción <span>Gonvar+ {(frequency === "month" || trial === "true")} {frequency === "anual" && "Anual"} {frequency === "cuatrimestral" && "Cuatrimestral"}</span> <sub>(Gonvar Plus)</sub></p> :
                    <p className="title" style={{ textAlign: "initial" }}>Curso <span>{product.title}</span></p>}
                </div>
                <div className="info">
                  <p>Obtén decenas de cursos y clases de decoración y aplicación de uñas por <span>
                    ${returnPrice(trial, v, frequency, type, coupon, product.price)} </span><br /><br />
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
