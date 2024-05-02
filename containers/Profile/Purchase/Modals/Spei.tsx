import React, { useEffect, useState } from 'react';
import { ModalContainer, OxxoContainer, SpeiContainer } from './Modals.styled';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SpeiModal = ({ show, setShow, user, product, bank_ref }: any) => {
  const [ref, setRef] = useState('');

  const transformDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000);

    // Format the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Create the formatted string
    const formattedDate = `${year}-${month}-${day} - ${hours}:${minutes} hrs`;
    return formattedDate;
  };

  const downloadReference = () => {
    let DATA: any = document.getElementById('spei');
    DATA.classList.add('print');
    html2canvas(DATA).then((canvas) => {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      //Get the original size of canvas/image
      const pdf = new jsPDF();
      var img_w = canvas.width;
      var img_h = canvas.height;
      //Convert to mm
      var doc_w = pxTomm(img_w);
      var doc_h = pxTomm(img_h);
      //Set doc size
      var doc = new jsPDF('p', 'px', [doc_w, doc_h]);
      //set image height similar to doc size
      doc.addImage(imgData, 'PNG', 0, 0, doc_w, doc_h);
      DATA.classList.remove('print');
      doc.save('spei.pdf');
    });
  };

  const pxTomm = (px: any) => {
    return Math.floor(px / 2);
  };

  return (
    <ModalContainer
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
    >
      <SpeiContainer id='spei'>
        <div className='top'>
          <img src='/images/purchase/spei.png' alt='' />
          <div>
            <p>Monto a pagar</p>
            <p className='p30'>${product.price} MXN</p>
          </div>
        </div>
        <p className='p18-bold' style={{ paddingLeft: '20px' }}>
          Clabe:
        </p>
        <div className='box'>
          <p className='p18'>{bank_ref}</p>
        </div>
        <p className='p16-bold'>Instrucciones</p>
        <ol>
          <li>
            Ingresa al servicio de banca por internet o al servicio de banca
            móvil de tu banco.
          </li>
          <li>Identifica la opción de transferencia.</li>
          <li>
            Realiza la transferencia a la CLABE indicada, por el monto exacto
            marcado arriba o la transferencia será rechazada.
          </li>
          <li>
            Confirma tu pago en tu banca online, se producirá un comprobante de
            pago digital. Revisa que haya sido enviado de manera correcta
          </li>
        </ol>
        <div className='box-green'>
          <p>
            Al realizar correctamente todos los pasos recibirás una confirmación
            por email de Gonvar+
          </p>
        </div>
        <button onClick={downloadReference}>Descargar</button>
      </SpeiContainer>
    </ModalContainer>
  );
};
export default SpeiModal;
