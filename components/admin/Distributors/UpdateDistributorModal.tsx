import { useState } from 'react';
import s from './CreateInvoiceAccessModal.module.css';
import { updateDistributor, updateSeller } from './Queries';
import { statesOfMexicoArray } from '../../../components/Modals/ComeFromModal/Ladas';

interface IUpdateDistributorModalProps {
  distributor: IDistributor
  modifyDistributor: (distributor: IDistributor) => void
  onUpdate: (success: boolean) => void
  onClose: () => void
}

export const UpdateDistributorModal = ({
  onUpdate,
  onClose,
  distributor,
  modifyDistributor,
}: IUpdateDistributorModalProps) => {

  const [userUseUpdateButton, setUserUseUpdateButton] = useState(false);
  const [haveSuccessAtUpdate, setHaveSuccessAtUpdate] = useState(false);
  const [distributorRequestIsFinish, setDistributorRequestIsFinish] = useState(false);

  const { distributor_id, name, email, phone_number, postal_code, origin_state } = distributor;

  return <div className={s['main-container']}>
    <div className={`${s['views']} ${distributorRequestIsFinish ? s['transition-active'] : ''}`}>
      <div className={s['container']}>
        <div className={s['header']}>
          <h2 className={s['title']}>Actualizar distribuidor</h2>
          <h3 className={s['subtitle']}>Ingrese los nuevos datos</h3>
        </div>
        <div className={`${s['body']} ${s['body--scroll']}`}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="(Sin nombre)"
              value={name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo eléctronico</label>
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
              value={`${phone_number}`}
              onChange={(e) => {
                const { value } = e.target;
                modifyDistributor({
                  ...distributor,
                  phone_number: value
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="origin_state" className="form-label">Estado de origen</label>
            <select
              id="origin_state"
              className="form-control"
              onChange={(e) => {
                const { value } = e.target;
                modifyDistributor({
                  ...distributor,
                  origin_state: value
                });
              }}
              value={origin_state}
            >
              {
                statesOfMexicoArray.map((s, index) => {
                  if ((origin_state === '' || origin_state == null) && index === 0) {
                    modifyDistributor({
                      ...distributor,
                      origin_state: s
                    });
                  }
                  return <option value={s}>
                    {s}
                  </option>
                })
              }
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="postal_code" className="form-label">Código postal</label>
            <input
              type="text"
              className="form-control"
              id="postal_code"
              placeholder="Ingrese su código postal"
              value={`${postal_code}`}
              onChange={(e) => {
                const { value } = e.target;
                modifyDistributor({
                  ...distributor,
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
            className={`${s['button']} ${userUseUpdateButton === true
              ? s['button--purple-disable']
              : s['button--purple']}`
            }
            onClick={async (e) => {
              if (userUseUpdateButton) {
                return;
              }
              const canUpdateDistributor = await updateDistributor(distributor);
              setHaveSuccessAtUpdate(canUpdateDistributor);
              setDistributorRequestIsFinish(true);
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
                '¡Se ha actualizado el distribuidor con exito!'
                : '¡No se ha logrado actualizar el distribuidor!'
            }
          </h3>
          <h4 className={s['result-petition-subtitle']}>
            {
              haveSuccessAtUpdate ?
                'Ahora el distribuidor esta actualizado'
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