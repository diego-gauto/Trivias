import React, { useEffect, useState } from 'react';

import { FaArrowRight, FaCheck, FaChevronDown } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import router from 'next/router';

import { LESSON_PATH, PLAN_PATH, PREVIEW_PATH } from '../../constants/paths';
import OxxoModal from '../../containers/Profile/Purchase/Modals/Oxxo';
import SpeiModal from '../../containers/Profile/Purchase/Modals/Spei';
import { LoaderContainSpinner } from '../../containers/Profile/Purchase/Purchase.styled';
import { useAuth } from '../../hooks/useAuth';
import {
  addUserCouponApi,
  conektaOxxoApi,
  conektaPaymentApi,
  conektaSpeiApi,
  conektaSubscriptionApi,
  createInvoiceApi,
  getCourseForCheckoutApi,
} from '../api/checkout';
import {
  detachPaymentMethodConekta,
  setDefaultPaymentMethodConekta,
} from '../api/profile';
import { conektaPm, getUserApi, updateMembership } from '../api/users';
import { haveAccess, MembershipMethodValue } from '../GlobalFunctions';
import {
  Month,
  PayOptionsPurchase,
  PayOptionsPurchaseForMonthSuscription,
  Year,
} from './constants';
import { checkEmpty } from './functions';
import { IPayOption, IPm, TKey, TPayOptionId } from './IRetryPayment';
import { PaymentMethods } from './PaymentMethods/PaymentMethods';
import { PurchaseNewContainer } from './PurchaseNew.styled';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import ModalError from '../../containers/Profile/Purchase/Modal1/ModalError';
import { createNotification } from '../api/notifications';
import { IUserInfoResult } from '../../interfaces/IUser';
import { retrieveCoupons } from '../api/admin';
import ErrorModal from '../Error/ErrorModal';
import { AiFillLock } from 'react-icons/ai';
import { returnPriceTag } from '../../utils/functions';
import { getPriceByParams, getTitle, getDuration, getSubscription } from './PurchaseNewFunctions';

declare let window: any;
interface Subscription {
  price: number,
  title: string,
  duration: any,
}

type FrecuencyValue = 'cuatrimestral' | 'year' | 'month';

export const PurchaseNew = () => {
  // type, id, trial, frequency, nailmasterplusanual, v
  const { type, frequency, v, id, trial, nailmasterplusanual }: any = router.query;
  const [subscription, setSubscription] = useState<Subscription>(getSubscription(type, frequency, v));
  let userDataAuth: any = useAuth();
  let today = new Date().getTime() / 1000;
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
  const [loader, setLoader] = useState<boolean>(false);
  const [option, setOption] = useState(0);
  /*
  */
  const [plan, setPlan] = useState<any>({ method: 'conekta' });
  const [coupon, setCoupon] = useState<any>();
  const [userData, setUserData] = useState<IUserInfoResult>({} as IUserInfoResult);
  const [paypal, setPaypal] = useState(false);
  const [coupons, setCoupons] = useState<any>([]);
  const [cardInfo, setCardInfo] = useState(true);
  const [payment, setPayment] = useState(false);
  const [defaultCard, setDefaultCard] = useState<any>({});
  const [cards, setCards] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [terms, setTerms] = useState(false);

  const [errorMsg, setErrorMsg] = useState<any>('');

  const courseId = new URLSearchParams(window.location.search);
  let idC = courseId.get('id');

  const [showModalError, setShowModalError] = useState<any>(false);

  useEffect(() => {
    window.Conekta.setPublicKey('key_U5yJatlpMvd1DhENgON5ZYx');
  }, []);

  useEffect(() => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then(async (res) => {
        getAllCoupons();
        setPaypal(!paypal);
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
        if (type == 'course') {
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
        }
        if (nailmasterplusanual == 'true') {
          getCourseForCheckoutApi(30).then((res: any) => {
            setProduct({
              ...product,
              title: 'Nails Master 3.0+Anualidad',
              price: 2599,
              duration: 90,
              type: 'course',
              img: res.image,
            });
            setPaypal(false);
          });
        }
        guardCheckout(res);
        let body = {
          conekta_id: res.conekta_id,
        };
        let conektaCards = await conektaPm(body);
        const conektaPaymentMethods = conektaCards.data.payment_methods.data;
        const extractedProperties = conektaPaymentMethods.map(
          ({
            id,
            brand,
            last4,
            default: boolean,
            exp_month,
            exp_year,
          }: any) => ({
            id,
            brand,
            last4,
            default: boolean,
            exp_month,
            exp_year,
          }),
        );
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
                exp_year: element.exp_year,
              };
              setDefaultCard({ ...tempCard });
            }
          });
        }
        setUserData(res);
        setCards(extractedProperties);
      });
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('trial') == 'true') {
        localStorage.setItem('trial', 'true');
      }
      if (
        searchParams.get('type') === 'subscription' &&
        searchParams.get('frequency') === 'month' &&
        searchParams.get('v') === '1'
      ) {
        localStorage.setItem('month_1', 'true');
      }
      if (
        searchParams.get('type') === 'subscription' &&
        searchParams.get('frequency') === 'month' &&
        searchParams.get('v') === '2'
      ) {
        localStorage.setItem('month', 'true');
      }
      if (
        searchParams.get('type') === 'subscription' &&
        searchParams.get('frequency') === 'anual'
      ) {
        localStorage.setItem('anual', 'true');
      }
      if (searchParams.get('type') === 'course') {
        localStorage.setItem('course', `${idC}`);
      }
      window.location.href = '/auth/register';
    }
  }, []);

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

  const guardCheckout = (userData: IUserInfoResult) => {
    let today = new Date().getTime() / 1000;
    if (router.query.type == 'course') {
      let user_course = userData.user_courses.filter(
        (x: any) => x.course_id === +id,
      );
      if (
        user_course.length > 0 &&
        user_course[0].final_date > new Date().getTime() / 1000
      ) {
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
    if (
      router.query.type == 'subscription' &&
      //&& (([1, 4, 7].includes(userData.level) && userData.final_date > today - 10 * 24 * 60 * 60)
      // || [0, 5, 6, 8].includes(userData.level) && userData.final_date > today))
      haveAccess(
        userData.level,
        userData.final_date,
        userData.role as any,
        userData.method as MembershipMethodValue,
      )
    ) {
      // window.location.href = PREVIEW_PATH;
      router.push(PREVIEW_PATH);
    }
  };

  const conektaSuccessResponseHandler = (token: any) => {
    let user = userDataAuth.user;
    let tokenId = token.id;
    const body = {
      token_id: tokenId,
      conekta_id: user.conekta_id,
    };
    setToken(tokenId);
    // attachPaymentMethodConekta(body).then((res) => {
    //   getPaymentMethods();
    //   setCard({ holder: '', number: '', cvc: '', exp_month: '', exp_year: '' });
    // })
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
    setLoader(true);
    let body = {
      payment_method: pm.id,
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id,
    };
    setDefaultPaymentMethodConekta(body).then((res) => {
      getPaymentMethods();
      setLoader(false);
    });
  };
  const getPaymentMethods = () => {
    setLoader(true);
    let user = userDataAuth.user;

    // let diff = Math.round((today - user.final_date) / 86400);

    /*
    if (diff > 90) {
      localStorage.setItem('PLAN_PATH_REDIRECT', 'true');
      router.push(PLAN_PATH);
      return;
    }
    */

    if (haveAccess(user.level, user.final_date, user.role, user.method)) {
      // if (isNotValidToRetry(0, new Date(2024, 3, 18).getTime() / 1000, 'admin', 'conekta')) {
      router.push({ pathname: PREVIEW_PATH });
      return;
    }
    let body = {
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id,
    };
    conektaPm(body).then((res) => {
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
      setLoader(false);
    });
  };

  const getNewUserLevel = (level: number) => {
    if ([4, 5].includes(level)) return 4;
    if ([1, 6].includes(level)) return 1;
    return 7;
  };

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

  const pay = () => {
    const filter = paymentMethods.filter((x) => x.default);
    const pm = filter[0];
    let plan_id = '';

    if (user.level === 0) plan_id = 'cuatrimestre';
    if ([4, 5].includes(user.level) && user.type === 1599) plan_id = 'anual';
    if ([4, 5].includes(user.level) && user.type === 3497)
      plan_id = 'anual_v1_1';
    if ([1, 6].includes(user.level) && user.type === 149) plan_id = 'mensual';
    if ([1, 6].includes(user.level) && user.type === 249)
      plan_id = 'mensual_v1_1';
    if ([1, 6].includes(user.level) && user.type === 459)
      plan_id = 'mensual_v1_2';
    if ([7, 8].includes(user.level)) plan_id = 'cuatrimestre';

    const data = {
      id: token ? token : pm?.id,
      conekta_id: user.conekta_id,
      plan_id: plan_id,
      userId: user.user_id,
    };

    conektaSubscriptionApi(data).then(async (res) => {
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
        if (getNewUserLevel(user.level) === 1) {
          url += 'mensualidad';
        } else if (getNewUserLevel(user.level) === 4) {
          url += 'anualidad';
        } else if (getNewUserLevel(user.level) === 7) {
          url += 'cuatrimestre';
        }
        window.location.href = url;
      } else {
        setLoaderAdd(false);
        setError(true);
        // let notification = {
        //   userId: user.user_id,
        //   type: "8",
        //   notificationId: '',
        //   amount: user.type,
        //   productName: 'Gonvar Plus',
        //   frecuency: user.level === 5 ? 'anual' : 'cuatrimestral'
        // }
        // await createNotification(notification);

        const msg = 'pago-rechazado';
      }
    });
  };

  const payWithOxxo = () => {
    const currentDate: any = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );

    let data = {
      conekta_id: userData.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: product.title,
      price: product.price * 100,
      meta: {
        type: type,
        course_id: type === 'subscription' ? 0 : id,
        frecuency: type === 'subscription' ? frequency : '',
        duration:
          type === 'subscription' ? 0 : Math.floor(new Date().getTime() / 1000) + (product.duration * 24 * 60 * 60),
      },
    };
    conektaOxxoApi(data).then((res) => {
      let response = res.data.data;
      setBarcode(response.charges.data[0].payment_method.barcode_url);
      setReference(response.charges.data[0].payment_method.reference);
      setExpiresAt(response.charges.data[0].payment_method.expires_at);
      setOxxoIsActive(true);
    });
  };

  const payWitSpei = () => {
    const currentDate: any = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );

    let data = {
      conekta_id: userData.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: product.title,
      price: product.price * 100,
      meta: {
        type: type,
        course_id: type === 'subscription' ? 0 : id,
        frecuency: type === 'subscription' ? frequency : '',
        duration:
          type === 'subscription'
            ? 0
            : new Date().getTime() / 1000 + product.duration * 86400,
      },
    };

    conektaSpeiApi(data).then((res) => {
      const charges = res.data.data.charges.data[0];
      const reference = charges.payment_method.clabe;
      setBank_ref(reference);
      setSpeiIsActive(true);
    });
  };

  const returnFrecuency = () => {
    if (user.level === 5 || user.level === 4) {
      return 'Anual';
    } else if (user.level === 1 || user.level === 6) {
      return 'Mensual';
    } else if (user.level === 7 || user.level === 8 || user.level === 0) {
      return 'Cuatrimestral';
    } else {
      return 'NA ';
    }
  };

  const returnPrice = () => {
    if (user.level === 5 || user.level === 4) {
      return `$${user.type} / Anual `;
    } else if (user.level === 1 || user.level === 6) {
      return `$${user.type} / Mensual `;
    } else if (user.level === 7 || user.level === 8) {
      return `$${user.type} / Cuatrimestral `;
    } else if (user.level === 0) {
      return `1599 / Cuatrimestral `;
    } else {
      return 'NA ';
    }
  };

  const detachPayment = async (card: IPm) => {
    setLoader(true);
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

  const FinishPayment = async () => {
    if (plan.method == 'paypal') {
      setLoader(false);
      if (type == 'subscription') {


        // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
        window.location.href = getRouteByFrequency(frequency, true);
      } else {
        let price = product.price;
        if (coupon) {
          if (coupon.type == 'amount') {
            price = price - coupon.discount;
          } else {
            price = price - (coupon.discount / 100) * price;
          }
        }
        let invoice = {
          amount: price * 100,
          product: product.title,
          method: 'paypal',
          user_id: userData.user_id,
          course_id: id,
          final_date: new Date().getTime() / 1000 + product.duration * 86400,
          newPlan: nailmasterplusanual === 'true' ? true : false,
        };
        if (coupon) {
          let tempCoupon = {
            coupons_id: coupon.id,
            user_id: userData.user_id,
          };
          await addUserCouponApi(tempCoupon);
        }

        createInvoiceApi(invoice).then((res) => {


          setLoader(false);
          if (id === '57') {
            window.location.href = '/pagoexitosonailsmaster';
          }
          if (id === '45') {
            window.location.href = '/pagoexitosoalineacion';
          }
        });
      }
    }
    if (plan.method === 'conekta') {
      if (type === 'course' || nailmasterplusanual === 'true') {
        let price = product.price;
        if (coupon) {
          if (coupon.type == 'amount') {
            price = price - coupon.discount;
          } else {
            price = price - (coupon.discount / 100) * price;
          }
        }
        let data = {
          id: card.id ? card.id : defaultCard.paymentMethod,
          conekta_id: userData.conekta_id,
          price: price * 100,
          product_name: product.title,
          userId: userData.user_id,
        };
        conektaPaymentApi(data).then(async (res) => {
          if (res.status === 200) {
            let invoice = {
              amount: price * 100,
              product: product.title,
              method: 'conekta',
              user_id: userData.user_id,
              course_id: id,
              final_date:
                new Date().getTime() / 1000 + product.duration * 86400,
              newPlan: nailmasterplusanual === 'true' ? true : false,
            };
            if (coupon) {
              let tempCoupon = {
                coupons_id: coupon.id,
                user_id: userData.user_id,
              };
              await addUserCouponApi(tempCoupon);
            }
            if (
              res.data.data.payment_status === 'paid' ||
              res.data.data.payment_status === 'pending_payment'
            ) {
              createInvoiceApi(invoice).then((res) => {



                if (id === '57') {
                  window.location.href = '/pagoexitosonailsmaster';
                }
                if (id === '45') {
                  window.location.href = '/pagoexitosoalineacion';
                }
              });
              return;
            } else {
              setCard({ ...card, cardId: '' });
              let error = 'Su pago fue declinado';
              let notification = {
                userId: userData.user_id,
                type: '8',
                notificationId: '',
                amount: price,
                productName: product.title,
                frequency: '',
              };
              await createNotification(notification);
              if (id === '57') {
                window.location.href = `/pagofallidonailsmaster?error=${error}`;
              }
              if (id === '45') {
                window.location.href = `/pagofallidoalineacion?error=${error}`;
              }
              setLoader(false);
              return;
            }
          }
          if (res.response.status === 400) {
            setCard({ ...card, cardId: '' });
            let notification = {
              userId: userData.user_id,
              type: '8',
              notificationId: '',
              amount: price,
              productName: product.title,
              frequency: '',
            };
            await createNotification(notification);
            let error = res.response.data.error.data.details[0].message;
            if (id === '57') {
              window.location.href = `/pagofallidonailsmaster?error=${error}`;
            }
            if (id === '45') {
              window.location.href = `/pagofallidoalineacion?error=${error}`;
            }
            setLoader(false);
          }
        });
      }
      if (type === 'subscription') {
        let price = '';
        if (trial === 'true' && v === '1') price = 'mes_gratis';
        if (trial === 'true' && v === '2') price = 'mes_gratis';
        if (trial === 'true' && v === '3') price = 'mes_gratis';
        if (frequency === 'month' && v === '1') price = 'mensual';
        if (frequency === 'month' && v === '2') price = 'mensual_v1_1';
        if (frequency === 'month' && v === '3') price = 'mensual_v1_2';
        if (frequency === 'anual') price = 'anual';
        if (frequency === 'anual' && v === '3') price = 'anual_v1_1';
        if (frequency === 'cuatrimestral' && v === '3') price = 'cuatrimestre';

        let data = {
          id: card.id ? card.id : defaultCard.paymentMethod,
          conekta_id: userData.conekta_id,
          plan_id: price,
          userId: userData.user_id,
        };
        conektaSubscriptionApi(data).then(async (res) => {
          if (res?.data.data.status === 'active') {
            let sub = res.data.data;
            await updateMembership({
              ...plan,
              final_date: sub.billing_cycle_end,
              payment_method: sub.card_id,
              plan_id: sub.id,
              plan_name: product.title,
              start_date: sub.billing_cycle_start,
              userId: userData.user_id,
              level:
                frequency === 'month' || trial === 'true'
                  ? 1
                  : frequency === 'anual'
                    ? 4
                    : 7,
              type: product.price,
            });
            /*
            const QUERY = `UPDATE memberships SET 
              final_date = ${membership.final_date},
                method = '${membership.method}',
                level = ${membership.level},
                payment_method = '${membership.payment_method}',
                plan_id = '${membership.plan_id}',
                plan_name = '${membership.plan_name}',
                start_date = ${membership.start_date},
                type = ${membership.type}
                WHERE user_id = ${membership.userId};`;
            */
            // window.location.href = frequency === "month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
            window.location.href = getRouteByFrequency(frequency, true);
          } else {
            let notification = {
              userId: userData.user_id,
              type: '8',
              notificationId: '',
              amount: product.price,
              productName: product.title,
              frecuency: frequency,
            };
            await createNotification(notification);
            const msg = 'pago-rechazado';
            // window.location.href = frequency === "month" ? `/pagofallidomensualidad?error=${msg}` : `/pagofallidoanualidad?error=${msg}`;
            window.location.href = getRouteByFrequency(
              frequency,
              false,
              true,
              msg,
            );
          }
        });
      }
    }
  };

  const handleConfirm = async () => {
    setLoader(true);
    if (cardInfo) {
      delete card.brand;
      delete card.cardId;
      delete card.last4;
      delete card.status;
      delete card.paymentMethod;
    }

    if (cardInfo && Object.keys(card).some((key) => card[key] === '')) {
      setError(true);
      setLoader(false);
    }

    if (cardInfo && Object.values(card).every((value) => value !== '')) {
      if (!terms) {
        setErrorMsg(
          'Por favor de aceptar los terminos y condiciones para poder continuar!',
        );
        setLoader(false);
        return;
      }
      if (plan.method === 'conekta') {
        let tempCard = {
          card: {
            number: card.number.replaceAll(' ', ''),
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
    }
    if (payment && defaultCard.paymentMethod) {
      /*
      if (!terms) {
        setErrorMsg(
          'Por favor de aceptar los terminos y condiciones para poder continuar!',
        );
        setShow(true);
        setLoader(false);
        return;
      }
      */
      FinishPayment();
    }
    if (plan.method == 'paypal') {
      setPaypal(!paypal);
    }
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
        <ErrorModal show={showModalError} setShow={setShowModalError} error={errorMsg} />
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
            <p className='description' style={{ textAlign: 'left' }}>
              Seleccione cualquiera de los métodos de pago disponibles
            </p>
            {paymentMethods.length > 0 && (
              <>
                <div className='payment-container'>
                  {!loader ? (
                    paymentMethods.map((pm: IPm, index: number) => {
                      return (
                        <PaymentMethods
                          pm={pm}
                          index={index}
                          pm_size={paymentMethods.length}
                          changePaymentMethod={changePaymentMethod}
                          key={'pm-' + index}
                          handleDelete={detachPayment}
                        />
                      );
                    })
                  ) : (
                    <LoaderContainSpinner />
                  )}
                </div>
                <button
                  className={addPayment ? 'fade' : ''}
                  onClick={() => {
                    pay();
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
              <div
                className='button-container'
                style={{
                  justifyContent: [1, 6].includes(user.level)
                    ? 'center'
                    : 'space-between',
                }}
              >
                {([1, 6].includes(user.level)
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
              {selectedButton === 'card' && (
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
                    {returnFrecuency()} y te cobremos {returnPrice()}
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
                      No hemos podido procesar tu pago, puedes reintentar tu{' '}
                      <br />
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
                      /*
                      onClick={() => {
                        addNewCard();
                        setOption(1);
                      }}
                      */
                      onClick={() => {
                        if (terms) {
                          handleConfirm();
                        }
                      }}
                      disabled={!terms}
                    >
                      Confirmar compra
                    </button>
                  )}
                </>
              )}
              {selectedButton === 'oxxo' && (
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
              {selectedButton === 'transfer' && (
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
                                setPlan({ method: 'paypal' });
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
                                  today + frequency === 'month'
                                    ? 2592000
                                    : frequency === 'anual'
                                      ? 31536000
                                      : 10368000;
                                await updateMembership({
                                  method: 'paypal',
                                  final_date: finalDate,
                                  plan_id: data.subscriptionID,
                                  plan_name: product.title,
                                  start_date: new Date().getTime() / 1000,
                                  userId: userData.user_id,
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
