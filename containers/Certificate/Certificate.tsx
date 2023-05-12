import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../store/actions/UserActions";
import { MainContainer } from "./Certificate.styled";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode'
import { getUserCertificateApi } from "../../components/api/lessons";
import { blob } from "stream/consumers";
import { FacebookShareButton } from "react-share";
import { BsFacebook } from "react-icons/bs";

const Certificate = () => {
  const router = useRouter()
  const { name, lastName, title, professor, id, color, courseId, teacherSignature }: any = router.query;
  const [folio, setFolio] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState('');
  const [profSignature, setProfSignature] = useState<any>()
  let shareCertificate = document.getElementById('my_mm');
  const aritaSignature = "/images/signatures/AritaGonvar.png";
  function shortName(name: string) {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0]
    }
    return name;
  }
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
  function toDataUrl() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const reader: any = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.onload = () => {
        const base64String = reader.result;
        setProfSignature(base64String);
      };
    };
    xhr.open('GET', teacherSignature);
    xhr.responseType = 'blob';
    xhr.send();
  }

  useEffect(() => {
    getUserCertificate();
    toDataUrl()
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
          <p className="title">{shortName(name)} {shortName(lastName)}</p>
          <p className="course-title">{title}</p>
          <p className="professor">{professor}</p>
          <p className="date">{date}</p>
          <p className="folio">{folio}</p>
          <p className="professor-name" id="name" style={{ left: document.getElementById("name")?.clientWidth! > 168 ? "26%" : "32%" }}>{professor}</p>
          <img id="img" src={image} style={{ height: "80px", width: "80px", position: "absolute", top: "470px", left: "50px" }} alt="" />
          <img src={aritaSignature} className="main-signature" />
          <img src={profSignature} className="professor-signature" />
        </div>
      </div>
      <div className="button-contain">
        {/* <FacebookShareButton
          url={'gonvar.io/' + router.query}
          quote={"Mira mi certificado!"}
          openShareDialogOnClick={true}
        >
          <BsFacebook className="icon" />
        </FacebookShareButton> */}
        <button onClick={downloadCertficate}>Descargar</button>
      </div>
    </MainContainer>
  )
}
export default Certificate;