import { useEffect, useState } from 'react';

import { AiOutlineHourglass, AiOutlineStar } from 'react-icons/ai';
import { FaArrowRight, FaAward } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';
import { useMediaQuery } from 'react-responsive';

import 'animate.css';
import Link from 'next/link';
import router from 'next/router';

import { getCoursesApi } from '../../../components/api/lessons';
import { getRewardsApi } from '../../../components/api/rewards';
import { LoaderContainSpinner } from '../Purchase/Purchase.styled';
import {
  RewardContainer,
  SubscriptionContainer,
  ThirdBox,
} from './User.styled';
import { REWARDS_PATH, SUPPORT_PATH } from '../../../constants/paths';
import { conektaResumeSubscription } from '../../../components/api/profile';
import { getUsersStripe } from '../../../components/api/conekta/test';
import ChangePlanModal from '../../../components/Modals/ChangePlanModal/ChangePlanModal';
import { haveAccess } from '../../../components/GlobalFunctions';
import { time } from 'console';
import { IUserInfoResult } from '../../../interfaces/IUser';
import { user } from 'firebase-functions/v1/auth';

const or_star = '/images/cancel_modal/or_star.png';
const gr_star = '/images/cancel_modal/gr_star.png';
const bl_star = '/images/cancel_modal/bl_star.png';
const handImage = '/images/profile/hand.png';

interface Props {
  timeLevel: any;
  reward: any;
  lastTimeReward: any;
  setReward: any;
  user: IUserInfoResult;
}

type UserRole = 'user' | 'admin' | 'superAdmin';

type UserSubscription = 0 | 1;

const NextReward = (props: Props) => {
  const { timeLevel, reward, lastTimeReward, setReward, user } = props;

  const responsive1023 = useMediaQuery({ query: '(max-width: 1023px)' });
  const [loader, setLoader] = useState<any>(false);
  const [points, setPoints] = useState<any>();
  const [time, setTime] = useState<any>();
  const [certificates, setCertificates] = useState<any>();
  const [pop, setPop] = useState<any>(false);
  const today = new Date().getTime() / 1000;
  const [conektaUsers, setConketaUsers] = useState<any>([]);
  const [openCuatriModal, setOpenCuatriModal] = useState(false);
  const [openAnualModal, setOpenAnualModal] = useState(false);

  const getRewards = async () => {
    let tempPointsObj: any = { obtained: [], blocked: [] };
    let tempMonthObj: any = { obtained: [], blocked: [] };
    let tempPoints: any = [];
    let tempMonths: any = [];
    getRewardsApi().then((res) => {
      tempPoints = res.data.data.filter((x: any) => x.type === 'points');
      tempMonths = res.data.data.filter((x: any) => x.type === 'months');
      tempPoints.sort((a: any, b: any) => a.points - b.points);
      tempMonths.sort((a: any, b: any) => a.month - b.month);

      tempPoints.forEach((element: any) => {
        if (user.score >= element.points) {
          tempPointsObj.obtained.push(element);
        } else {
          tempPointsObj.blocked.push(element);
        }
      });
      setPoints(tempPointsObj);
      let today: any = new Date().getTime() / 1000;
      let tempDayCount: any = today - user.start_date;
      let tempMonth =
        user.start_date === 0 ? 0 : tempDayCount / (3600 * 24 * 30);
      tempMonths.forEach((element: any) => {
        if (Math.floor(tempMonth) >= element.month) {
          tempMonthObj.obtained.push(element);
        } else {
          tempMonthObj.blocked.push(element);
        }
      });
      setTime(tempMonthObj);
    });
    let array: any = [];
    user.user_certificates.forEach((element: any) => {
      array.push(element.course_id);
    });
    getCoursesApi().then((courses) => {
      let tempCertificates = courses.filter(
        (x: any) => !array.includes(x.id) && x.with_certificate === 1,
      );
      let countArray: any = [];
      tempCertificates.forEach((course: any, index: number) => {
        countArray.push({ id: course.id, name: course.title, count: 0 });
        course.lessons.forEach((lesson: any) => {
          if (lesson.users) {
            if (
              lesson.users.filter((x: any) => x.user_id === user.user_id)
                .length > 0
            ) {
              countArray[index].count++;
            }
          }
        });
      });
      countArray.sort((a: any, b: any) => b.count - a.count);
      setCertificates(countArray);
    });
  };
  const formatDateUser = () => {
    let tempDate = new Date(user.final_date * 1000);
    let tempDay = tempDate.getDate();
    let tempMonth = tempDate.getMonth() + 1;
    let tempYear = tempDate.getFullYear();
    return `${tempDay}/${tempMonth}/${tempYear}`;
  };
  useEffect(() => {
    getUsersStripe().then((res) => {
      setConketaUsers(res.data);
    });
  }, []);
  useEffect(() => {
    getRewards();
  }, []);

  const cancelSubscription = async () => {
    setLoader(true);
    router.push({
      pathname: '/cancel-suscription',
    });
  };

  const getDays = () => {
    return Math.round((user.final_date - today) / 86400);
  };

  const resumeSubscription = () => {
    setLoader(true);
    let body = {
      conekta_id: user.conekta_id,
    };
    conektaResumeSubscription(body).then((res) => {
      window.location.reload();
    });
  };

  const getSubscriptionContent = (
    userLevel: number,
    userRole: string,
    userSubscription: 0 | 1,
    finalDate: number,
    method: string,
  ): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    const today = new Date().getTime() / 1000;
    const tolerance = 10 * 24 * 60 * 60;
    const isSuperAdmin = userRole === 'superAdmin';

    const generateGonvarPlusJSXElement = (
      plan: string,
      retry: boolean = false,
    ): JSX.Element => {
      return (
        <p>
          Gonvar+ <span className='span'>{plan}</span>
          {retry ? ', reintentando pago' : ''}
        </p>
      );
    };

    // Gonvar+ ${tipo_de_plan}
    if ([6, 1].includes(userLevel) && finalDate > today) {
      elements.push(generateGonvarPlusJSXElement('mensual'));
    } else if ([7, 8].includes(userLevel) && finalDate > today) {
      elements.push(generateGonvarPlusJSXElement('cuatrimestral'));
    } else if ([4, 5].includes(userLevel) && finalDate > today) {
      elements.push(generateGonvarPlusJSXElement('anual'));
    }

    const generateFinalDateJSXElement = () => {
      const date = new Date(finalDate * 1000);
      const dateDay = date.getDate();
      const dateMonth = date.getMonth();
      const dateYear = date.getFullYear();

      const day = `${dateDay}`.length === 1 ? `0${dateDay}` : `${dateDay}`;
      const month =
        `${dateMonth}`.length === 1 ? `0${dateMonth}` : `${dateMonth}`;
      const year = `${dateYear}`.length === 1 ? `0${dateYear}` : `${dateYear}`;

      return `${day}-${month}-${year}`;
    };

    // Gonvar+ ${tipo_de_plan}, reintentando pago
    if (
      userLevel === 1 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      elements.push(generateGonvarPlusJSXElement('mensual'));
    } else if (
      userLevel === 4 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      elements.push(generateGonvarPlusJSXElement('anual'));
    } else if (
      userLevel === 7 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      elements.push(generateGonvarPlusJSXElement('cuatrimestral'));
    }

    if (
      (([5, 6, 8].includes(userLevel) && finalDate < today) ||
        ([1, 4, 7].includes(userLevel) && finalDate < today - tolerance) ||
        userLevel === 0) &&
      !isSuperAdmin
    ) {
      elements.push(<p>Sin suscripción</p>);
    }

    return elements;
  };

  const getSubscriptionJSX = (
    userLevel: number,
    finalDate: number,
    userRole: 'user' | 'admin' | 'superAdmin',
    method: string,
  ): JSX.Element | undefined => {
    const today = new Date().getTime() / 1000;
    const tolerance = 10 * 24 * 60 * 60;

    console.log({
      user: {
        userLevel,
        finalDate: new Date(finalDate * 1000),
        userRole,
        method,
      },
    });

    if (userLevel === 5 && finalDate > today) {
      return (
        <p>
          Gonvar+ <span className='span'>anual</span>
        </p>
      );
    } else if (userLevel === 6 && finalDate > today) {
      return (
        <p>
          Gonvar+ <span className='span'>mensual</span>
        </p>
      );
    } else if (userLevel === 8 && finalDate > today) {
      return (
        <p>
          Gonvar+ <span className='span'>cuatrimestral</span>
        </p>
      );
    }

    if (userLevel === 1 && finalDate > today) {
      return (
        <p>
          Gonvar+ <span className='span'>mensual</span>
        </p>
      );
    } else if (
      userLevel === 1 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      return (
        <p>
          Gonvar+ <span className='span'>mensual, reintentando pago</span>
        </p>
      );
    }

    if (userLevel === 4 && finalDate > today) {
      return (
        <p>
          Gonvar+ <span className='span'>anual</span>
        </p>
      );
    } else if (
      userLevel === 4 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      return (
        <p>
          Gonvar+ <span className='span'>anual, reintentando pago</span>
        </p>
      );
    }

    if (userLevel === 7 && finalDate > today) {
      return (
        <p>
          Gonvar+ <span className='span'>cuatrimestral</span>
        </p>
      );
    } else if (
      userLevel === 7 &&
      method === 'conekta' &&
      finalDate > today - tolerance
    ) {
      return (
        <p>
          Gonvar+ <span className='span'>cuatrimestral, reintentando pago</span>
        </p>
      );
    }

    return userRole === 'superAdmin' ? (
      <p>Super Admin</p>
    ) : (
      <p>Sin suscripción</p>
    );
  };

  const generateNextPaymentJSX = (
    userLevel: number,
    userRole: string,
    userSubscription: 0 | 1,
    finalDate: number,
  ) => {
    // Si el usuario es superAdmin, no hay necesidad de indicar el proximo cargo
    if (userRole === 'superAdmin') {
      return undefined;
    }

    /*
    Si el usuario esta sin suscripción o sin días, no mostrar la etiqueta de "Próximo cargo"
    */
    const today = new Date().getTime() / 1000;
    const result = (
      <>
        <p className='text-1'>Próximo cargo</p>
        <div className='subscription-info'>
          {([1, 4, 5, 6, 7, 8].includes(userLevel) && userSubscription === 0) ||
            (userLevel === 0 && finalDate > today && userSubscription === 0) ? (
            <p>
              <span className='span'>{formatDateUser()}</span>
            </p>
          ) : (
            <p>
              <span className='span'>
                {user.subscription === 1 && finalDate > today
                  ? `Haz cancelado tu suscripción, te quedan ${getDays()} días`
                  : 's/f'}
              </span>
            </p>
          )}
        </div>
      </>
    );
    const getFormattedDate = (d: Date) => {
      return `${`${d.getDate()}`.padStart(2, '0')}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${d.getFullYear()}`;
    };

    // Activo con días agregados
    // level 0 con final date mayor a hoy
    if (userLevel === 0 && finalDate > today) {
      return (
        <div className='subscription-info'>
          <p>
            <span className='span'>
              Con acceso hasta {getFormattedDate(new Date(finalDate * 1000))}
            </span>
          </p>
        </div>
      );
    }

    if (finalDate < today) {
      if ([0, 5, 6, 8].includes(userLevel)) {
        return undefined;
      } else if (
        [1, 4, 7].includes(userLevel) &&
        finalDate < today - 10 * 24 * 60 * 60
      ) {
        return undefined;
      }
    }

    return result;
  };

  const isConektaUser = (method: string) => {
    return method === 'conekta';
  }

  const isActiveSubscription = (finalDate: number) => {
    return finalDate > Math.floor(new Date().getTime() / 1000);
  }

  const haveRecurrentSuscription = (level: number) => {
    return [1, 4, 7].includes(level);
  };

  const isAbleToUpdateToCuatri = () => {

  }

  const isAbleToUpdateToAnual = () => {

  }

  return (
    <ThirdBox>
      <ChangePlanModal
        show={openCuatriModal}
        onHide={() => {
          setOpenCuatriModal(false);
        }}
        user={user as any}
        planOption='cuatrimestre'
      />
      <ChangePlanModal
        show={openAnualModal}
        onHide={() => {
          setOpenAnualModal(false);
        }}
        user={user as any}
        planOption='anual_v1_1'
      />
      {pop && (
        <div className='dimScreen animate__animated animate__slideInUp'>
          <div id='confirmBox' className='dialog'>
            <div className='exit'>
              <TfiClose className='ex-icon' onClick={() => setPop(false)} />
            </div>
            <h2>¡Nos estristece saber que deseas irte!</h2>
            <p className='sangria sangria-y'>
              Al cancelar tu suscripción{' '}
              <b className='purple'> se reiniciará todo tu avance. </b>
              Tus beneficios, recompensas y certificados se perderán.
            </p>
            <p>
              En este momento, <b className='purple'>{user.name}</b>, has
              completado <b>{user.user_certificates?.length}</b>{' '}
              {user.user_certificates?.length === 1 ? 'curso' : 'cursos'} y
              cuentas con:
            </p>
            <ul>
              <div className='space-bt'>
                <img src={or_star} />
                <p className='p-li'>
                  <b className='orange'>{user.score}</b> Puntos obtenidos,{' '}
                  <b className='orange'>{points?.obtained.length} </b>
                  recompensas obtenidas por puntaje y una próxima recompensa a
                  los <b className='orange'>{points?.blocked[0].points}</b>{' '}
                  puntos.
                </p>
              </div>
              <div className='space-bt'>
                <img src={gr_star} />
                <p className='p-li'>
                  Llevas{' '}
                  <b className='green'>
                    {timeLevel + (timeLevel === 1 ? ' mes' : ' meses')}
                  </b>{' '}
                  inscrita a{' '}
                  <b>
                    <i>Gonvar+</i>
                  </b>
                  {lastTimeReward.length !== 0 && (
                    <>
                      , lo que te ha dado como beneficio un descuento del{' '}
                      <b className='green'>{lastTimeReward[0].title} </b>
                      en todos nuestros productos
                    </>
                  )}
                </p>
              </div>
              <div className='space-bt'>
                <img src={bl_star} />
                <p className='p-li'>
                  Has obtenido{' '}
                  <b className='blue'>{user.user_certificates?.length}</b>{' '}
                  {user.user_certificates?.length === 1
                    ? 'certificado'
                    : 'certificados'}{' '}
                  de tus cursos y estas por completar{' '}
                  <b className='blue'>{certificates?.length}</b> cursos más.
                </p>
              </div>
            </ul>
            <div className='buttons'>
              <button className='left' onClick={cancelSubscription}>
                Renuncio a mis beneficios, recompensas y certificados
              </button>
              <button
                className='right'
                onClick={() => {
                  setPop(false);
                }}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
      <RewardContainer reward={reward}>
        <div className='main-container'>
          <div className='reward-title-contain'>
            <p>Centro de recompensas</p>
          </div>
          <div></div>
          <div className='reward-containers'>
            <div className='reward-conditions'>
              <div
                className='point-container'
                onClick={() => {
                  setReward(0);
                }}
              >
                <p>
                  <span className='first-word'>Recompensas</span> <br />
                  obtenidas
                  <br />
                  <span> por puntaje</span>
                </p>
                <div className='bottom-contain'>
                  <p className='point-number'>{points?.obtained.length}</p>
                  <AiOutlineStar
                    style={
                      reward == 0 ? { color: 'white' } : { color: '#942cec' }
                    }
                  />
                </div>
              </div>
              <div
                className='time-container'
                onClick={() => {
                  setReward(1);
                }}
              >
                <p>
                  <span className='first-word'>Beneficios</span> <br />
                  obtenidos
                  <br />
                  <span> por tiempo</span>
                </p>
                <div className='bottom-contain'>
                  <p className='time-number'>{time?.obtained.length}</p>
                  <AiOutlineHourglass
                    style={
                      reward == 1 ? { color: 'white' } : { color: '#942cec' }
                    }
                  />
                </div>
              </div>
              <div
                className='certificates-container'
                onClick={() => {
                  setReward(2);
                }}
              >
                <p>
                  <span className='first-word'>Certificados</span> <br />
                  <span>acumulados</span>
                </p>
                <div className='bottom-contain'>
                  <p className='certificate-number'>
                    {user.user_certificates?.length > 0
                      ? user.user_certificates.length
                      : 0}
                  </p>
                  <FaAward
                    style={
                      reward == 2 ? { color: 'white' } : { color: '#942cec' }
                    }
                  />
                </div>
              </div>
            </div>
            <div className='extra-info'>
              {reward === 0 && (
                <p>
                  {points?.blocked.length > 0 ? (
                    <>
                      Siguiente Recompensa{' '}
                      <span>{points?.blocked[0].title}</span> a los{' '}
                      <span>{points?.blocked[0].points} puntos</span>
                    </>
                  ) : (
                    <>
                      Próximamente podrás desbloquear{' '}
                      <span>nuevas recompensas</span>
                    </>
                  )}
                </p>
              )}
              {reward === 1 && (
                <p>
                  {time.blocked.length > 0 ? (
                    <>
                      Siguiente Beneficio <span>{time?.blocked[0].title}</span>{' '}
                      a los <span>{time?.blocked[0].month} meses</span>
                    </>
                  ) : (
                    <>
                      Próximamente podrás desbloquear{' '}
                      <span>nuevos beneficios</span>
                    </>
                  )}
                </p>
              )}
              {reward === 2 && (
                <p style={{ textAlign: 'center' }}>
                  {certificates?.length > 0 ? (
                    <>
                      {' '}
                      Certificado más próximo
                      <span> {certificates[0]?.name}</span>
                    </>
                  ) : (
                    <>
                      Próximamente podrás desbloquear{' '}
                      <span>nuevos certificados</span>
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
        <Link href={REWARDS_PATH}>
          <button>
            Ir al <span>Centro de Recompensas </span>
            <FaArrowRight />{' '}
          </button>
        </Link>
        <Link href={SUPPORT_PATH}>
          <button className='help-btn'>
            <p>
              Ir al <span>Centro de Ayuda </span>
            </p>
            <FaArrowRight />{' '}
          </button>
        </Link>
      </RewardContainer>
      <SubscriptionContainer>
        <div className='first-section'>
          <p className='main-title'>Suscripción</p>
          <div className='subscription-content'>
            <p className='text-1'>Suscripción actual</p>
            <div className='subscription-info'>
              {getSubscriptionJSX(
                user.level,
                user.final_date,
                user.role as UserRole,
                user.method,
              )}
            </div>
            {
              generateNextPaymentJSX(
                user.level,
                user.role,
                user.subscription as UserSubscription,
                user.final_date,
              )
              // generateNextPaymentJSX(7, 'user', user.subscription, (new Date(2024, 3, 25)).getTime() / 1000)
            }
            {(
              isActiveSubscription(user.final_date) &&
              isConektaUser(user.method) &&
              user.level === 1
            ) && (
                <button
                  className='purple-button'
                  style={{
                    fontSize: '14px'
                  }}
                  onClick={() => {
                    setOpenCuatriModal(true);
                  }}
                >
                  Cambiar a cuatrimestral
                </button>
              )}
            {(
              isActiveSubscription(user.final_date) &&
              isConektaUser(user.method) &&
              [1, 7].includes(user.level)
            ) && (
                <button
                  className='purple-button'
                  style={{
                    fontSize: '14px'
                  }}
                  onClick={() => {
                    setOpenAnualModal(true);
                  }}
                >
                  Cambiar a anualidad
                </button>
              )}
            {!loader &&
              ((user.level > 0 && user.plan_name === 'Gonvar Plus') ||
                (conektaUsers.filter(
                  (x: any) =>
                    x.email === user.email && user.final_date === 1694040000,
                ).length > 0 &&
                  today < user.final_date)) && (
                <button
                  onClick={() => {
                    setPop(true);
                  }}
                >
                  Cancelar Suscripción
                </button>
              )}
            {!loader &&
              user.level === 3 &&
              user.plan_name === 'Gonvar Plus' && (
                <button onClick={resumeSubscription}>
                  Reactivar Suscripción
                </button>
              )}
            {loader && <LoaderContainSpinner />}
          </div>
        </div>
        <div className='second-section'>
          <p className='first-text'>PROXIMAMENTE</p>
          <p className='second-text'>Refiere amigos</p>
          <p className='third-text'>
            Obtén premios para ti {!responsive1023 && <br />}y para ellos.
          </p>
        </div>
        <div className='img-hand'>
          <img src={handImage} />
        </div>
      </SubscriptionContainer>
    </ThirdBox>
  );
};
export default NextReward;
