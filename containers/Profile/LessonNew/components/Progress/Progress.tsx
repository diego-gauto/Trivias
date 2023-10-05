import React, { useEffect, useState } from "react";
import { returnLevel } from "../../utils/functions";
import { CertificateContainer, CertificateOn, MainContainer } from "./Progress.styled";
import { IUser } from "../../../../../interfaces/IUserData";
import { useMediaQuery } from "react-responsive";
import { addUserCertificateApi, getUserCertificateApi } from "../../../../../components/api/lessons";
import { createNotification } from "../../../../../components/api/notifications";
import { updateMembership } from "../../../../../components/api/users";
import router, { useRouter } from "next/router";
import { CERTIFICATES_PATH } from "../../../../../constants/paths";

interface IProgress {
  course: any,
  user: IUser
}

const Progress = (props: IProgress) => {
  const { course, user } = props;
  const [count, setCount] = useState(0);
  const responsive1124 = useMediaQuery({ query: "(max-width: 1124px)" });
  const [certficate, setCertificate] = useState<any>(false);
  const [certificate_id, setCertificate_id] = useState<any>("");
  const params = useRouter();
  const { id, season, lesson }: any = params.query;

  useEffect(() => {
    let viewed = 0;
    course.seasons.forEach((s: any) => {
      s.lessons.forEach((l: any) => {
        let array = l.progress.filter((x: any) => x.user_id === user.id && x.status === 1)
        if (l.users.includes(user?.id) && l.homework === 0 && l.quiz === 0) {
          viewed++;
        }
        if (l.users.includes(user?.id) && (l.homework === 1 || l.quiz === 1) && array.length > 0) {
          viewed++;
        }
      });
    });

    if (course.lessons.length == viewed) {
      let ids = {
        userId: user.id,
        courseId: course.id
      }
      let tempCertificate = {
        ...ids,
        folio: `${ids.courseId}-${ids.userId}`
      }
      getUserCertificateApi(ids).then((res) => {
        if (res.data.data.length === 0) {
          let notification = {
            userId: user.id,
            type: "11",
            notificationId: '',
            courseId: course.id,
            season: +season,
            lesson: +lesson,
            title: course.title,
          }
          createNotification(notification);
          addUserCertificateApi(tempCertificate);
        } else {
          setCertificate_id(res.data.data[0].id)
        }
      })
      if (user.level === 2) {
        let course = user.user_courses.filter((x: any) => x.course_id === 30);
        let today = new Date().getTime() / 1000;
        if (today > course[0].final_date) {
          var day = new Date();
          var nextYear = new Date();
          nextYear.setFullYear(day.getFullYear() + 1);
          let data = {
            final_date: nextYear.getTime() / 1000,
            start_date: today,
            user_id: user.id
          }
          updateMembership(data).then((res) => {
            alert("Por favor refresque la pagina, su plan anual se acaba de activar!");
          })
        }
      }
      setCertificate(true)
    }

    setCount(viewed);

  }, [course])

  const goToCertificate = () => {
    let ids = {
      userId: user.id,
      courseId: course.id
    }
    if (certificate_id !== "") {
      router.push({
        pathname: CERTIFICATES_PATH,
        query: {
          certificate_id: certificate_id
        }
      });
    }
    else {
      getUserCertificateApi(ids).then((res) => {
        router.push({
          pathname: CERTIFICATES_PATH,
          query: {
            certificate_id: res.data.data[0].id
          }
        });
      })
    }
  }

  return (
    <MainContainer>
      {(course.with_certificate === 1 && certficate && !responsive1124) && <CertificateOn onClick={() => { goToCertificate() }}>
        <p>Obtener certificado</p>
      </CertificateOn>}
      <div className="content">
        <p className='title'>Tu progreso <br />
          <b>{count} de {course.lessons.length}</b> <span>lecciones.</span>
        </p>
        <CertificateContainer>
          <div className='half'></div>
          <div className='certificate-label'>
            <p>Acaba el curso <br />
              para obtener <br />
              tu certificado.</p>
          </div>
        </CertificateContainer>
      </div>
    </MainContainer>
  )
}
export default Progress;