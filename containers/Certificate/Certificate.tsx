import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../store/actions/UserActions";
import { MainContainer } from "./Certificate.styled";
import QRCode from "react-qr-code";

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

  useEffect(() => {
    getUserCertificate();
  }, [])

  return (
    <MainContainer id="my_mm" color={color}>
      <div className="certificate" id="certificate">
        <p className="title">{name}</p>
        <p className="course-title">{title}</p>
        <p className="professor">{professor}</p>
        <p className="date">{date}</p>
        <p className="folio">{folio}</p>
        <p className="professor-name">{professor}</p>
        <QRCode
          size={256}
          style={{ height: "80", width: "80px", position: "absolute", top: "470px", left: "50px" }}
          value={window.location.href}
          viewBox={`0 0 256 256`}
        />
      </div>
    </MainContainer>
  )
}
export default Certificate;