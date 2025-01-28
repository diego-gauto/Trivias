import styles from './DistributorsNew.module.css';
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { useState } from 'react';
import { Modal } from '../UsersNew/GenericModal';

interface IDistributor {
  userId: number,
  username: string,
  email: string,
  phonenumber: string,
  originState: string,
}

type MainSection = 'distributors-list' | 'common-users' | 'sells';

export const DistributorsNew = () => {
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [mainSection, setMainSection] = useState<MainSection>('distributors-list');
  const [showMakeDistributorModal, setShowMakeDistributorModal] = useState(false);

  return <div className={styles['container']}>
    <div className={styles['data-container']}>
      <div className={styles['user-main-header']}>
        <div className={styles['search-container']}>
          <IoMdSearch
            className={styles['search-icon']}
            size={25}
            color='#858585' />
          <input className={styles['search-distributor']} type="text" placeholder='Buscar' />
        </div>
        <div className={styles['search-bar-elements']}>
          <div className={styles['search-bar-element']}>
            <CiFilter
              size={25}
            /> Filtrar
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
          className={`${styles['section-title']} ${mainSection === 'distributors-list' ? styles['section-title--active'] : ''}`}
          onClick={(e) => {
            setMainSection('distributors-list');
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
          mainSection === 'distributors-list' &&
          <>
            <h2 className={styles['content-title']}>Listado de distribuidores</h2>
            <div>

            </div>
            <div className={styles['table-content']}>
              <table className={styles['gonvar-table']}>
                <thead className={styles['gonvar-table__thead']}>
                  <tr className={styles['gonvar-table__row']}>
                    <th className={styles['gonvar-table__th']}>Distribuidor</th>
                    <th className={styles['gonvar-table__th']}>Correo eléctronico</th>
                    <th className={styles['gonvar-table__th']}>Número de celular</th>
                    <th className={styles['gonvar-table__th']}>Pais</th>
                    <th className={styles['gonvar-table__th']}>Estado de origen</th>
                    <th className={styles['gonvar-table__th']}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Diseño de uñas</td>
                    <td className={styles['gonvar-table__data']}>disenos.a.la.medida@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 642 1819923</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Oaxaca</td>
                    <td className={styles['gonvar-table__data']}>
                      <button
                        className={styles['gonvar-table__button']}
                        onClick={(e) => {
                          setShowMakeDistributorModal(true);
                        }}
                      >
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Estetica primavera</td>
                    <td className={styles['gonvar-table__data']}>estetica.primavera.2023@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 642 2819923</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Sonora</td>
                    <td className={styles['gonvar-table__data']}>
                      <button
                        className={styles['gonvar-table__button']}
                        onClick={(e) => {
                          setShowMakeDistributorModal(true);
                        }}
                      >
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Mary Cruz Nails</td>
                    <td className={styles['gonvar-table__data']}>maria.alejandra54232@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 642 3817951</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Sonora</td>
                    <td className={styles['gonvar-table__data']}>
                      <button
                        className={styles['gonvar-table__button']}
                        onClick={(e) => {
                          setShowMakeDistributorModal(true);
                        }}
                      >
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        }
        {
          mainSection === 'common-users' &&
          <>
            <h2 className={styles['content-title']}>Listado de usuarios comunes</h2>
            <div>

            </div>
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
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Alma Alejandra Valenzuela</td>
                    <td className={styles['gonvar-table__data']}>alma.alejandra@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 642 1819923</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Oaxaca</td>
                    <td className={styles['gonvar-table__data']}>
                      <button
                        className={styles['gonvar-table__button']}
                        onClick={(e) => {
                          setShowMakeDistributorModal(true);
                        }}
                      >
                        Hacer distribuidor
                      </button>
                    </td>
                  </tr>
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Cielo Vianey Enriquez</td>
                    <td className={styles['gonvar-table__data']}>estetica.primavera.2023@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 812 2819923</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Nuevo León</td>
                    <td className={styles['gonvar-table__data']}>
                      Ya es distribuidor
                    </td>
                  </tr>
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Maria Jose Félix</td>
                    <td className={styles['gonvar-table__data']}>maria.jose.felix@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 642 3817951</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Sonora</td>
                    <td className={styles['gonvar-table__data']}>
                      <button
                        className={styles['gonvar-table__button']}
                      >
                        Hacer distribuidor
                      </button>
                    </td>
                  </tr>
                  <tr className={styles['gonvar-table__row']}>
                    <td className={styles['gonvar-table__data']}>Almeida Rosas</td>
                    <td className={styles['gonvar-table__data']}>almeida.rosas.1992@gmail.com</td>
                    <td className={styles['gonvar-table__data']}>+52 642 3817951</td>
                    <td className={styles['gonvar-table__data']}>México</td>
                    <td className={styles['gonvar-table__data']}>Sonora</td>
                    <td className={styles['gonvar-table__data']}>
                      <button
                        className={styles['gonvar-table__button']}
                      >
                        Hacer distribuidor
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        }
        {
          mainSection === 'sells' &&
          <div style={{
            display: 'flex',
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