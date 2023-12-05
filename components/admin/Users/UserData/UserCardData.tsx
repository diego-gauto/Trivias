

import { useEffect, useState } from "react";
import Modal1 from "./Modal/Modal";
import ModalAddDays from "./Modal/ModalAddDays";
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

const UserCardData = (props: CardData) => {
  const { currentUser, setIsVisible, courses, openUserCardData, isVisible } = props;
  const [show, setShow] = useState(false);
  const [showAddDays, setShowAddDays] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState(currentUser);
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
              Suscripción Actual
              <Label>
                {
                  (user.level === 1 || user.final_date >= today) ? "Gonvar Plus" : "Sin suscripción"
                }
              </Label>
            </Info>
            <Info>
              Correo electrónico
              <Label style={{ overflowWrap: "break-word" }}>
                {user.email}
              </Label>
            </Info>
            <Info>
              Fecha de Creación
              <Label>
                {formatDate(user.created_at)}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                {user.phone_number ? user.phone_number : "N/A"}
              </Label>
            </Info>
          </UserInfo>
          <Courses>
            <TitleBox>
              Cursos Activos
            </TitleBox>
            {
              (user.level === 1 || user.final_date >= today) &&
              <img src={GonvarImg} className="img-gonvar" />
            }
            {
              user.user_courses.length > 0 ?
                <CourseContain>
                  {
                    user.user_courses.map((x: any, index: number) => {
                      return (
                        <div key={"paid-courses," + index} className="contain-course">
                          {
                            x.final_date > today &&
                            <>
                              <p className="date"> {secondsToDate(x.final_date)}</p>
                              <img
                                src={x.image}
                              />
                            </>
                          }
                        </div>
                      )
                    })
                  }
                </CourseContain> :
                <CourseContain>
                  Sin cursos...
                </CourseContain>
            }
            {/* <TransparentButton onClick={() => { setShow(true); }}>Agregar Curso</TransparentButton> */}
          </Courses>
          {/* <PayContain>
          <TitleBox>
            Métodos de pago asociados
          </TitleBox>
          {paymentMethod.length > 0 ? <LastContainer>
            {paymentMethod.map((x) => {
              return (
                <CardIconResp brand={x.brand} />
              )
            })}
          </LastContainer> :
            <LastContainer>
              Sin métodos de pago...
            </LastContainer>}
        </PayContain> */}
          <TransparentButton onClick={() => { setShowAddDays(true); }}>Editar días de suscripción</TransparentButton>
          {/* <TransparentButton onClick={() => { deleteUser() }}>Eliminar usuario</TransparentButton> */}
        </>
        <Modal1 show={show} setShow={setShow} user={user} courses={courses} handleCourse={handleCourse} openUserCardData={openUserCardData} />
        <ModalAddDays show={showAddDays} setShow={setShowAddDays} user={user} />
        <ErrorModal show={error} setShow={setError} error={"Lo sentimos, esta acción solo se puede realizar manualmente desde Firebase, gracias!"}></ErrorModal>
      </UserContain>

    </Modal>
  )
}
export default UserCardData;