import styles from './DistributorsNew.module.css';
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { Modal } from '../UsersNew/GenericModal';
import { createANewDistributor, getAdminUserIdByEmail, getAllDistributorUserIds, getAllDistributorUsersArray, getAllDistributorUsersCount, getAllUsersArray, getAllUsersCount } from './Queries';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Pagination from '../../../components/Pagination/Pagination';

type MainSection = 'distributors' | 'common-users' | 'sells';

type DistributorsSubSection = 'distributors-list' | 'distributor-details';

type EntityParams = {
  offset: number,
  count: number,
}

export const DistributorsNew = () => {
  const [adminId, setAdminId] = useState<number>(0);
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [distributorsParams, setDistributorsParams] = useState<EntityParams>({
    offset: 0,
    count: 0,
  });
  const [commonUsers, setCommonUsers] = useState<IUser[]>([]);
  const [commonUsersParams, setCommonUsersParams] = useState<EntityParams>({
    offset: 0,
    count: 0,
  });
  const [distributorUserIds, setDistributorUserIds] = useState<IDistributorIdsWithUserId[]>([]);
  const [selectedDistributorId, setSelectedDistributorId] = useState<number>(-1);
  const [mainSection, setMainSection] = useState<MainSection>('distributors');
  const [distributorsSubSection, setDistributorsSubSection] = useState<DistributorsSubSection>('distributors-list');
  const [showMakeDistributorModal, setShowMakeDistributorModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const [canMakeUserADistributor, setCanMakeUserADistributor] = useState<boolean | null>(null);

  useEffect(() => {
    refreshDistributorIds();
    getAdminId();
  }, []);

  useEffect(() => {
    try {
      refreshDistributorsList();
    } catch (error) {
      console.error(error);
    }
  }, [distributorsParams.offset]);

  useEffect(() => {
    try {
      console.log('Esta cambiando el offset');
      refreshNormalUsersList();
    } catch (error) {
      console.error(error);
    }
  }, [commonUsersParams.offset]);

  async function getAdminId() {
    try {
      const adminId = await getAdminUserIdByEmail(localStorage.getItem('email') || '');
      setAdminId(adminId);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshDistributorsList() {
    try {
      const { offset } = distributorsParams;
      const distributorsListCount = await getAllDistributorUsersCount(inputValue);
      const distributorsList = await getAllDistributorUsersArray(offset, inputValue);
      setDistributorsParams({
        ...distributorsParams,
        count: distributorsListCount
      })
      setDistributors(distributorsList);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshNormalUsersList() {
    try {
      const { offset } = commonUsersParams;
      const usersListCount = await getAllUsersCount(inputValue);
      const usersList = await getAllUsersArray(offset, inputValue);
      setCommonUsersParams({
        ...commonUsersParams,
        count: usersListCount
      });
      console.log({ usersList });
      setCommonUsers(usersList);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshDistributorIds() {
    try {
      const ids = await getAllDistributorUserIds();
      setDistributorUserIds(ids);
    } catch (error) {
      console.error(error);
    }
  }

  const changePageDistributorList = (page: number) => {
    setDistributorsParams({
      ...distributorsParams,
      offset: page * 100,
    });
  };

  const changePageCommonUsersList = (page: number) => {
    setCommonUsersParams({
      ...commonUsersParams,
      offset: page * 100,
    });
  };

  async function tryToMakeUserDistributor(user_id: number) {
    const canCreateDistributor = await createANewDistributor(user_id, adminId);
    if (canCreateDistributor) {
      setCanMakeUserADistributor(true);
    } else {
      setCanMakeUserADistributor(false);
    }
  }

  return <div className={styles['container']}>
    <div className={styles['data-container']}>
      <div className={styles['user-main-header']}>
        <div className={styles['search-container']}>
          <IoMdSearch
            className={styles['search-icon']}
            size={25}
            color='#858585' />
          <input
            className={styles['search-distributor']}
            type="text"
            placeholder='Buscar'
            value={
              inputValue
            }
            onChange={(e) => {
              const { value } = e.target;
              setInputValue(value);
            }}
          />
        </div>
        <div className={styles['search-bar-elements']}>
          <div
            className={styles['search-bar-element']}
            onClick={(e) => {
              if (mainSection === 'distributors') {
                refreshDistributorsList();
              } else if (mainSection === 'common-users') {
                refreshNormalUsersList();
              }
            }}
          >
            <CiFilter
              size={25}
            />Filtrar
          </div>
          <div className={styles['search-bar-element']}>
            <IoMdAddCircleOutline
              size={25}
            /> Agregar distribuidor
          </div>
        </div>
      </div>
      <div className={styles['sections-container']}>
        <div
          className={`${styles['section-title']} ${mainSection === 'distributors' ? styles['section-title--active'] : ''}`}
          onClick={(e) => {
            setMainSection('distributors');
          }}
        >
          Distribuidores
        </div>
        <div
          className={`${styles['section-title']} ${mainSection === 'common-users' ? styles['section-title--active'] : ''}`}
          onClick={(e) => {
            setMainSection('common-users');
          }}
        >
          Usuarios comunes
        </div>
        <div
          className={`${styles['section-title']} ${mainSection === 'sells' ? styles['section-title--active'] : ''}`}
          onClick={(e) => {
            setMainSection('sells');
          }}
        >
          Ventas
        </div>
      </div>
      <div className={styles['content-section']}>
        {
          (mainSection === 'distributors' && distributorsSubSection === 'distributors-list') &&
          <>
            <div className={styles['main-header-section']}>
              <h2 className={styles['content-title']}>Listado de distribuidores</h2>
              <div className={styles['pagination-section']}>
                <Pagination
                  /*
                  <Pagination
                    changePage={changePage}
                    currentPage={userFilters.offset / 100}
                    totalPage={Math.ceil(totalAssignments / 100)}
                  />
                  */
                  changePage={changePageDistributorList}
                  currentPage={distributorsParams.offset / 100}
                  totalPage={Math.ceil(distributorsParams.count / 100)}
                />
              </div>
            </div>
            {
              distributors.length > 0 &&
              <div className={styles['table-content']}>
                <table className={styles['gonvar-table']}>
                  <thead className={styles['gonvar-table__thead']}>
                    <tr className={styles['gonvar-table__row']}>
                      <th className={styles['gonvar-table__th']}>Distribuidor</th>
                      <th className={styles['gonvar-table__th']}>Correo eléctronico</th>
                      <th className={styles['gonvar-table__th']}>Número de celular</th>
                      <th className={styles['gonvar-table__th']}>Estado de origen</th>
                      <th className={styles['gonvar-table__th']}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      distributors.map((d, i) => {
                        return <tr
                          className={styles['gonvar-table__row']}
                          key={`distributor_${i}`}
                        >
                          <td className={styles['gonvar-table__data']}>
                            {d.name}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {d.email}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {d.phone_number}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {d.origin_state}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            <button
                              className={styles['gonvar-table__button']}
                              onClick={(e) => {
                                setDistributorsSubSection('distributor-details');
                                setSelectedDistributorId(d.distributor_id);
                              }}
                            >
                              Ver perfil
                            </button>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            }
            {
              distributors.length === 0 &&
              <div className={styles['empty-container']}>
                <div className={styles['empty-content']}>
                  <p className={styles['empty-content-text']}>
                    No se encuentran distribuidores con los parametros dados.
                  </p>
                </div>
              </div>
            }
          </>
        }
        {
          (mainSection === 'distributors' && distributorsSubSection === 'distributor-details') &&
          <>
            <div className={styles['go-back-container']}>
              {/* GO BACK */}
              <div
                className={styles['go-back']}
                onClick={(e) => {
                  setDistributorsSubSection('distributors-list');
                }}
              >
                <FaLongArrowAltLeft size={30} />
                <span className={styles['']}>Atrás</span>
              </div>
            </div>
            <h2 className={styles['content-title']}>Detalles</h2>
            <div>

            </div>
          </>
        }
        {
          (mainSection === 'common-users' && canMakeUserADistributor === null) &&
          <>
            <div className={styles['main-header-section']}>
              <h2 className={styles['content-title']}>Listado de usuarios comunes</h2>
              <div className={styles['pagination-section']}>
                <Pagination
                  changePage={changePageCommonUsersList}
                  currentPage={commonUsersParams.offset / 100}
                  totalPage={Math.ceil(commonUsersParams.count / 100)}
                />
              </div>
            </div>
            {
              commonUsers.length > 0 &&
              <div className={styles['table-content']}>
                <table className={styles['gonvar-table']}>
                  <thead className={styles['gonvar-table__thead']}>
                    <tr className={styles['gonvar-table__row']}>
                      <th className={styles['gonvar-table__th']}>Nombre</th>
                      <th className={styles['gonvar-table__th']}>Correo eléctronico</th>
                      <th className={styles['gonvar-table__th']}>Número de celular</th>
                      <th className={styles['gonvar-table__th']}>Pais</th>
                      <th className={styles['gonvar-table__th']}>Estado de origen</th>
                      <th className={styles['gonvar-table__th']}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      commonUsers.map((cu, i) => {
                        return <tr
                          className={styles['gonvar-table__row']}
                          key={`user_${i}`}
                        >
                          <td className={styles['gonvar-table__data']}>
                            {cu.name}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {cu.email}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {cu.phone_number}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {cu.country}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {cu.origin_state}
                          </td>
                          <td className={styles['gonvar-table__data']}>
                            {
                              distributorUserIds.find(d => d.user_id === cu.user_id) === undefined &&
                              <button
                                className={styles['gonvar-table__button']}
                                onClick={(e) => {
                                  tryToMakeUserDistributor(cu.user_id);
                                }}
                              >
                                Hacer distribuidor
                              </button>
                            }
                            {
                              distributorUserIds.find(d => d.user_id === cu.user_id) !== undefined &&
                              <p style={{
                                margin: '0',
                                fontWeight: 'bold',
                                border: '1px solid black',
                                borderRadius: '12px',
                                padding: '6px',
                                userSelect: 'none',
                                fontSize: '12px'
                              }}>
                                Es distribuidor
                              </p>
                            }
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            }
            {
              commonUsers.length === 0 &&
              <div className={styles['empty-container']}>
                <div className={styles['empty-content']}>
                  <p className={styles['empty-content-text']}>
                    No se encuentran usuarios con los parametros dados.
                  </p>
                </div>
              </div>
            }
          </>
        }
        {
          (mainSection === 'common-users' && canMakeUserADistributor !== null) &&
          <div className={styles['result-petition-section']}>
            <div className={styles['result-petition-container']}>
              <div className={`${styles['result-petition-icon']} ${styles[`result-petition-icon--${canMakeUserADistributor ? 'approve' : 'not-approve'}`]}`}>
                {
                  canMakeUserADistributor === true ? '✔' : '!'
                }
              </div>
              <h3 className={styles['result-petition-title']}>
                {
                  canMakeUserADistributor ?
                    '¡Se ha asignado como distribudor con exito!'
                    : '¡No se ha asignado como distribudor con exito!'
                }
              </h3>
              <h4 className={styles['result-petition-subtitle']}>
                {
                  canMakeUserADistributor ?
                    'Ahora el usuario puede distribuir productos'
                    : 'Intente de nuevo esta acción, quizas tambien el usuario ya sea distribuidor'
                }
              </h4>
              <div className={styles['result-petition-buttons']}>
                <button
                  className={styles['result-petition-button']}
                  onClick={(e) => {
                    setCanMakeUserADistributor(null);
                    refreshDistributorIds();
                  }}
                >
                  Regresar a usuarios
                </button>
              </div>
            </div>
          </div>
        }
        {
          mainSection === 'sells' &&
          <>
            <div className={styles['sells-section']}>
              <h2 className={styles['content-title']}>Listado de ventas</h2>
              <div className={styles['pagination-section']}>
                <Pagination
                  changePage={changePageCommonUsersList}
                  currentPage={commonUsersParams.offset / 100}
                  totalPage={Math.ceil(commonUsersParams.count / 100)}
                />
              </div>
            </div>
          </>
        }
        {
          mainSection === 'sells' &&
          <div style={{
            display: 'none',
            justifyContent: 'center',
            padding: '64px 16px',
            fontWeight: '600',
            backgroundColor: 'rgb(230, 230, 230)',
            borderRadius: '32px'
          }}>
            <div style={{
            }}>
              Pendiente
            </div>
          </div>
        }
      </div>
    </div>
    {
      showMakeDistributorModal &&
      <Modal
        child={<></>}
        show={showMakeDistributorModal}
        onClose={() => {
          setShowMakeDistributorModal(false);
        }}
      />
    }
  </div>
}