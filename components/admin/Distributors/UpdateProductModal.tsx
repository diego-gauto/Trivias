import { useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import { createProduct, updateProduct } from './Queries';

interface IUpdateProductModalProps {
  product: IProduct
  modifyProduct: (newProduct: IProduct) => void
  onUpdate: (success: boolean) => void
  onClose: () => void
}

export const UpdateProductModal = ({
  onUpdate: onUpdate,
  onClose,
  product,
  modifyProduct,
}: IUpdateProductModalProps) => {

  const [userUseUpdateButton, setUserUseUpdateButton] = useState(false);
  const [haveSuccessAtUpdate, setHaveSuccessAtUpdate] = useState(false);
  const [productRequestIsFinish, setProductRequestIsFinish] = useState(false);

  const { name, image, default_price } = product;

  const isValidRequestValues = () => {
    return name.length > 0 && default_price > 0;
  };

  return <div className={s['main-container']}>
    <div className={`${s['views']} ${productRequestIsFinish ? s['transition-active'] : ''}`}>
      <div className={s['container']}>
        <div className={s['header']}>
          <h2 className={s['title']}>Actualizar producto</h2>
          <h3 className={s['subtitle']}>Ingrese los nuevos datos</h3>
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
              onChange={(e) => {
                const { value } = e.target;
                modifyProduct({
                  ...product,
                  name: value
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              placeholder="Ingrese la URL"
              value={image || ''}
              onChange={(e) => {
                const { value } = e.target;
                modifyProduct({
                  ...product,
                  image: value
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              id="precio"
              placeholder="Ingrese el precio"
              value={`${default_price}`}
              onChange={(e) => {
                const { value } = e.target;
                modifyProduct({
                  ...product,
                  default_price: value === '' ? 0 : parseFloat(value)
                });
              }}
              min={0}
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
              const canUpdateProduct = await updateProduct(product);
              setHaveSuccessAtUpdate(canUpdateProduct);
              setProductRequestIsFinish(true);
            }}
          >
            Actualizar
          </div>
        </div>
      </div>
      <div className={s['result-petition-section']}>
        <div className={s['result-petition-container']}>
          <div className={`${s['result-petition-icon']} ${s[`result-petition-icon--${haveSuccessAtUpdate ? 'approve' : 'not-approve'}`]}`}>
            {
              haveSuccessAtUpdate === true ? '✔' : '!'
            }
          </div>
          <h3 className={s['result-petition-title']}>
            {
              haveSuccessAtUpdate ?
                '¡Se ha actualizado el producto con exito!'
                : '¡No se ha logrado actualizar el producto!'
            }
          </h3>
          <h4 className={s['result-petition-subtitle']}>
            {
              haveSuccessAtUpdate ?
                'Ahora los datos son correctos'
                : 'Intente de nuevo esta acción'
            }
          </h4>
          <div className={s['result-petition-buttons']}>
            <button
              className={s['result-petition-button']}
              onClick={(e) => {
                onUpdate(haveSuccessAtUpdate);
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