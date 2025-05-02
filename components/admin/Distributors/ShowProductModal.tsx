import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';

interface IShowProductModalProps {
  product: IProduct
  onClose: () => void
}

export const ShowProductModal = ({
  onClose,
  product,
}: IShowProductModalProps) => {

  const { name, default_price } = product;

  return <div className={s['main-container']}>
    <div
      className={s['container']}
      style={{ width: '100%' }}
    >
      <div className={s['header']}>
        <h2 className={s['title']}>Visualizar producto</h2>
        <h3 className={s['subtitle']}>Confirme que los datos sean correctos</h3>
      </div>
      <div className={s['body']}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="(El producto no tiene nombre)"
            value={name}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            placeholder="(Sin especificar)"
            value={`${default_price}`}
            disabled
          />
        </div>
      </div>
      <button
        className={s['button']}
        onClick={(e) => {
          onClose();
        }}
      >
        Cerrar
      </button>
    </div>
  </div>
}