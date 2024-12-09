import Image from 'next/image';
import styles from './DistributorModal.module.css';
import { IoMdClose } from "react-icons/io";

/*

Nombre:
Correo Electrónico:
Numero de celular:
Usuario creado en:
Asignado como distribuidor en:
Asignado por:
-> Usuario que lo convirtió en distribuidor
*/

interface IAdmin {
  admin_id: number
  user_id: number
  name: string
  email: string
  phone_number: string
}

interface IDistributor {
  distributor_id: number
  name: string
  phone_number: string
  photo: string
  user_created_at: number
  distributor_created_at: number
  admin_user_id: number
  country: string | null,
  email: string
}

interface IDistributorModalProps {
  setIsVisible: (isVisible: boolean) => void;
  distributor: IDistributor,
  adminsList: IAdmin[]
}

export const DistributorModal = ({
  setIsVisible,
  distributor,
  adminsList
}: IDistributorModalProps) => {

  const generateDateWithFormat = (time: number) => {
    const date = new Date(time * 1000);
    const monthsOfYear = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return `${date.getDate()} de ${monthsOfYear[date.getMonth()]} de ${date.getFullYear()}`;
  }

  const getAdminName = (searchedId: number) => {
    const admin = adminsList.find(a => a.admin_id === searchedId);
    console.log({ adminsList });
    if (admin) {
      return admin.name;
    }
    return 'Desconocido';
  }

  return <div className={styles['distributor-modal']}>
    <div className={styles['close-modal-container']}>
      <div
        className={styles['close-modal-button']}
        onClick={(e) => {
          setIsVisible(false);
        }}
      >
        <IoMdClose size={30} />
      </div>
    </div>
    <header className={styles['header']}>
      <h3 className={styles['title']}>Distribuidor activo</h3>
      <div className={styles['image-container']}>
        <Image
          src={distributor.photo}
          width={150}
          height={150}
        />
      </div>
    </header>
    <div className={styles['properties']}>
      <div className={styles['property']}>
        <strong className={styles['property-title']}>
          Nombre
        </strong>
        <p className={styles['property-content-text']}>
          {
            distributor.name
          }
        </p>
      </div>
      <div className={styles['property']}>
        <strong className={styles['property-title']}>
          Correo electrónico
        </strong>
        <p className={styles['property-content-text']}>
          {
            distributor.email
          }
        </p>
      </div>
      <div className={styles['property']}>
        <strong className={styles['property-title']}>
          Número de celular
        </strong>
        <p className={styles['property-content-text']}>
          {
            distributor.phone_number
          }
        </p>
      </div>
      <div className={styles['property']}>
        <strong className={styles['property-title']}>
          Usuario creado en
        </strong>
        <p className={styles['property-content-text']}>
          {
            generateDateWithFormat(distributor.user_created_at)
          }
        </p>
      </div>
      <div className={styles['property']}>
        <strong className={styles['property-title']}>
          Hecho distribuidor en
        </strong>
        <p className={styles['property-content-text']}>
          {
            generateDateWithFormat(distributor.distributor_created_at)
          }
        </p>
      </div>
      <div className={styles['property']}>
        <strong className={styles['property-title']}>
          Hecho distribuidor por
        </strong>
        <p className={styles['property-content-text']}>
          {
            getAdminName(distributor.admin_user_id)
          }
        </p>
      </div>
    </div>
    <div className={styles['buttons-container']}>
      <button className={styles['button']}>Quitar rol de distribuidor</button>
      <button className={styles['button']}>Generar codigos</button>
    </div>
  </div>
}