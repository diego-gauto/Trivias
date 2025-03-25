import { useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import { createProduct } from './Queries';

interface ICreateProductModalProps {
  newProduct: IProduct
  modifyNewProduct: (newProduct: IProduct) => void
  onCreate: (success: boolean) => void
  onClose: () => void
}

export const CreateProductModal = ({
  onCreate,
  onClose,
  newProduct,
  modifyNewProduct
}: ICreateProductModalProps) => {

  const [userUseRegisterButton, setUserUseRegisterButton] = useState(false);
  const [haveSuccessAtCreate, setHaveSuccessAtCreate] = useState(false);
  const [productsRequestIsFinish, setProductsRequestIsFinish] = useState(false);

  const { name, default_price } = newProduct;

  const isValidRequestValues = () => {
    return (name.length > 0 && name.length < 60) && default_price > 0;
  };

  return <div className={s['main-container']}>
    <div className={`${s['views']} ${productsRequestIsFinish ? s['transition-active'] : ''}`}>
      <div className={s['container']}>
        <div className={s['header']}>
          <h2 className={s['title']}>Crear producto</h2>
          <h3 className={s['subtitle']}>Ingrese los datos del producto</h3>
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
                modifyNewProduct({
                  ...newProduct,
                  name: value
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
                modifyNewProduct({
                  ...newProduct,
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
              if (!isValidRequestValues()) {
                return;
              }
              if (userUseRegisterButton) {
                return;
              }
              const canCreateInvoice = await createProduct(newProduct);
              setHaveSuccessAtCreate(canCreateInvoice);
              setProductsRequestIsFinish(true);
            }}
          >
            Registrar
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
                '¡Se ha registrado el producto con exito!'
                : '¡No se ha logrado crear el producto!'
            }
          </h3>
          <h4 className={s['result-petition-subtitle']}>
            {
              haveSuccessAtCreate ?
                'Ahora existe un producto más para los distribuidores'
                : 'Intente de nuevo esta acción'
            }
          </h4>
          <div className={s['result-petition-buttons']}>
            <button
              className={s['result-petition-button']}
              onClick={(e) => {
                onCreate(haveSuccessAtCreate);
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