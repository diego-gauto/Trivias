import React, { useEffect, useState } from 'react';
import { UpdateFinalDateModal as Container } from './Modals.styled';


interface UpdateFinalDateModalProps {
  finalDate: number,
  userId: number,
  onCancelEvent: () => void,
  onSuccessEvent: () => void,
}

export const UpdateFinalDateModal = ({
  userId,
  finalDate,
  onCancelEvent,
  onSuccessEvent,
}: UpdateFinalDateModalProps) => {

  const [newFinalDate, setNewFinalDate] = useState<number>(finalDate);

  const [isFinalDateChanged, setIsChanged] = useState(false);

  const formatDate = (date: number) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  const convertToPrettyDateFormat = (value: number) => {
    const d = new Date(value);

    const SPANISH_MONTHS = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'];

    const day = d.getDate();
    const monthIndex = d.getMonth() + 1;
    const year = d.getFullYear();

    const result = `${day} de ${SPANISH_MONTHS[monthIndex]} de ${year}`;
    return result;
  }

  return (
    <Container>
      <p className='update-fd-modal__paragraph'>La fecha cuando termina la suscripción del usuario originalmente es el:{' '}
        <strong>{
          convertToPrettyDateFormat(finalDate * 1000)
        }</strong>
      </p>
      <p className='update-fd-modal__paragraph'>Si desea cambiar esta fecha, seleccione una nueva</p>
      <input className='update-fd-modal__input-date'
        type="date"
        value={formatDate(newFinalDate * 1000)}
        onChange={(e) => {
          const values = e.target.value.split('-').map(v => parseInt(v));
          const year = values[0] as number;
          const month = values[1] as number;
          const day = values[2] as number;
          const millis = new Date(year, month - 1, day);
          setNewFinalDate(millis.getTime() / 1000);
          setIsChanged(true);
        }}
      />
      {
        isFinalDateChanged &&
        <>
          <p className='update-fd-modal__paragraph'>
            La fecha de termino de suscripción para el usuario ahora sería:{' '}
            <strong>
              {
                convertToPrettyDateFormat(newFinalDate * 1000)
              }
            </strong>
          </p>
          <button
            className='gonvar-button gonvar-button--purple'
            type="button"
            onClick={() => {
              // setShowChangeFinalDateModal(false);
              // setShowSuccesssModal(true);
              //setA(1)
              onSuccessEvent();
            }}
          >
            Aceptar
          </button>
        </>
      }

      {
        <button
          className='gonvar-button gonvar-button--ghost'
          type="button"
          onClick={() => {
            onCancelEvent();
          }}
        >
          Cancelar
        </button>

      }
    </Container>
  );
}




