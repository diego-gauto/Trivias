import React, { useEffect, useState } from "react";

import { AiFillLock } from "react-icons/ai";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import InputMask from "react-input-mask";

import router from "next/router";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { PREVIEW_PATH } from "../../constants/paths";
import OxxoModal from "../../containers/Profile/Purchase/Modals/Oxxo";
import SpeiModal from "../../containers/Profile/Purchase/Modals/Spei";
import { LoaderContainSpinner } from "../../containers/Profile/Purchase/Purchase.styled";
import { useAuth } from "../../hooks/useAuth";
import { IUserInfoResult } from "../../interfaces/IUser";
import { returnPriceTag } from "../../utils/functions";
import { retrieveCoupons } from "../api/admin";
import { conektaOxxoApi, conektaSpeiApi, conektaSubscriptionApi } from "../api/checkout";
import { detachPaymentMethodConekta, setDefaultPaymentMethodConekta } from "../api/profile";
import { conektaPm, getUserApi, updateMembership } from "../api/users";
import { haveAccess } from "../GlobalFunctions";
import {
  Month,
  PayOptionsPurchase,
  PayOptionsPurchaseForMonthSuscription,
  Year,
} from "./constants";
import { checkEmpty } from "./functions";
import { IPayOption, IPm, TKey, TPayOptionId } from "./IRetryPayment";
import { PaymentMethods } from "./PaymentMethods/PaymentMethods";
import { PurchaseNewContainer } from "./PurchaseNew.styled";
import { getSubscription } from "./PurchaseNewFunctions";

declare let window: any;

interface ICardUser {
  paymentMethod: string
  status: boolean
  exp_month: string
  exp_year: string
}

type FrecuencyValue = 'cuatrimestral' | 'year' | 'month';

export const PurchaseNew2 = () => {
  // type, id, trial, frequency, nailmasterplusanual, v
  const { type, frequency, v, id, trial, nailmasterplusanual }: any = router.query;
  let userDataAuth: any = useAuth();
  const context = useAuth();
  const user = context.user;
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>([]);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<TPayOptionId>('card');
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [card, setCard] = useState<any>({
    cvc: '',
    exp_month: '',
    exp_year: '',
    number: '',
    holder: '',
  });
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState<any>({});
  const [reference, setReference] = useState('');
  const [bank_ref, setBank_ref] = useState('');
  const [expiresAt, setExpiresAt] = useState();
  const [oxxoIsActive, setOxxoIsActive] = useState<boolean>(false);
  const [speiIsActive, setSpeiIsActive] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  // const [loader, setLoader] = useState<boolean>(false);
  const [option, setOption] = useState(0);
  /*
  */
  // const [plan, setPlan] = useState<any>({ method: 'conekta' });
  const [coupon, setCoupon] = useState<any>();
  const [userData, setUserData] = useState<IUserInfoResult>({} as IUserInfoResult);
  const [paypal, setPaypal] = useState(false);
  const [coupons, setCoupons] = useState<any>([]);
  const [terms, setTerms] = useState(false);

  const courseId = new URLSearchParams(window.location.search);
  let idC = courseId.get('id');

  const subscription = getSubscription(type, frequency, v);

  useEffect(() => {
    window.Conekta.setPublicKey('key_U5yJatlpMvd1DhENgON5ZYx');
  }, []);

  const addNewCard = async () => {
    setLoaderAdd(!loaderAdd);
    let c: any = card;
    if (Object.keys(card).some((key: any) => c[key] === '')) {
      alert('Por favor acomplete todos los campos!');
      setLoaderAdd(false);
    } else {
      let tempCard = {
        card: {
          number: card.number.replaceAll(' ', '').replace(/\*/g, ''),
          name: card.holder,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc,
        },
      };

      window.Conekta.Token.create(
        tempCard,
        conektaSuccessResponseHandler,
        conektaErrorResponseHandler,
        'web',
      );
    }
  };

  const conektaSuccessResponseHandler = (token: any) => {
    let tokenId = token.id;
    setToken(tokenId);
    getPaymentMethods();
  };

  const conektaErrorResponseHandler = (response: any) => {
    alert('Hay un error en los datos de la tarjeta!');
    setLoaderAdd(false);
  };

  const changeElement = (key: TKey, value: string) => {
    let tempCard = { ...card };
    tempCard[key] = value;
    setCard(tempCard);
  };

  const handleAddpayment = () => {
    setAddPayment(!addPayment);
  };

  const changePaymentMethod = (pm: IPm) => {
    setLoaderAdd(true);
    let body = {
      payment_method: pm.id,
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id,
    };
    setDefaultPaymentMethodConekta(body).then((res) => {
      getPaymentMethods();
      setLoaderAdd(false);
    });
  };

  const getPaymentMethods = async () => {
    setLoaderAdd(true);
    let user = userDataAuth.user;

    if (haveAccess(user.level, user.final_date, user.role, user.method)) {
      // if (isNotValidToRetry(0, new Date(2024, 3, 18).getTime() / 1000, 'admin', 'conekta')) {
      router.push({ pathname: PREVIEW_PATH });
      return;
    }
    let body = {
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id,
    };
    try {
      const res = await conektaPm(body);
      console.log({ res });
      const conektaPaymentMethods = res.data.payment_methods.data;
      const extractedProperties = conektaPaymentMethods.map(
        ({ id, brand, last4, default: boolean }: IPm) => ({
          id,
          brand,
          last4,
          default: boolean,
        }),
      );
      // Valores random de prueba
      /*const pm = [{
        "id": "src_gYwRtNpSjFqLmKtRw",
        "brand": "visa",
        "last4": "9999",
        "default": true
      }];*/
      setPaymentMethods(extractedProperties); // pm
    } catch (error) {
      console.log({ error });
    }
    setLoaderAdd(false);
  };
  useEffect(() => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then(async (res) => {
        if (haveAccess(res.level, res.final_date, res.role as any, res.method)) {
          window.location.href = PREVIEW_PATH;
        }
        // getAllCoupons();
        // setPaypal(!paypal);
        if (type == 'subscription') {
          setProduct({
            ...product,
            title: subscription.title,
            price: subscription.price,
            duration: subscription.duration,
            type: 'Suscripción',
          });
          setPaypal(false);
        }
        /*if (type == 'course') {
          getCourseForCheckoutApi(id).then((res: any) => {
            setProduct({
              ...product,
              title: res.title,
              price: res.price,
              duration: res.duration,
              type: 'course',
              img: res.image,
            });
            setPaypal(false);
          });
        }*/
      });
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('trial') == 'true') {
        localStorage.setItem('trial', 'true');
      }
      if (searchParams.get('type') === 'subscription') {
        if (searchParams.get('frequency') === 'month') {
          const monthVersion = searchParams.get('v');
          if (monthVersion === '1') {
            localStorage.setItem('month_1', 'true');
          } else if (monthVersion === '2') {
            localStorage.setItem('month_2', 'true');
          } else if (monthVersion === '3') {
            localStorage.setItem('month', 'true');
          }
        }
        else if (searchParams.get('frequency') === 'anual') {
          const annualVersion = searchParams.get('v');
          if (['1', '2'].includes(annualVersion || '')) {
            localStorage.setItem('anual_1', 'true');
          } else if (annualVersion === '3') {
            localStorage.setItem('anual', 'true');
          }
        }
        else if (searchParams.get('frequency') === 'cuatrimestral') {
          const cuatriVersion = searchParams.get('v');
          if (['1', '2', '3'].includes(cuatriVersion || '')) {
            localStorage.setItem('cuatri', 'true');
          }
        }
      }
      if (searchParams.get('type') === 'course') {
        localStorage.setItem('course', `${idC}`);
      }
      window.location.href = '/auth/register';
    }
  }, []);

  useEffect(() => {
    if (userDataAuth.user) {
      getPaymentMethods();
    } else {
      router.push({ pathname: PREVIEW_PATH });
    }
  }, [userDataAuth]);

  useEffect(() => {
    if (token) {
      pay();
    }
  }, [token]);

  const getAllCoupons = () => {
    retrieveCoupons().then((res) => {
      res.data.coupons.forEach((element: any) => {
        let tempUsers: any = [];
        element.users.forEach((user: any) => {
          tempUsers.push(user.user_id);
        });
        element.users = tempUsers;
      });
      setCoupons(res.data.coupons);
    });
  };

  const getNewUserLevel = (level: number) => {
    if ([4, 5].includes(level)) return 4;
    if ([1, 6].includes(level)) return 1;
    return 7;
  };

  const getPlanIdByFrecuency = () => {
    if (frequency === 'cuatrimestral') {
      return `cuatrimestre`;
    } else if (frequency === 'month') {
      if (v === '1') {
        return 'mensual';
      } else if (v === '2') {
        return 'mensual_v1_1';
      }
      return 'mensual_v1_2';
    } else if (frequency === 'anual') {
      if (['1', '2'].includes(v)) {
        return 'anual';
      }
      return 'anual_v1_1';
    }
    return `cuatrimestre`;
  }

  const pay = async () => {
    const filter = paymentMethods.filter((card) => card.default);
    const pm = filter[0];
    let plan_id = getPlanIdByFrecuency();

    const conektaJson = {
      id: (token && addPayment) ? token : pm?.id,
      conekta_id: user.conekta_id,
      plan_id: plan_id,
      userId: user.user_id,
    };

    try {
      const res = await conektaSubscriptionApi(conektaJson);
      console.log({ res });
      if (res?.data.data.status === 'active') {
        const sub = res.data.data;
        const membership = {
          final_date: sub.billing_cycle_end,
          method: 'conekta',
          level: getNewUserLevel(user.level),
          payment_method: sub.card_id,
          plan_id: sub.id,
          plan_name: 'Gonvar Plus',
          start_date: sub.billing_cycle_start,
          type: user.type,
          userId: user.user_id,
        };
        await updateMembership(membership);
        // window.location.href = user.level === 5 ? "/pagoexitosoanualidad" : "/pagoexitosocuatrimestre";
        let url = '/pagoexitoso';
        if (frequency === 'month') {
          url += 'mensualidad';
        } else if (frequency === 'anual') {
          url += 'anualidad';
        } else if (frequency === 'cuatrimestral') {
          url += 'cuatrimestre';
        }
        window.location.href = url;
      } else {
        setLoaderAdd(false);
        setError(true);
      }
    } catch (error) {
      console.log({ conektaJson });
      console.log({ error });
    }
  };

  const getDurationByFrecuency = (): FrecuencyValue => {
    if (frequency === 'month') {
      return 'month';
    }

    if (frequency === 'anual') {
      return 'year';
    }

    if (frequency === 'cuatrimestral') {
      return 'cuatrimestral';
    }

    return 'cuatrimestral';
  };

  const payWithOxxo = async () => {
    const currentDate: any = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );

    console.log({ user: userDataAuth.user });

    let payOxxoJson = {
      conekta_id: userDataAuth.user.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: product.title,
      price: product.price * 100,
      meta: {
        type: type,
        course_id: type === 'subscription' ? 0 : id,
        frecuency: type === 'subscription' ? getDurationByFrecuency() : '',
        duration:
          type === 'subscription' ? 0 : Math.floor(new Date().getTime() / 1000) + (product.duration * 24 * 60 * 60),
      },
    };

    console.log({ payOxxoJson });

    try {
      const res = await conektaOxxoApi(payOxxoJson);
      console.log({ res });
      let response = res.data.data;
      setBarcode(response.charges.data[0].payment_method.barcode_url);
      setReference(response.charges.data[0].payment_method.reference);
      setExpiresAt(response.charges.data[0].payment_method.expires_at);
      setOxxoIsActive(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const payWitSpei = async () => {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );

    let speiJson = {
      conekta_id: userDataAuth.user.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: product.title,
      price: product.price * 100,
      meta: {
        type: type,
        course_id: type === 'subscription' ? 0 : id,
        frecuency: type === 'subscription' ? getDurationByFrecuency() : '',
        duration:
          type === 'subscription'
            ? 0
            : new Date().getTime() / 1000 + product.duration * 86400,
      },
    };

    try {
      const res = await conektaSpeiApi(speiJson);
      const charges = res.data.data.charges.data[0];
      const reference = charges.payment_method.clabe;
      setBank_ref(reference);
      setSpeiIsActive(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const returnFrecuency = () => {
    // if (user.level === 5 || user.level === 4) {
    //   return 'Anual';
    // } else if (user.level === 1 || user.level === 6) {
    //   return 'Mensual';
    // } else if (user.level === 7 || user.level === 8 || user.level === 0) {
    //   return 'Cuatrimestral';
    // } else {
    //   return 'NA ';
    // }
    return frequency === 'month' ? 'Mensual' : (frequency === 'anual' ? 'Anual' : 'Cuatrimestral');
  };

  const returnPrice = () => {
    if (frequency === 'cuatrimestral') {
      if (['1', '2', '3'].includes(v)) {
        return `1599 / Cuatrimestral `;
      }
    } else if (frequency === 'month') {
      if (v === '1') {
        return `149 / Mensual `;
      } else if (v === '2') {
        return `249 / Mensual `;
      } else if (v === '3') {
        return `459 / Mensual `;
      }
    } else if (frequency === 'anual') {
      if (v === '1' || v === '2') {
        return `1599 / Anual `;
      } else if (v === '3') {
        return `3497 / Anual `;
      }
    }
    return 1599;
  };

  const returnPriceType = () => {
    if (frequency === 'cuatrimestral') {
      if (['1', '2', '3'].includes(v)) {
        return 1599;
      }
    } else if (frequency === 'month') {
      if (v === '1') {
        return 149;
      } else if (v === '2') {
        return 249;
      } else if (v === '3') {
        return 459;
      }
    } else if (frequency === 'anual') {
      if (v === '1' || v === '2') {
        return 1599;
      } else if (v === '3') {
        return 3497;
      }
    }
    return 1599;
  };

  const detachPayment = async (card: IPm) => {
    setLoaderAdd(true);
    let body = {
      payment_method: card.id,
      conekta_id: user.conekta_id,
    };
    detachPaymentMethodConekta(body).then(() => {
      getPaymentMethods();
    });
  };

  const getRouteByFrequency = (
    frequency: 'month' | 'anual' | 'cuatrimestral',
    success: boolean,
    error: boolean = false,
    errorMessage?: string,
  ) => {
    // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
    let membership = '';
    const errorText = error ? `?error=${errorMessage}` : '';
    let successText = success ? 'exitoso' : 'fallido';
    switch (frequency) {
      case 'month':
        membership = 'mensualidad';
        break;
      case 'cuatrimestral':
        membership = 'cuatrimestre';
        break;
      case 'anual':
        membership = 'anualidad';
        break;
    }
    const route = `/pago${successText}${membership}${errorText}`;
    return route;
  };

  const returnPricePaypal = () => {
    let sub = '';
    if (frequency === 'month' && v === '1')
      return (sub = 'P-2P063165RR167053TMRKD7BQ');
    if (frequency === 'anual' && v === '1')
      return (sub = 'P-1VN62329L4770474AMSHBSZY');
    if (frequency === 'month' && v === '2')
      return (sub = 'P-2UH60720VG8742017MTYPHOQ');
    if (frequency === 'anual' && v === '2')
      return (sub = 'P-1VN62329L4770474AMSHBSZY');
    if (frequency === 'month' && v === '3')
      return (sub = 'P-1EG90467MN295414UMVEUKHI');
    if (frequency === 'anual' && v === '3')
      return (sub = 'P-0ND16663SN6195536MVEUMXI');
    if (frequency === 'cuatrimestral' && v === '3')
      return (sub = 'P-6RT70377G6729623WMVJLPYQ');
    return sub;
  };

  const getCSSClassByUserSituation = () => {
    if (paymentMethods.length === 0) {
      return 'add-payment-container show-contain';
    }
    return 'add-payment-container ' + (addPayment ? 'show-contain' : '');
  }
  if (!user) {
    return <div />;
  }

  return (
    <>
      <PurchaseNewContainer>
        <OxxoModal
          show={oxxoIsActive}
          setShow={setOxxoIsActive}
          user={user}
          product={product}
          barcode={barcode}
          reference={reference}
          expires_at={expiresAt}
        />
        <SpeiModal
          show={speiIsActive}
          setShow={setSpeiIsActive}
          user={user}
          product={product}
          bank_ref={bank_ref}
        />

        <div className='complete-contain'>
          <div className='main-container'>
            <div className='steps'>
              <div className='circle'>
                <FaCheck style={{ color: 'white' }}></FaCheck>
              </div>
              <div
                className='line'
                style={{
                  backgroundColor: 'none',
                  border: '',
                }}
              ></div>
              <div className='circle-no-fill'></div>
              <div className='left-info'>
                <p>Paso 1</p>
                <div className='rect'></div>
                <p className='lower'>
                  Configuración <br />
                  de la cuenta
                </p>
              </div>
              <div className='right-info'>
                <p>Paso 2</p>
                <div className='rect'></div>
                <p className='lower'>
                  Proceso <br />
                  de pago
                </p>
              </div>
            </div>
            <div className='security-info'>
              <div className='top'>
                <AiFillLock></AiFillLock>
                <p>
                  Pago <span>100% seguro</span>
                </p>
              </div>
              <p>Este certificado garantiza la seguridad de todas tus conexiones mediante cifrado.</p>
            </div>
            {paymentMethods.length > 0 && (
              <>
                <p className='description' style={{ textAlign: 'left' }}>
                  Selecciona uno de tus métodos de pago almacenados o agrega uno nuevo más abajo
                </p>
                <div className='payment-container'>
                  {!loaderAdd ? (
                    paymentMethods.map((pm: IPm, index: number) => {
                      return (
                        <PaymentMethods
                          pm={pm}
                          index={index}
                          pm_size={paymentMethods.length}
                          changePaymentMethod={changePaymentMethod}
                          key={'pm-' + index}
                          handleDelete={detachPayment}
                          isOnlyOne={paymentMethods.length === 1}
                        />
                      );
                    })
                  ) : (
                    <LoaderContainSpinner />
                  )}
                </div>
                {error && option === 0 && (
                  <p
                    className='description'
                    style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}
                  >
                    No hemos podido procesar tu pago, puedes intentar tu
                    pago nuevamente o dirigirte a "Agregar método de pago".
                  </p>
                )}
                <button
                  className={addPayment ? 'fade' : ''}
                  onClick={() => {
                    pay();
                    //addNewCard();
                    setOption(0);
                  }}
                >
                  Confirmar compra
                </button>
              </>
            )}
            {
              paymentMethods.length > 0 &&
              <button className='type2' onClick={handleAddpayment}>
                Agregar método de pago
                <FaChevronDown className={addPayment ? 'rotate' : ''} />
              </button>
            }
            <div
              className={
                getCSSClassByUserSituation()
              }
            >
              <p style={{
                fontWeight: '500'
              }}>Seleccione cualquiera de los métodos de pago disponibles</p>
              <div
                className='button-container'
                style={{
                  justifyContent: [1, 6].includes(user.level)
                    ? 'center'
                    : 'space-between',
                }}
              >
                {
                  (frequency === 'month'
                    ? PayOptionsPurchaseForMonthSuscription
                    : PayOptionsPurchase
                  ).map((pay: IPayOption, index: number) => {
                    return (
                      <div
                        className={
                          'box-container ' +
                          (selectedButton === pay.id ? 'selected-box' : '')
                        }
                        key={'pay-button' + index}
                        onClick={() => {
                          setSelectedButton(pay.id);
                          setTerms(false);
                        }}
                      >
                        {selectedButton === pay.id ? (
                          <img src={pay.img_select} />
                        ) : (
                          <img src={pay.img_unselect} />
                        )}
                        {pay.title !== '' && <p>{pay.title}</p>}
                      </div>
                    );
                  })}
              </div>
              {
                selectedButton === 'card' && (
                  <>
                    <div>
                      <img
                        style={{
                          width: '75%'
                        }}
                        src="/images/purchase/tarjetas_gonvar_purchasenew.png"
                        alt="card alternatives" />
                    </div>
                    <div className='card-container'>
                      <div className='left-side'>
                        <div className='input-container'>
                          <label>Número de la tarjeta</label>
                          <InputMask
                            placeholder='**** **** **** ****'
                            mask={
                              card.number.startsWith(37)
                                ? '9999 9999 9999 999'
                                : '9999 9999 9999 9999'
                            }
                            maskChar={'*'}
                            value={card.number}
                            onChange={(e) =>
                              changeElement('number', e.target.value)
                            }
                          />
                        </div>
                        <div className='input-container'>
                          <label>Nombre</label>
                          <input
                            value={card.holder}
                            placeholder='Nombre del propetario'
                            onChange={(e) =>
                              changeElement('holder', e.target.value)
                            }
                          />
                        </div>
                        <div className='inputs-column'>
                          <div className='input-container'>
                            <label>Mes</label>
                            <select
                              value={card.exp_month}
                              onChange={(e) =>
                                changeElement('exp_month', e.target.value)
                              }
                            >
                              <option disabled value={'MM'}>
                                MM
                              </option>
                              {Month.map((month: number, index: number) => {
                                return (
                                  <option key={'mes-' + index} value={month}>
                                    {month}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className='input-container'>
                            <label>Año</label>
                            <select
                              value={card.exp_year}
                              onChange={(e) =>
                                changeElement('exp_year', e.target.value)
                              }
                            >
                              <option disabled value={'AA'}>
                                AA
                              </option>
                              {Year.map((year: number, index: number) => {
                                return (
                                  <option key={'year-' + index} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className='input-container'>
                            <label>CVV</label>
                            <input
                              placeholder='***'
                              type='password'
                              value={card.cvc}
                              onChange={(e) =>
                                changeElement('cvc', e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className='right-side'>
                        <div
                          className={
                            'card-img ' +
                            (checkEmpty(card) ? 'background-checked ' : '')
                          }
                        >
                          <div className='square' />
                          <p className='number'>{card.number}</p>
                          <div className='last-data'>
                            <p>{card.holder}</p>
                            {(card.exp_month !== '' || card.exp_year !== '') && (
                              <div className='date'>
                                <p>mes/año</p>
                                <p>
                                  {card.exp_month}/{card.exp_year}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className='description-text'>
                      Presionando en el botón "Confirmar compra" estás dando tu
                      consentimiento para que Gonvar automáticamente continúe con
                      tu suscripción &nbsp;
                      {returnFrecuency()} y te cobremos $ {returnPrice()}
                      en el medio de pago que estás agregando hasta que tu decidas
                      cancelarla.
                      <br />
                      <br />
                      Puedes cancelar la suscripción en cualquier momento. Para
                      hacerlo, dirígite a tu perfil y presiona en el botón
                      "Cancelar suscripción"
                    </p>
                    <div style={{
                      paddingInline: '10px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <input
                        type="checkbox"
                        name=""
                        id="terms"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        style={{
                          width: '16px',
                          height: '16px',
                          alignSelf: 'center'
                        }}
                      />
                      <label
                        htmlFor="terms"
                        style={{
                          paddingLeft: '40px',
                          textAlign: 'left'
                        }}
                      >
                        Acepto los <a href="">términos, condiciones y políticas</a> de Gonvar
                      </label>
                    </div>
                    {error && option === 1 && (
                      <p
                        className='description-text'
                        style={{ color: 'red', textAlign: 'left' }}
                      >
                        No hemos podido procesar tu pago, puedes intentar tu
                        pago nuevamente o probar con otro método de pago.
                      </p>
                    )}
                    {loaderAdd ? (
                      <LoaderContainSpinner />
                    ) : (
                      <button
                        className='type3'
                        style={{
                          opacity: !terms ? '0.8' : '1'
                        }}
                        onClick={() => {
                          if (terms) {
                            addNewCard();
                            setOption(1);
                          }
                        }}
                        disabled={!terms}
                      >
                        Confirmar compra
                      </button>
                    )}
                  </>
                )}
              {
                selectedButton === 'oxxo' && (
                  <div>
                    <p className='description-text mb-5'>
                      Presiona el botón de generar ficha de pago oxxo para
                      visualizarla y poder descargarla. Una vez que abones en una
                      tienda Oxxo tardaremos máximo 48hs en procesar tu pago y a
                      continuación podrás comenzar con tus cursos
                    </p>
                    <button className='type3 oxxo mt-4 mb-2' onClick={payWithOxxo}>
                      Genera ficha de pago OXXO
                    </button>
                  </div>
                )}
              {
                selectedButton === 'transfer' && (
                  <div>
                    <p className='description-text mb-5'>
                      Presiona el botón de generar ficha de transferencia para
                      visualizarla y poder descargarla. Una vez que realices la
                      transferencia tardaremos máximo 48hs en procesar tu pago y a
                      continuación podrás comenzar con tus cursos
                    </p>
                    <button className='type3 spei  mt-5 mb-2' onClick={payWitSpei}>
                      Genera ficha para transferencia
                    </button>
                  </div>
                )}
              {
                selectedButton === 'paypal' && (
                  <>
                    <p className='description-text'>
                      Para seguir con este método de compra, deberás iniciar sesión con tu cuenta de PayPal.
                    </p>
                    <div style={{
                      paddingInline: '10px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <input
                        type="checkbox"
                        name=""
                        id="terms"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        style={{
                          width: '16px',
                          height: '16px'
                        }}
                      />
                      <label
                        htmlFor="terms"
                        style={{
                          paddingLeft: '10px'
                        }}
                      >
                        Acepto los <a href="">términos, condiciones y políticas</a> de Gonvar
                      </label>
                    </div>
                    {
                      !terms &&
                      <button
                        style={{
                          borderRadius: '25px',
                          width: '150px',
                          height: '50px',
                          backgroundColor: '#549FD1',
                          marginBottom: '6px'
                        }}
                        className='paypal-disable'
                        disabled
                      >

                      </button>
                    }
                    {
                      terms &&
                      <PayPalScriptProvider
                        deferLoading={paypal}
                        options={{
                          'client-id':
                            'ATu3hpVYAX9Jq288cIdG2ZU0WftbBjcKGt0cwEe7naroEao2JgBfBmpQXGaxSwDgUEP4mc4l8JNJjBbz',
                          currency: 'MXN',
                          vault: true,
                        }}
                      >
                        <div style={{
                          width: '50%',
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <PayPalButtons
                            style={{
                              color: 'blue',
                              tagline: false,
                              layout: 'horizontal',
                              shape: 'pill',
                              height: 50,
                            }}
                            createSubscription={
                              (data, actions) => {
                                // setPlan({ method: 'paypal' });
                                return actions.subscription.create({
                                  plan_id: returnPricePaypal(),
                                });

                              }
                            }
                            onApprove={
                              async (data: any, actions) => {
                                let today = new Date().getTime() / 1000;
                                let finalDate = 0;
                                finalDate =
                                  today + (frequency === 'month'
                                    ? 2592000
                                    : frequency === 'anual'
                                      ? 31536000
                                      : 10368000);
                                await updateMembership({
                                  method: 'paypal',
                                  final_date: finalDate,
                                  plan_id: data.subscriptionID,
                                  plan_name: product.title,
                                  start_date: new Date().getTime() / 1000,
                                  userId: userDataAuth.user.user_id,
                                  level:
                                    frequency === 'month' || trial === 'true'
                                      ? 1
                                      : frequency === 'anual'
                                        ? 4
                                        : 7,
                                  type: product.price,
                                });
                                // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
                                window.location.href = getRouteByFrequency(
                                  frequency,
                                  true,
                                );
                                return data;
                              }
                            }
                          />
                        </div>
                      </PayPalScriptProvider>
                    }
                  </>
                )}
            </div>
          </div>
        </div>
        <div className={`right-section`}>
          <div className='box'>
            <p className='title'>¿Qué estás adquiriendo?</p>
            <p className="subtitle">PRODUCTOS</p>
            <div className='gonvar-subscription-container'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/images/purchase/logo.png" alt="Gonvar Logo" style={{ margin: '0px' }} />
              </div>
              {type == 'subscription' ? (
                <p className='title'>
                  Suscripción{' '}
                  <span>
                    Gonvar+{' '}
                    {(frequency === 'month' || trial === 'true') &&
                      'Mensual'}{' '}
                    {frequency === 'anual' && 'Anual'}{' '}
                    {frequency === 'cuatrimestral' && 'Cuatrimestral'}
                  </span>{' '}
                </p>
              ) : (
                <p className='title' style={{ textAlign: 'initial' }}>
                  Curso <span>{product.title}</span>
                </p>
              )}
            </div>
            <div className='info'>
              <p>
                {
                  `La suscripción que te permite ver más de 70 cursos de uñas y belleza en línea. Accede hoy mismo por sólo $${returnPrice()}`
                }
                <br />
              </p>
              <img
                className='hidden-image'
                src="/images/purchase/chica_banner.png"
                alt="chica-volteando-de-espaldas"
                title="Chica volteando de espaldas"
              />
            </div>
            <div className='price-container'>
              <p
                className='title'
                style={{ lineHeight: '25px', textAlign: 'end' }}
              >
                Total<span> a pagar</span>
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: returnPriceTag(
                    trial,
                    v,
                    frequency,
                    type,
                    coupon,
                    product.price,
                    nailmasterplusanual,
                  ),
                }}
              ></p>
            </div>
            <div className='bg'></div>
            <img className="image" src="/images/purchase/neworange.png" alt="" />
          </div>
        </div>
      </PurchaseNewContainer>
    </>
  );
};
