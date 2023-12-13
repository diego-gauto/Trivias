

import { useEffect, useState } from "react";
import Modal1 from "./Modal/Modal";
import ModalAddDays from "./Modal/ModalAddDays";
import ModalRemoveSubscription from './Modal/ModalRemoveSubscription';
import ModalAddSubscriptionPlan from './Modal/ModalAddSubscriptionPlan';
import {
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  CourseContain,
  FirstBox,
  Info,
  Label,
  ProfileContain,
  Title,
  TitleBox,
  TitleContain,
  TransparentButton,
  UserContain,
  UserInfo,
} from "./UsersCardData.styled";
import ErrorModal from "../../../Error/ErrorModal";
import { AdminLoader } from "../../SideBar.styled";
import { Modal } from "react-bootstrap";
import { getLessonFromUserApi } from "../../../api/admin";
import { user } from "firebase-functions/v1/auth";

interface CardData {
  currentUser: any;
  isVisible: any;
  setIsVisible: (open: boolean) => void;
  courses: Array<any>;
  openUserCardData: any;
};

export interface IUserWithMembership {
  id: number
  level: number
  name: string
  country: string
  come_from: string
  last_name: string
  last_sign_in: string
  photo: string
  final_date: number
  start_date: number
  email: string
  score: number
  created_at: string
  phone_number: string
  plan_name: string
  spent: number
  method: string
  user_courses: any[]
}

const UserCardData = (props: CardData) => {
  const { currentUser, setIsVisible, courses, openUserCardData, isVisible } = props;
  const [show, setShow] = useState(false);
  const [showAddDays, setShowAddDays] = useState(false);
  const [showAddSubscriptionPlan, setShowAddSubscriptionPlan] = useState(false);
  const [showRemoveSuscription, setShowRemoveSuscription] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState<IUserWithMembership>(currentUser);
  const GonvarImg = "/images/purchase/logo.png";
  let today = new Date().getTime() / 1000;
  const handleCourse = () => {
    // getUserCourses();
  }
  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime() + 50400000;
    return new Date(tempDate).toLocaleDateString("es-MX")
  }
  const secondsToDate = (value: any) => {
    let tempDate = new Date(value * 1000)
    return new Date(tempDate).toLocaleDateString("es-MX")
  }
  const deleteUser = () => {
    setError(true);
  }
  const getData = async () => {
    setLoader(false);
    const lessonUser = await getLessonFromUserApi(currentUser.id);
    lessonUser.data.data.map((userCourse: any) => {
      courses.forEach((course: any) => {
        if (userCourse.course_id === course.id) {
          userCourse.courseTitle = course.title;
          userCourse.image = course.image;
        }
      });
    })
    user.user_courses = lessonUser.data.data;
    console.log(user);
    setUser(user);
    setLoader(true);
  }
  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, [currentUser])

  if (!loader) {
    return (
      <AdminLoader style={{ position: "absolute" }}>
        <div className="loader-image">
          <div className="loader-contain" />
        </div>
      </AdminLoader>
    )
  }

  const haveASubscription = (level: number, method: string) => {
    return [1, 4, 5, 6, 7, 8].includes(level) || 'admin' === method;
  }

  const getMembershipTextByLevel = (level: number) => {
    let text = '';
    if (level === 1 || level === 6) {
      text = 'Mensual';
    } else if (level === 7 || level === 8) {
      text = 'Cuatrimestral';
    } else if (level === 4 || level === 5) {
      text = 'Anual';
    }

    if (text.length !== 0) {
      return text;
    }

    return `Caso especial, nivel ${level}`;
  }

  const convertToFormalDate = (miliseconds: number) => {
    const date = new Date(miliseconds * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthsOfYear = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return `${day} de ${monthsOfYear[month]} de ${year}`;
  }

  console.log(user);

  const getSubscriptionJSXElementByUserValues = (): JSX.Element[] => {
    if (!(haveASubscription(user.level, user.method) || user.final_date >= today)) {
      return (
        []
      );
    }

    return (
      [<Info>
        Inicio de suscripción:
        <Label>
          {convertToFormalDate(user.start_date)}
        </Label>
      </Info>,
      <Info>
        Final de suscripción:
        <Label>
          {convertToFormalDate(user.final_date)}
        </Label>
      </Info>]
    );
  }

  return (
    <Modal show={isVisible} onHide={() => setIsVisible(false)} size="lg">
      <UserContain>
        <TitleContain>
          <FirstBox>
            <Title>Usuario Activo</Title>
          </FirstBox>
          <CloseIcon onClick={() => setIsVisible(false)} />
        </TitleContain>
        <>
          <ProfileContain>
            <img src={user.photo ? user.photo : "/images/admin/ProfileIcon.png"} />
          </ProfileContain>
          <UserInfo>
            <Info>
              Usuario
              <Label>
                {user.name}
              </Label>
            </Info>
            <Info>
              Puntos
              <Label>
                {user.score}
              </Label>
            </Info>
            <Info>
              Correo electrónico
              <Label style={{ overflowWrap: "break-word" }}>
                {user.email}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                {user.phone_number ? user.phone_number : "N/A"}
              </Label>
            </Info>
            <Info>
              Fecha de Creación
              <Label>
                {formatDate(user.created_at)}
              </Label>
            </Info>
            <Info>
              Suscripción Actual
              <Label>
                {
                  (haveASubscription(user.level, user.method) || user.final_date >= today) ? getMembershipTextByLevel(user.level) : "Sin suscripción"
                }
              </Label>
            </Info>
            {
              getSubscriptionJSXElementByUserValues()
            }
            {
              (haveASubscription(user.level, user.method) || user.final_date >= today) &&
              <img src={GonvarImg} className="img-gonvar" />
            }
          </UserInfo>
          {/* Para agrupar los botones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <TransparentButton style={{ width: '100%', maxWidth: '350px' }} onClick={() => { setShowAddDays(true); }}>Editar días de suscripción</TransparentButton>
            {
              !((haveASubscription(user.level, user.method) || user.final_date >= today)) &&
              <TransparentButton style={{ width: '100%', maxWidth: '350px' }} onClick={() => { setShowAddSubscriptionPlan(true); }}>Activar plan de suscripción</TransparentButton>
            }
            {
              (haveASubscription(user.level, user.method) || user.final_date >= today) &&
              <TransparentButton style={{ width: '100%', maxWidth: '350px' }} onClick={() => { setShowRemoveSuscription(true); }}>Eliminar suscripción</TransparentButton>
            }
          </div>
        </>
        <Modal1 show={show} setShow={setShow} user={user} courses={courses} handleCourse={handleCourse} openUserCardData={openUserCardData} />
        <ModalAddDays show={showAddDays} setShow={setShowAddDays} user={user} />
        <ModalAddSubscriptionPlan show={showAddSubscriptionPlan} setShow={setShowAddSubscriptionPlan} user={user} />
        <ModalRemoveSubscription show={showRemoveSuscription} setShow={setShowRemoveSuscription} user={user} />
        <ErrorModal show={error} setShow={setError} error={"Lo sentimos, esta acción solo se puede realizar manualmente desde Firebase, gracias!"}></ErrorModal>
      </UserContain>

    </Modal>
  )
}
export default UserCardData;