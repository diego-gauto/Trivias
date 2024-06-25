import React, { useEffect, useState } from 'react';
import { MainContainer } from './UsersNew.styled';
import { getGenericQueryResponse } from '../../api/admin';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { useRouter } from 'next/router';

type MainMenuOptionId = 'Subscription' | 'Payments' | 'Courses' | 'Rewards';
type RewardsCenterMenuOptionId = 'Rewards' | 'Benefits' | 'Certificates';

const MONTHS_SPANISH = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface IMainMenuOption {
  id: MainMenuOptionId,
  label: string
}

interface IRewardsCenterMenuOption {
  id: RewardsCenterMenuOptionId,
  label: string
}

interface IUserMainProperties {
  username: string,
  email: string,
  phone: string,
  createdAt: string,
  points: number,
  photo: string
}

interface IUserPaymentHistory {
  orderNumber: number
  amount: number
  paidAt: string
  product: string
}

const MAIN_SECTIONS: IMainMenuOption[] = [
  {
    label: 'Suscripción',
    id: 'Subscription'
  },
  {
    label: 'Historial de pago',
    id: 'Payments'
  },
  {
    label: 'Cursos Realizados',
    id: 'Courses'
  },
  {
    label: 'Centro de recompensas',
    id: 'Rewards'
  }];

const REWARDS_SECTIONS: IRewardsCenterMenuOption[] = [{
  label: 'Recompensas',
  id: 'Rewards'
}, {
  label: 'Beneficios',
  id: 'Benefits'
}, {
  label: 'Certificados',
  id: 'Certificates'
}
];

const getFormatedDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const UsersDetails = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [selectedMainMenuOption, setSelectedMainMenuOption] = useState<MainMenuOptionId>('Payments');
  const [selectedRewardsCenterMenuOption, setSelectedRewardsCenterMenuOption] = useState<RewardsCenterMenuOptionId>('Rewards');
  const [viewHomeworks, setViewHomeworks] = useState(false);
  const [rewardsMenuOption, setRewardsMenuOption] = useState();
  const [userMainProperties, setUserMainProperties] = useState<IUserMainProperties>({} as IUserMainProperties);
  const [userPaymentHistory, setUserPaymentHistory] = useState<IUserPaymentHistory[]>([]);

  const changeMainMenuOptionHandler = (newOption: MainMenuOptionId) => {
    setSelectedMainMenuOption(newOption);
  }

  /*
  En el div cuya clase es "sections-container", hay que agregar la clase "section-title--active"
  para aclarar en cual sección esta el usuario
  */

  useEffect(() => {
    const selectedUserId = localStorage.getItem('selected-user-id');
    if (selectedUserId !== null) {
      setUserId(parseInt(selectedUserId));
    }
  }, []);

  useEffect(() => {
    if (userId !== 0) {
      getUserMainProperties();
      getUserPaymentHistory();
    }
  }, [userId]);

  const getUserMainProperties = async () => {
    const userMainPropertiesQuery = `select concat(name, ' ', last_name) as username, email, phone_number, photo, score, created_at
      from users 
      where id = ${userId};`

    interface IUserMainPropertiesResponse {
      username: string
      email: string
      phone_number: string
      photo: string
      score: number
      created_at: string
    }

    const response = await getGenericQueryResponse(userMainPropertiesQuery);
    const userProperties: IUserMainPropertiesResponse = response.data.data[0];

    console.log({ response });

    const { username, created_at, email, phone_number, photo, score } = userProperties;

    setUserMainProperties({
      username,
      createdAt: created_at,
      email,
      phone: phone_number,
      points: score,
      photo
    });
  }

  const getUserPaymentHistory = async () => {
    const query = `select id as order_number, amount, paid_at, product 
    from invoices 
    where user_id = ${userId};`;

    interface IUserPaymentHistoryResponse {
      order_number: number;
      amount: number;
      paid_at: string;
      product: string;
    }

    const response = await getGenericQueryResponse(query);
    const userPaymentHistory: IUserPaymentHistoryResponse[] = response.data.data;

    const result: IUserPaymentHistory[] = [];
    userPaymentHistory.forEach(({ amount, order_number, paid_at, product }) => {
      result.push({
        amount,
        orderNumber: order_number,
        paidAt: paid_at,
        product
      });
    });

    setUserPaymentHistory(result);
  }

  return (
    <MainContainer>
      <div
        className="top-header"
        onClick={() => {
          localStorage.removeItem('selected-user-id');
          router.push({
            pathname: '/admin/Users'
          });
        }}
      >
        {/*<i>🔙</i>*/}
        <img className="go-back__arrow" src="/images/back-arrow.png" alt="back-arrow" />
        <p style={{ margin: '0' }}>Atrás</p>
      </div>
      <div className="data-container">
        <div className="user-main-header">
          <div className="user-profile">
            <div className="user-image">
              <img src={`${userMainProperties.photo}`} alt="user profile photo" />
            </div>
            <div className="user-name">
              {userMainProperties.username}
            </div>
          </div>
          <div className="user-properties">
            <div className="user-property">
              <div className="user-property-header">Correo electrónico</div>
              <div className="user-property-value">{userMainProperties.email}</div>
            </div>
            <div className="user-property">
              <div className="user-property-header">Teléfono</div>
              <div className="user-property-value">{userMainProperties.phone}</div>
            </div>
            <div className="user-property">
              <div className="user-property-header">Fecha de creación</div>
              <div className="user-property-value">{getFormatedDate(new Date(userMainProperties.createdAt))}</div>
            </div>
            <div className="user-property">
              <div className="user-property-header">Puntos</div>
              <div className="user-property-value">{userMainProperties.points}</div>
            </div>
          </div>
        </div>
        <div className="sections-container">
          {
            MAIN_SECTIONS.map(({ id, label }) => {
              const extraCSSClass = selectedMainMenuOption === id ? 'section-title--active' : '';
              return (
                <div
                  key={`${id}`}
                  className={`section-title ${extraCSSClass}`}
                  onClick={(e) => {
                    setSelectedMainMenuOption(id)
                  }}
                >
                  {label}
                </div>
              )
            })
          }
        </div>
        {
          selectedMainMenuOption === 'Subscription' &&
          <div className="content-section">
            <div className="table-content">
              <table className="gonvar-table">
                <thead className="gonvar-table__thead">
                  <tr className="gonvar-table__row">
                    <th className="gonvar-table__th">Estado de la suscripción</th>
                    <th className="gonvar-table__th">Tipo de suscripción</th>
                    <th className="gonvar-table__th">Método de suscripción</th>
                    <th className="gonvar-table__th">Inicio</th>
                    <th className="gonvar-table__th">Final</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">#15267</td>
                    <td className="gonvar-table__data">Mar 1, 2023</td>
                    <td className="gonvar-table__data">Gonvar Plus Cuatrimestral</td>
                    <td className="gonvar-table__data">1499</td>
                  </tr>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">#15663</td>
                    <td className="gonvar-table__data">Abr 2, 2023</td>
                    <td className="gonvar-table__data">Gonvar Plus Cuatrimestral</td>
                    <td className="gonvar-table__data">1499</td>
                  </tr>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">#15814</td>
                    <td className="gonvar-table__data">May 3, 2023</td>
                    <td className="gonvar-table__data">Gonvar Plus Cuatrimestral</td>
                    <td className="gonvar-table__data">1499</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        {
          selectedMainMenuOption === 'Payments' &&
          <div className="content-section">
            {
              userPaymentHistory.length > 0 ?
                <div className="table-content">
                  <table className="gonvar-table">
                    <thead className="gonvar-table__thead">
                      <tr className="gonvar-table__row">
                        <th className="gonvar-table__th">Numero de orden</th>
                        <th className="gonvar-table__th">Fecha de pago</th>
                        <th className="gonvar-table__th">Producto</th>
                        <th className="gonvar-table__th">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userPaymentHistory.map(({ amount, orderNumber, paidAt, product }) => {
                          const date = new Date(paidAt);
                          const monthIndex = date.getMonth();
                          const day = date.getDate();
                          const year = date.getFullYear();
                          const formatedDate = `${MONTHS_SPANISH[monthIndex]} ${day}, ${year}`;
                          return (
                            <tr className="gonvar-table__row" key={orderNumber}>
                              <td className="gonvar-table__data">#{orderNumber}</td>
                              <td className="gonvar-table__data">{formatedDate}</td>
                              <td className="gonvar-table__data">{product}</td>
                              <td className="gonvar-table__data">{amount / 100}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
                : <div style={{
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <div style={{
                    backgroundColor: '#eee',
                    padding: '40px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '16px'
                  }}>
                    <p style={{
                      margin: '0',
                      fontWeight: '500'
                    }}>No existen registros de pagos para este usuario</p>
                  </div>
                </div>
            }

          </div>
        }
        {
          (selectedMainMenuOption === 'Courses' && !viewHomeworks) &&
          <div className="content-section">
            <div className="table-content">
              <table className="gonvar-table">
                <thead className="gonvar-table__thead">
                  <tr className="gonvar-table__row">
                    <th className="gonvar-table__th">Nombre de curso</th>
                    <th className="gonvar-table__th">Último ingreso</th>
                    <th className="gonvar-table__th">Fecha de finalización</th>
                    <th className="gonvar-table__th">Estado</th>
                    <th className="gonvar-table__th">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">Técnica Básica</td>
                    <td className="gonvar-table__data">Mar 1, 2023</td>
                    <td className="gonvar-table__data">- - -</td>
                    <td className="gonvar-table__data">50%</td>
                    <td className="gonvar-table__data">
                      <button
                        type="button"
                        className="gonvar-table__button"
                        onClick={(e) => {
                          setViewHomeworks(true);
                        }}>
                        Ver tareas
                      </button>
                    </td>
                  </tr>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">Diseño de Uñas</td>
                    <td className="gonvar-table__data">Abr 2, 2023</td>
                    <td className="gonvar-table__data">- - -</td>
                    <td className="gonvar-table__data">60%</td>
                    <td className="gonvar-table__data">
                      <button type="button" className="gonvar-table__button">
                        Ver tareas
                      </button>
                    </td>
                  </tr>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">Esmaltado Permanente</td>
                    <td className="gonvar-table__data">Feb 16, 2033</td>
                    <td className="gonvar-table__data">May 3, 2023</td>
                    <td className="gonvar-table__data">70%</td>
                    <td className="gonvar-table__data">
                      <button type="button" className="gonvar-table__button">
                        Ver tareas
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }

        {
          (selectedMainMenuOption === 'Courses' && viewHomeworks) &&
          <div className="content-section content-section--with-go-back">
            <div className="table-content">
              <table className="gonvar-table">
                <thead className="gonvar-table__thead">
                  <tr className="gonvar-table__row">
                    <th className="gonvar-table__th">Todas las tareas</th>
                    <th className="gonvar-table__th">Estado de tarea</th>
                    <th className="gonvar-table__th">Link de tarea</th>
                    <th className="gonvar-table__th">Retro alimentación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">Primera tarea</td>
                    <td className="gonvar-table__data">
                      <div className="gonvar-table__approved-text">
                        Aprobada
                      </div>
                    </td>
                    <td className="gonvar-table__data">
                      <button type="button" className="gonvar-table__button">
                        Ir a tarea
                      </button>
                    </td>
                    <td className="gonvar-table__data gonvar-table__data--large-text">Excelente trabajo en la investigación. Los datos presentados son claros y concisos. Me gustaría ver más análisis crítico en la próxima tarea para profundizar en los hallazgos.</td>
                  </tr>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">Segunda tarea</td>
                    <td className="gonvar-table__data">
                      <div className="gonvar-table__approved-text">
                        Aprobada
                      </div>
                    </td>
                    <td className="gonvar-table__data">
                      <button type="button" className="gonvar-table__button">
                        Ir a tarea
                      </button>
                    </td>
                    <td className="gonvar-table__data gonvar-table__data--large-text">Buen esfuerzo en abordar el tema. Considera mejorar la coherencia entre los párrafos y añadir ejemplos más específicos para respaldar tus argumentos.</td>
                  </tr>
                  <tr className="gonvar-table__row">
                    <td className="gonvar-table__data">Tercera tarea</td>
                    <td className="gonvar-table__data">
                      <div className="gonvar-table__not-approved-text">
                        Reprobada
                      </div>
                    </td>
                    <td className="gonvar-table__data">
                      <button type="button" className="gonvar-table__button">
                        Ir a tarea
                      </button>
                    </td>
                    <td className="gonvar-table__data gonvar-table__data--large-text">Has mostrado una buena capacidad de síntesis en tu trabajo. Intenta profundizar más en los conceptos teóricos para ofrecer una perspectiva más completa en tu análisis.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="go-back"
              onClick={(e) => {
                setViewHomeworks(false);
              }}
            >
              <img
                className="go-back__arrow"
                src="/images/back-arrow.png"
                alt="back-arrow" />
              <p style={{ margin: '0' }}>Regresar</p>
            </div>
          </div>
        }
        {
          (selectedMainMenuOption === 'Rewards') &&
          <div className="content-section">
            <div className="rewards-sections">
              {
                REWARDS_SECTIONS.map(({ id, label }) => {
                  const extraCSSClass = selectedRewardsCenterMenuOption === id ? 'rewards-sections__option--active' : '';
                  return (
                    <div
                      className={`rewards-sections__option ${extraCSSClass}`}
                      id={id}
                      onClick={(e) => {
                        setSelectedRewardsCenterMenuOption(id)
                      }}
                    >
                      {label}
                    </div>
                  )
                })
              }
            </div>
            {
              (selectedRewardsCenterMenuOption === 'Rewards') &&
              <div className="rewards-details">
                <div className="accumulated-rewards">
                  <p>Recompensas acumuladas</p>
                  <div className="rewards__grid-container">
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locked-rewards">
                  <p>Recompensas por desbloquear</p>
                  <div className="empty-content-area">
                    No se encuentran recompensas por desbloquear
                  </div>
                </div>
              </div>
            }
            {
              (selectedRewardsCenterMenuOption === 'Benefits') &&
              <div className="rewards-details">
                <div className="accumulated-rewards">
                  <p>Beneficios acumuladas</p>
                  <div className="rewards__grid-container">
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                    <div className="rewards__grid-item">
                      <div className="reward-card">
                        <p className="reward-card__title">Titulo de recompensa</p>
                        <p className="reward-card__subtitle">Pequeña descripción de la recompensa</p>
                        <div className="reward-card__image-container">
                          <img className="reward-card__image" src="/images/Rewards/reward1.png"
                            alt="Recompensa de usuario iniciante" />
                        </div>
                        <p className="reward-card__bottom-text">Texto inferior de la carta de la recompensa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locked-rewards">
                  <p>Beneficios por desbloquear</p>
                  <div className="empty-content-area">
                    No se encuentran recompensas por desbloquear
                  </div>
                </div>
              </div>
            }
            {
              selectedRewardsCenterMenuOption === 'Certificates' &&
              <div className="rewards-details">
                <div className="accumulated-rewards">
                  <p>Certificados acumuladas</p>
                  <div className="rewards__grid-container">
                    <div className="rewards__grid-item">
                      <div className="certificate-card">
                        <div className="certificate-card__image-container">
                          <img className="certificate-card__image" src="/images/admin/course-banner-01 - copia.png"
                            alt='Banner de curso de curso de uñas de "Diseños navideños"' />
                        </div>
                        <p className="certificate-card__course-title">Diseños navideños</p>
                        <p className="reward-card__instructor-name">Arita gonvar</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locked-rewards">
                  <p>Certificados por desbloquear</p>
                  <div className="empty-content-area">
                    No se encuentran certificados por desbloquear
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </MainContainer>
  )
}

export default UsersDetails;