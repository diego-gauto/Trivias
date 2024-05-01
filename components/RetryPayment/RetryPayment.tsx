import React, { useEffect, useState } from 'react';

import { FaChevronDown } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import router from 'next/router';

import { PLAN_PATH, PREVIEW_PATH } from '../../constants/paths';
import OxxoModal from '../../containers/Profile/Purchase/Modals/Oxxo';
import SpeiModal from '../../containers/Profile/Purchase/Modals/Spei';
import { LoaderContainSpinner } from '../../containers/Profile/Purchase/Purchase.styled';
import { useAuth } from '../../hooks/useAuth';
import {
  conektaOxxoApi,
  conektaSpeiApi,
  conektaSubscriptionApi,
} from '../api/checkout';
import {
  detachPaymentMethodConekta,
  setDefaultPaymentMethodConekta,
} from '../api/profile';
import { conektaPm, updateMembership } from '../api/users';
import { haveAccess } from '../GlobalFunctions';
import {
  Month,
  PayOptions,
  PayOptionsForMonthSuscription,
  Year,
} from './constants';
import { checkEmpty } from './functions';
import { IPayOption, IPm, TKey, TPayOptionId } from './IRetryPayment';
import { PaymentMethods } from './PaymentMethods/PaymentMethods';
import { RetryPaymentContainer } from './RetryPayment.styled';

declare let window: any;

export const RetryPayment = () => {
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
  const [product, setProduct] = useState({ price: 149 });
  const [reference, setReference] = useState('');
  const [bank_ref, setBank_ref] = useState('');
  const [expiresAt, setExpiresAt] = useState();
  const [oxxoIsActive, setOxxoIsActive] = useState<boolean>(false);
  const [speiIsActive, setSpeiIsActive] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [option, setOption] = useState(0);

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

    let diff = Math.round((today - user.final_date) / 86400);

    if (diff > 90) {
      router.push(PLAN_PATH);
      return;
    }

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

      setPaymentMethods(extractedProperties);
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

  type FrecuencyValue = 'cuatrimestral' | 'year' | 'month';

  const getFrecuency = (n: number): FrecuencyValue => {
    if ([0, 7, 8].includes(n)) {
      return 'cuatrimestral';
    }

    if ([1, 6].includes(n)) {
      return 'month';
    }

    if ([4, 5].includes(n)) {
      return 'year';
    }

    return 'cuatrimestral';
  };

  const payWithOxxo = () => {
    setProduct({ ...product, price: user.type });
    const currentDate: any = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );

    let data = {
      conekta_id: user.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: 'Gonvar Plus',
      price: user.type * 100,
      meta: {
        type: 'subscription',
        course_id: 0,
        frecuency: getFrecuency(user.level),
        duration: 0,
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
      conekta_id: user.conekta_id,
      expires_at: Math.round(new Date(futureDate).getTime() / 1000),
      title: 'Gonvar Plus',
      price: product.price * 100,
      meta: {
        type: 'subscription',
        course_id: 0,
        frecuency: getFrecuency(user.level),
        duration: 0,
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
  if (user) {
    return (
      <RetryPaymentContainer>
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
            <h2>Métodos de pago</h2>
            <p className='description' style={{ textAlign: 'left' }}>
              Edita tus métodos de pago y agrega una forma de pago
              <br /> adicional como respaldo.
            </p>
            {paymentMethods.length > 0 && (
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
            )}
            {error && option === 0 && (
              <p
                className='description'
                style={{ color: 'red', textAlign: 'left' }}
              >
                No hemos podido procesar tu pago, puedes reintentar tu <br />
                pago nuevamente o dirigirte a Agregar método de pago.
              </p>
            )}
            {paymentMethods.length > 0 && (
              <button
                className={addPayment ? 'fade' : ''}
                onClick={() => {
                  pay();
                  setOption(0);
                }}
              >
                Reintentar pago
              </button>
            )}
            <button className='type2' onClick={handleAddpayment}>
              Agregar método de pago
              <FaChevronDown className={addPayment ? 'rotate' : ''} />
            </button>
            <a
              href='/preview'
              className={'actives ' + (addPayment ? 'fade' : '')}
            >
              Ir a mis cursos
            </a>
            <div
              className={
                'add-payment-container ' + (addPayment ? 'show-contain' : '')
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
                  ? PayOptionsForMonthSuscription
                  : PayOptions
                ).map((pay: IPayOption, index: number) => {
                  return (
                    <div
                      className={
                        'box-container ' +
                        (selectedButton === pay.id ? 'selected-box' : '')
                      }
                      key={'pay-button' + index}
                      onClick={() => setSelectedButton(pay.id)}
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
                    Presionando en el botón "Pagar" estás dando tu
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
                      onClick={() => {
                        addNewCard();
                        setOption(1);
                      }}
                    >
                      Pagar
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
                  <button className='type3 oxxo' onClick={payWithOxxo}>
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
                  <button className='type3 spei' onClick={payWitSpei}>
                    Genera ficha para transferencia
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </RetryPaymentContainer>
    );
  } else {
    return <div />;
  }
};
