import { useEffect, useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';

interface ProductModalContentProps {
  product: IProduct
  onClose: () => void
}

export const ProductModalContent = ({
  onClose,
  product,
}: ProductModalContentProps) => {

  const { name, image, default_price } = product;

  return <div className={s['main-container']}>
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
            disabled
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
            disabled
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
            disabled
          />
        </div>
      </div>
      <div className={s['buttons']}>
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
  </div>
}