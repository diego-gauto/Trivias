import React from 'react'
import { HelpContainer } from './Help.styled';
import { FaArrowRight } from 'react-icons/fa';
import { SUPPORT_PATH } from '../../../../../../constants/paths';

const Help = () => {
  return (
    <HelpContainer>
      <p>
        Dirígete al Centro de Ayuda para obtener apoyo. Si quieres obtener ayuda de forma más rápida, selecciona “Comentarios” y escribe tu pregunta.
      </p>
      <a href={SUPPORT_PATH} target="_blank">
        <button >Ir al <span>Centro de Recompensas </span><FaArrowRight /> </button>
      </a>
    </HelpContainer>
  )
}
export default Help;