import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../store/actions/UserActions";
import { MainContainer } from "./Certificate.styled";
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdDelete } from 'react-icons/md';
const Certificate = () => {
  const router = useRouter()
  const { name, title, professor, id, color, courseId }: any = router.query;
  const [folio, setFolio] = useState("");
  const [date, setDate] = useState("");

  const getUserCertificate = () => {
    getUser(id).then((res) => {
      let tempCertificate = res[0].certificates.find((x: any) => x.courseId == courseId)
      setFolio(tempCertificate.folio);
      const months = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
      ];
      const dateTime = new Date(tempCertificate.createdAt.seconds * 1000);
      const day = dateTime.getDate();
      const month = months[dateTime.getMonth()];
      const year = dateTime.getFullYear();

      setDate(`${day} de ${month} de ${year}`);
    })
  }

  const downloadCertficate = () => {
    window.scroll(0, 0);
    let DATA: any = document.getElementById('certificate');

    let svgElement: any = document.getElementById('qr');
    var svgData = new XMLSerializer().serializeToString(svgElement);
    let img = document.createElement("img")
    // img.src = 'data:image/svg+xml,' + encodeURIComponent(svgData);
    // console.log(encodeURIComponent(svgData));
    const canvas: any = document.createElement('canvas');

    canvas.width = svgElement.clientWidth;
    canvas.height = svgElement.clientHeight;
    canvas.getContext('2d').drawImage(img, 0, 0, svgElement.clientWidth, svgElement.clientHeight);
    console.log(canvas.toDataURL('image/jpeg', 1.0));
    DATA.classList.add('print');
    img.src = canvas.toDataURL('image/jpeg', 1.0)
    DATA.appendChild(img)
    html2canvas(DATA).then((canvas) => {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      // //Get the original size of canvas/image
      // var img_w = canvas.width;
      // var img_h = canvas.height;

      // //Convert to mm
      // var doc_w = pxTomm(img_w);
      // var doc_h = pxTomm(img_h);
      // //Set doc size
      // var doc = new jsPDF('l', 'mm', [doc_w, doc_h]);

      // //set image height similar to doc size
      // doc.addImage(imgData, 'JPG', 0, 0, doc_w, doc_h);
      // DATA.classList.remove('print');
      // doc.save('Certificado-Gonvar.pdf');
    });
  }
  const pxTomm = (px: any) => {
    let my_mm = document.getElementById('my_mm');
    return Math.floor(px / 2);
  }

  useEffect(() => {
    getUserCertificate();
  }, [])

  return (
    <MainContainer color={color}>
      <div id="my_mm">
        <div className="certificate" id="certificate">
          <p className="title">{name}</p>
          <p className="course-title">{title}</p>
          <p className="professor">{professor}</p>
          <p className="date">{date}</p>
          <p className="folio">{folio}</p>
          <p className="professor-name">{professor}</p>
          <QRCode
            id="qr"
            size={256}
            style={{ height: "80px", width: "80px", position: "absolute", top: "50px" }}
            value={window.location.href}
            viewBox={`0 0 256 256`}
          />
          {/* <img id="img" src="/images/teachers/Brenda_instructora.jpg" style={{ height: "80px", width: "80px", position: "absolute", top: "470px", left: "5px0" }} alt="" /> */}
        </div>
      </div>
      <button onClick={downloadCertficate}>Descargar</button>
    </MainContainer>
  )
}
export default Certificate;