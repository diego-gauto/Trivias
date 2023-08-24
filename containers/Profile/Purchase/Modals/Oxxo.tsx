import React, { useEffect, useState } from 'react'
import { ModalContainer, OxxoContainer } from './Modals.styled';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OxxoModal = ({ show, setShow, user, product, barcode, reference, expires_at }: any) => {
  const [ref, setRef] = useState("");

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
  }

  const downloadReference = () => {
    let DATA: any = document.getElementById('oxxo');
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
      pdf.addImage(barcode, 'JPEG', 10, 40, 100, 100);
      //set image height similar to doc size
      doc.addImage(imgData, 'PNG', 0, 0, doc_w, doc_h);
      DATA.classList.remove('print');
      doc.save('oxxo.pdf');
    });
  }

  const pxTomm = (px: any) => {
    return Math.floor(px / 2);
  }

  // function toDataUrl(tempReference: any) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = () => {
  //     const reader: any = new FileReader();
  //     reader.readAsDataURL(xhr.response);
  //     reader.onload = () => {
  //       const base64String = reader.result;
  //       setRef(base64String);
  //     };
  //   };
  //   xhr.open('GET', tempReference);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }

  // useEffect(() => {
  //   toDataUrl(barcode)
  // }, [])


  return (
    <ModalContainer show={show} onHide={() => { setShow(false) }} centered>
      <OxxoContainer id="oxxo">
        <h3>Hola {user.name}</h3>
        <p>Gonvar Nails te ha enviado una referencia
          para pago seguro en efectivo con <span>Conekta</span> en <span>tiendas OXXO</span>
        </p>
        <p className='p10'>Los pagos en oxxo tardan en reflejarse hasta 48 hrs. <br />
          Ingresa a la plataforma después de este tiempo para tener validado tu pago</p>
        <p className='p10'>*La referencia le llegara a su correo electronico.</p>
        <p className='p12-bold'>Referencia: {reference}</p>
        <img src={barcode} />
        <p className='p12'>Monto a pagar:</p>
        <p className='p18'>${product.price} MXN</p>
        <p className='p12-bold'>+$14.00 MXN por comisión de OXXO</p>
        <p className='p12'>Paga antes del {transformDate(expires_at)}.</p>
        <img style={{ width: "50px" }} src="/images/purchase/oxxo.png" alt="" />
        <button onClick={downloadReference}>Descargar</button>
      </OxxoContainer>
    </ModalContainer>
  )
}
export default OxxoModal;