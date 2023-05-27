import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../store/actions/UserActions";
import { MainContainer } from "./Certificate.styled";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getUserCertificateApi } from "../../components/api/lessons";
import * as htmlToImage from 'html-to-image';
import QRCode from 'qrcode'
import { blob } from "stream/consumers";
import { FacebookShareButton } from "react-share";
import { BsFacebook } from "react-icons/bs";
import download from 'downloadjs';
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import { getCertificateApi } from "../../components/api/users";
import { LoaderImage, LoaderContain, BackgroundLoader } from "../../components/Loader.styled";

const Certificate = () => {
  const router = useRouter()
  const { certificate_id }: any = router.query;
  const [folio, setFolio] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<any>("");
  const [downloadType, setDownloadType] = useState("pdf");
  const [link, setLink] = useState('');
  const [show, setShow] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [certificate, setCertificate] = useState<any>({
    user_name: "",
    last_name: "",
    sign: "",
    certificate_color: "",
    name: "",
    title: "",
    course_id: 0,
    user_id: 0,
    id: 0,
    created_at: "",
  });
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
  const onHideModal = () => {
    setShow(false)
  }
  const getUserCertificate = (certificate_data: any) => {
    let ids = {
      userId: certificate_data.user_id,
      courseId: certificate_data.course_id
    }
    getUserCertificateApi(ids).then((res) => {
      let tempCertificate = res.data.data[0];
      setFolio(tempCertificate.id);
      const months = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
      ];
      let tempDate = new Date(tempCertificate.created_at).getTime() + 50400000;
      const dateTime = new Date(tempDate);
      const day = dateTime.getDate();
      const month = months[dateTime.getMonth()];
      const year = dateTime.getFullYear();
      setDate(`${day} de ${month} de ${year}`);
    })
  }
  const downloadCertificateImage = async (format: string) => {
    let DATA: any = document.getElementById('certificate');
    setTimeout(() => {
      DATA.style.marginBlockStart = 0;
      if (format === "jpeg") {
        htmlToImage.toJpeg(DATA).then(function (dataUrl) {
          download(dataUrl, 'Certificado-Gonvar.jpeg');
          DATA.style.marginBlockStart = "4rem";
        });
      }
      if (format === "png") {
        htmlToImage.toPng(DATA)
          .then(function (dataUrl) {
            download(dataUrl, 'Certificado-Gonvar.png');
            DATA.style.marginBlockStart = "4rem";
          });
      }
    }, 1000);

  }
  const downloadCertificate = () => {
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
  function toDataUrl(sign: any) {
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
    xhr.open('GET', sign);
    xhr.responseType = 'blob';
    xhr.send();
  }

  useEffect(() => {
    getCertificateApi(certificate_id).then((res: any) => {
      setCertificate(res);
      getUserCertificate(res);
      toDataUrl(res.sign)
      setLoader(true);
    })
    let opts: any = {
      errorCorrectionLevel: 'L',
      margin: 1,
      color: {
        light: "#ffffffff"
      }
    }
    QRCode.toDataURL(window.location.href, opts, function (err, url) {
      if (err) console.log(err)
      setImage(url)
    })
  }, [])

  if (!loader) {
    return (
      <BackgroundLoader>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader>
    )
  }
  return (
    <MainContainer color={certificate.certificate_color}>
      <div id="my_mm">
        <div className="certificate" id="certificate">
          <p className="title">{shortName(certificate.user_name)} {shortName(certificate.last_name)}</p>
          <p className="course-title">{certificate.title}</p>
          <p className="professor">{certificate.professor_name}</p>
          <p className="date">{date}</p>
          <p className="folio">{folio}</p>
          <p className="professor-name" id="name" style={{ left: document.getElementById("name")?.clientWidth! > 168 ? "26%" : "32%" }}>{certificate.professor_name}</p>
          <img id="img" src={image} style={{ height: "120px", width: "120px", position: "absolute", top: "455px", left: "38px" }} alt="" />
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
        <button onClick={() => setShow(true)}>Descargar</button>
        <ConfirmationModal
          show={show}
          onHide={onHideModal}
          pdfDownload={downloadCertificate}
          imageDownload={downloadCertificateImage}
        />
      </div>
    </MainContainer>
  )
}
export default Certificate;