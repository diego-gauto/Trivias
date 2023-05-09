import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../store/actions/UserActions";
import { MainContainer } from "./Certificate.styled";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode'
import { getUserCertificateApi } from "../../components/api/lessons";


const Certificate = () => {
  const router = useRouter()
  const { name, lastName, title, professor, id, color, courseId, teacherSignature }: any = router.query;
  const [folio, setFolio] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [profSignature, setProfSignature] = useState<any>()
  const aritaSignature = "/images/signatures/AritaGonvar.png";
  console.log(image);
  const getUserCertificate = () => {
    let ids = {
      userId: id,
      courseId: courseId
    }
    getUserCertificateApi(ids).then((res) => {
      let tempCertificate = res.data.data[0];
      setFolio(tempCertificate.id);
      const months = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
      ];
      let tempDate = new Date(tempCertificate.created_at).getTime();
      const dateTime = new Date(tempDate);
      const day = dateTime.getDate() + 1;
      const month = months[dateTime.getMonth()];
      const year = dateTime.getFullYear();

      setDate(`${day} de ${month} de ${year}`);
    })
  }
  const downloadCertficate = () => {
    window.scroll(0, 0);
    let DATA: any = document.getElementById('certificate');
    DATA.classList.add('print');
    html2canvas(DATA).then((canvas) => {
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      //Get the original size of canvas/image
      var img_w = canvas.width;
      var img_h = canvas.height;
      //Convert to mm
      var doc_w = pxTomm(img_w);
      var doc_h = pxTomm(img_h);
      //Set doc size
      var doc = new jsPDF('l', 'mm', [doc_w, doc_h]);

      //set image height similar to doc size
      doc.addImage(imgData, 'PNG', 0, 0, doc_w, doc_h);
      DATA.classList.remove('print');
      doc.save('Certificado-Gonvar.pdf');
    });
  }
  const pxTomm = (px: any) => {
    let my_mm = document.getElementById('my_mm');
    return Math.floor(px / 2);
  }
  function imageUrlToBase64() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL();
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = teacherSignature;
    });
  }
  useEffect(() => {
    getUserCertificate();
    imageUrlToBase64().then((base64) => {
      setProfSignature(base64)
    })
    QRCode.toDataURL(window.location.href)
      .then(url => {
        setImage(url);
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <MainContainer color={color}>
      <div id="my_mm">
        <div className="certificate" id="certificate">
          <p className="title">{name} {lastName}</p>
          <p className="course-title">{title}</p>
          <p className="professor">{professor}</p>
          <p className="date">{date}</p>
          <p className="folio">{folio}</p>
          <p className="professor-name" id="name" style={{ left: document.getElementById("name")?.clientWidth! > 168 ? "26%" : "32%" }}>{professor}</p>
          <img id="img" src={profSignature} style={{ height: "80px", width: "80px", position: "absolute", top: "470px", left: "50px" }} alt="" />
          <img src={aritaSignature} className="main-signature" />
          <img src={teacherSignature} className="professor-signature" />
        </div>
      </div>
      <button onClick={downloadCertficate}>Descargar</button>
    </MainContainer>
  )
}
export default Certificate;