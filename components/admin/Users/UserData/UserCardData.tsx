

import { useEffect, useState } from "react";
import Modal1 from "./Modal/Modal";
import ModalAddDays from "./Modal/ModalAddDays";
import {
  CardIconResp,
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  CourseContain,
  FirstBox,
  Image1,
  Info,
  Label,
  LastContainer,
  Level,
  PayContain,
  ProfileContain,
  ProfilePic,
  Title,
  TitleBox,
  TitleContain,
  TransparentButton,
  UserContain,
} from "./UsersCardData.styled";
import ErrorModal from "../../../Error/ErrorModal";
import { getLessonFromUserApi } from "../../../api/admin";
import { AdminLoader } from "../../SideBar.styled";

type CardData = {
  user: any;
  loader: any;
  setIsVisible: (open: boolean) => void;
  courses: Array<any>;
  openUserCardData: any;
};

const UserCardData = ({ user, setIsVisible, courses, loader, openUserCardData }: CardData) => {
  const [show, setShow] = useState(false);
  const [showAddDays, setShowAddDays] = useState(false);
  const [error, setError] = useState(false);
  const GonvarImg = "/images/purchase/logo.png";
  let today = new Date().getTime() / 1000;
  const handleCourse = () => {
    // getUserCourses();
  }

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
  }
  const secondsToDate = (value: any) => {
    let tempDate = new Date(value * 1000)
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  const deleteUser = () => {
    setError(true);
  }

  if (!loader) {
    return (
      <AdminLoader>
        <div className="loader-image">
          <div className="loader-contain" />
        </div>
      </AdminLoader>
    )
  }
  return (
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
        <Columns>
          <ColumnContain>
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
                Gonvar Plus
              </Label>
            </Info>
          </ColumnContain>
          <ColumnContain>
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
                {!user.phone_umber ? "N/A" : user.phone_umber}
              </Label>
            </Info>
          </ColumnContain>
        </Columns>
        <Courses>
          <TitleBox>
            Cursos Activos
          </TitleBox>
          {
            user.final_date >= today &&
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
          <TransparentButton onClick={() => { setShow(true); }}>Agregar Curso</TransparentButton>
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
        <TransparentButton onClick={() => { setShowAddDays(true); }}>Agregar días de suscripción</TransparentButton>
        {/* <TransparentButton onClick={() => { deleteUser() }}>Eliminar usuario</TransparentButton> */}
      </>
      <Modal1 show={show} setShow={setShow} user={user} courses={courses} handleCourse={handleCourse} openUserCardData={openUserCardData} />
      <ModalAddDays show={showAddDays} setShow={setShowAddDays} user={user} />
      <ErrorModal show={error} setShow={setError} error={"Lo sentimos, esta acción solo se puede realizar manualmente desde Firebase, gracias!"}></ErrorModal>
    </UserContain>
  )
}
export default UserCardData;