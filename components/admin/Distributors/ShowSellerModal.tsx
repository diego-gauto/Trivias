import s from './CreateInvoiceAccessModal.module.css';

interface IShowSellerModalContentProps {
  seller: ISeller
  onClose: () => void
}

export const ShowSellerModalContent = ({
  onClose,
  seller,
}: IShowSellerModalContentProps) => {

  const { seller_id, name, last_name, email, phone_number, photo_url, postal_code } = seller;

  return <div className={s['main-container']}>
    <div
      className={s['container']}
      style={{ width: '100%' }}>
      <div className={s['header']}>
        <h2 className={s['title']}>Datos del vendedor</h2>
        <h3 className={s['subtitle']}>Aquí los detalles del vendedor</h3>
      </div>
      <div className={`${s['body']} ${s['body--scroll']}`}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="(No cuenta con un nombre)"
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
            placeholder="(No cuenta con apellidos)"
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
            placeholder="(No cuenta con correo eléctronico)"
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
            placeholder="(No cuenta con número de celular)"
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
            placeholder="(No cuenta con imagen de perfil)"
            value={photo_url}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postal_code" className="form-label">Código postal</label>
          <input
            type="text"
            className="form-control"
            id="postal_code"
            placeholder="(No cuenta con código postal)"
            value={postal_code}
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