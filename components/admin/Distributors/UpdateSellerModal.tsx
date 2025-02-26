import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import s2 from './CreateInvoiceProductModal.module.css';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { createProduct, createProductInvoice, updateSeller } from './Queries';
import Image from 'next/image';

interface IUpdateSellerModalContentProps {
  seller: ISeller
  modifySeller: (seller: ISeller) => void
  onUpdate: (success: boolean) => void
  onClose: () => void
}

export const UpdateSellerModalContent = ({
  onUpdate,
  onClose,
  seller,
  modifySeller,
}: IUpdateSellerModalContentProps) => {

  const [userUseUpdateButton, setUserUseUpdateButton] = useState(false);
  const [haveSuccessAtCreate, setHaveSuccessAtCreate] = useState(false);
  const [productsRequestIsFinish, setSellerRequestIsFinish] = useState(false);

  const { seller_id, name, last_name, email, phone_number, photo_url, postal_code } = seller;

  const isValidRequestValues = () => {
    return name.length > 0 && last_name.length > 0 && email.length > 0 && phone_number.length > 0;
  };

  return <div className={s['main-container']}>
    <div className={`${s['views']} ${productsRequestIsFinish ? s['transition-active'] : ''}`}>
      <div className={s['container']}>
        <div className={s['header']}>
          <h2 className={s['title']}>Actualizar vendedor</h2>
          <h3 className={s['subtitle']}>Ingrese los nuevos datos</h3>
        </div>
        <div className={`${s['body']} ${s['body--scroll']}`}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese el nombre"
              value={name}
              onChange={(e) => {
                const { value } = e.target;
                modifySeller({
                  ...seller,
                  name: value
                });
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                modifySeller({
                  ...seller,
                  last_name: value
                });
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                modifySeller({
                  ...seller,
                  email: value
                });
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                modifySeller({
                  ...seller,
                  phone_number: value
                });
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                modifySeller({
                  ...seller,
                  photo_url: value
                });
              }}
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
              onChange={(e) => {
                const { value } = e.target;
                modifySeller({
                  ...seller,
                  postal_code: value
                });
              }}
            />
          </div>
        </div>
        <div className={s['buttons']}>
          <button
            className={s['button']}
            onClick={(e) => {
              onClose();
              setUserUseUpdateButton(false);
            }}
          >
            Cerrar
          </button>
          <div
            className={`${s['button']} ${(!isValidRequestValues() || userUseUpdateButton === true)
              ? s['button--purple-disable']
              : s['button--purple']}`
            }
            onClick={async (e) => {
              if (!isValidRequestValues()) {
                return;
              }
              if (userUseUpdateButton) {
                return;
              }
              const canUpdateSeller = await updateSeller(seller);
              setHaveSuccessAtCreate(canUpdateSeller);
              setSellerRequestIsFinish(true);
            }}
          >
            Actualizar
          </div>
        </div>
      </div>
      <div className={s['result-petition-section']}>
        <div className={s['result-petition-container']}>
          <div className={`${s['result-petition-icon']} ${s[`result-petition-icon--${haveSuccessAtCreate ? 'approve' : 'not-approve'}`]}`}>
            {
              haveSuccessAtCreate === true ? '✔' : '!'
            }
          </div>
          <h3 className={s['result-petition-title']}>
            {
              haveSuccessAtCreate ?
                '¡Se ha actualizado el vendedor con exito!'
                : '¡No se ha logrado actualizar el vendedor!'
            }
          </h3>
          <h4 className={s['result-petition-subtitle']}>
            {
              haveSuccessAtCreate ?
                'Ahora el vendedor esta actualizado'
                : 'Intente de nuevo esta acción'
            }
          </h4>
          <div className={s['result-petition-buttons']}>
            <button
              className={s['result-petition-button']}
              onClick={(e) => {
                onUpdate(haveSuccessAtCreate);
                onClose();
              }}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}