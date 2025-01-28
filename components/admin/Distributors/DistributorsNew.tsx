import styles from './DistributorsNew.module.css';
import { Modal } from '../DefaultComponents/Modal';
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { useState } from 'react';

interface IDistributor {
  userId: number,
  username: string,
  email: string,
  phonenumber: string,
  originState: string,
}

type MainSection = 'distributors-list';

export const DistributorsNew = () => {
  const [distributors, setDistributors] = useState<IDistributor[]>([]);
  const [mainSection, setMainSection] = useState<MainSection>('distributors-list');

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
        <div className={`${styles['section-title']} ${styles['section-title--active']}`}>
          Distribuidores
        </div>
        <div className={styles['section-title']}>
          Usuarios comunes
        </div>
        <div className={styles['section-title']}>
          Ventas
        </div>
      </div>
      <div className={styles['content-section']}>
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
              </tr>
            </thead>
            <tbody>
              <tr className={styles['gonvar-table__row']}>
                <td className={styles['gonvar-table__data']}>Diseño de uñas</td>
                <td className={styles['gonvar-table__data']}>disenos.a.la.medida@gmail.com</td>
                <td className={styles['gonvar-table__data']}>+52 642 1819923</td>
                <td className={styles['gonvar-table__data']}>México</td>
                <td className={styles['gonvar-table__data']}>Oaxaca</td>
              </tr>
              <tr className={styles['gonvar-table__row']}>
                <td className={styles['gonvar-table__data']}>Estetica primavera</td>
                <td className={styles['gonvar-table__data']}>estetica.primavera.2023@gmail.com</td>
                <td className={styles['gonvar-table__data']}>+52 642 2819923</td>
                <td className={styles['gonvar-table__data']}>México</td>
                <td className={styles['gonvar-table__data']}>Sonora</td>
              </tr>
              <tr className={styles['gonvar-table__row']}>
                <td className={styles['gonvar-table__data']}>Mary Cruz Nails</td>
                <td className={styles['gonvar-table__data']}>maria.alejandra54232@gmail.com</td>
                <td className={styles['gonvar-table__data']}>+52 642 3817951</td>
                <td className={styles['gonvar-table__data']}>México</td>
                <td className={styles['gonvar-table__data']}>Sonora</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
}