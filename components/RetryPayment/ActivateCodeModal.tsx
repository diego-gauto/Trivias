import s from './ActivateCodeModal.module.css';
import { FaCheck } from "react-icons/fa";

type ActivateCodeModal = {
  codeRequestResult: CodeStatus,
  suscriptionType: 'M' | 'A' | 'C',
  onClose: () => void,
}

export const ActivateCodeModal = ({
  codeRequestResult,
  suscriptionType,
  onClose,
}: ActivateCodeModal) => {

  const suscriptionTypeText = suscriptionType === 'M'
    ? 'mensual' : suscriptionType === 'C'
      ? 'cuatrimestral' : 'anual';

  return <div className={s['result-petition-section']}>
    <div className={s['result-petition-container']}>
      <div className={`${s['result-petition-icon']} ${s[`result-petition-icon--${codeRequestResult === 'available' ? 'approve' : 'not-approve'}`]}`}>
        {
          codeRequestResult === 'available' ? <FaCheck color='#fff' /> : '!'
        }
      </div>
      <h3 className={s['result-petition-title']}>
        {
          codeRequestResult === 'available' ?
            '¡Tu suscripción ha sido activada con exito!'
            : 'Error'
        }
      </h3>
      <h4 className={s['result-petition-subtitle']}>
        {
          codeRequestResult === 'available' ?
            'Ahora cuenta con una suscripción ' + suscriptionTypeText
            : 'Código inexistente'
        }
        {
          codeRequestResult !== 'available' &&
          <p style={{
            fontSize: '16px',
            paddingTop: '8px'
          }}>Por favor, revisa tu codigo y vuelve a intentarlo</p>
        }
      </h4>
      <div className={s['result-petition-buttons']}>
        <button
          className={s['result-petition-button']}
          onClick={(e) => {
            onClose();
          }}
        >
          {
            codeRequestResult === 'available' ? 'Ir a los cursos' : 'Volver'
          }
        </button>
      </div>
    </div>
  </div>
}