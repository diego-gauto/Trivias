import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import s2 from './CreateInvoiceProductModal.module.css';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { date } from 'yup';
import { createProduct, createProductInvoice, createSeller } from './Queries';
import Image from 'next/image';

interface ICreateSellerModalContentProps {
  seller: ISeller
  onClose: () => void
}

export const ShowSellerModalContent = ({
  onClose,
  seller,
}: ICreateSellerModalContentProps) => {

  const [userUseRegisterButton, setUserUseRegisterButton] = useState(false);
  const [haveSuccessAtCreate, setHaveSuccessAtCreate] = useState(false);
  const [productsRequestIsFinish, setProductsRequestIsFinish] = useState(false);

  const { seller_id, name, last_name, email, phone_number, photo_url, postal_code } = seller;

  const isValidRequestValues = () => {
    return name.length > 0 && last_name.length > 0 && email.length > 0 && phone_number.length > 0;
  };

  return <div className={s['main-container']}>
    <div className={`${s['views']} ${productsRequestIsFinish ? s['transition-active'] : ''}`}>
      <div className={s['container']}>
        <div className={s['header']}>
          <h2 className={s['title']}>Dar de alta a vendedor</h2>
          <h3 className={s['subtitle']}>Ingrese los datos del vendedor</h3>
        </div>
        <div className={s['body']}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese el nombre"
              value={name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              id="apellidos"
              placeholder="Ingrese sus apellidos"
              value={last_name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Électronico</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Ingrese su correo eléctronico"
              value={email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">Número de celular</label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              placeholder="Ingrese su número de celular"
              value={phone_number}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo_url" className="form-label">URL de imagen</label>
            <input
              type="text"
              className="form-control"
              id="photo_url"
              placeholder="Ingrese su url de la imagen de perfil"
              value={photo_url || ''}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postal_code" className="form-label">Código postal</label>
            <input
              type="text"
              className="form-control"
              id="postal_code"
              placeholder="Ingrese su código postal"
              value={postal_code || ''}
              disabled
            />
          </div>
        </div>
        <div className={s['buttons']}>
          <button
            className={s['button']}
            onClick={(e) => {
              onClose();
              setUserUseRegisterButton(false);
            }}
          >
            Cerrar
          </button>
          <div
            className={`${s['button']} ${(!isValidRequestValues() || userUseRegisterButton === true)
              ? s['button--purple-disable']
              : s['button--purple']}`
            }
            onClick={async (e) => {
              /*
              if (!isValidRequestValues()) {
                return;
              }
              if (userUseRegisterButton) {
                return;
              }
              const canCreateInvoice = await createSeller(seller);
              setHaveSuccessAtCreate(canCreateInvoice);
              setProductsRequestIsFinish(true);
              */
            }}
          >
            Acción
          </div>
        </div>
      </div>
    </div>
  </div>
}