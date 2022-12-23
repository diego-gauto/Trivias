import React, { useState } from 'react'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import { HistoryContainer } from './User.styled'

export const History = () => {
  const [option, setOption] = useState(1);
  const allOptions = [
    1, 2, 3, 4, 5
  ]
  const handleLeft = () => {
    if (option == 1) {
      setOption(allOptions.length)
    }
    else {
      setOption(option - 1);
    }
  }
  const handleRight = () => {
    if (option == allOptions.length) {
      setOption(1)
    }
    else {
      setOption(option + 1);
    }

  }

  return (
    <HistoryContainer>
      <div className='title'>
        Historial de pedidos
      </div>
      <div className='history-content'>
        <RiArrowLeftSLine style={{ fontSize: 60, cursor: "pointer" }} onClick={handleLeft} />
        <div className='history-data'>
          <div className='history-info'>
            <p>No. Pedido</p>
            <p className='second-info' style={{ color: "#942ced", fontWeight: "600" }}>142698</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Producto</p>
            <p className='second-info'>Suscripción<br />
              mensual a<br />
              Gonvar+</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Compra</p>
            <p className='second-info'>11/06/22</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Expiración</p>
            <p className='second-info'>11/07/22</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Estatus</p>
            <p className='second-info'>Activo</p>
          </div>
        </div>
        <RiArrowRightSLine style={{ fontSize: 60, cursor: "pointer" }} onClick={handleRight} />
      </div>
      <div className='dots'>
        {
          allOptions.map((val) => {
            return (
              <div
                key={"optionsHistory " + val}
                className='option-dot'
                style={option == val ? { backgroundColor: "#ff6700" } : { backgroundColor: "#3f1168" }}
                onClick={() => { setOption(val); }}
              />
            )
          })
        }
      </div>
    </HistoryContainer>
  )
}
