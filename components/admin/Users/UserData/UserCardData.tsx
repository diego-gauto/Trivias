

import { useEffect, useState } from "react";

import { DocumentData } from "firebase/firestore";

import { getPaymentmethods } from "../../../../store/actions/PaymentActions";
import { getPaidCourses } from "../../../../store/actions/UserActions";
import GetUserLevel from "./GetUserLevel";
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
import { deleteSelectedUser } from "../../../../store/actions/AuthActions";

type CardData = {
  user: any;
  setIsVisible: (open: boolean) => void;
  courses: Array<any>;
};

const UserCardData = ({ user, setIsVisible, courses }: CardData) => {
  const [show, setShow] = useState(false);
  const [showAddDays, setShowAddDays] = useState(false);
  const [paidCourses, setPaidCourses] = useState<Array<any>>([]);
  const [paymentMethod, setPaymentMethods] = useState<Array<any>>([]);

  const getUserCourses = () => {
    let tempCourses: Array<any> = [];
    getPaidCourses(user.id).then((res) => {
      let today: any = new Date().getTime() / 1000;
      res.forEach((element: DocumentData) => {
        if (element.finalDate > today) {
          tempCourses.push(element);
        }
      });
      setPaidCourses(tempCourses);
    })
  }
  const handleCourse = () => {
    getUserCourses();
  }
  const getAllPaymentMethods = () => {
    getPaymentmethods(user.id).then((res) => {
      setPaymentMethods(res);
    })
  }

  const deleteUser = () => {
    deleteSelectedUser("q")
  }

  useEffect(() => {
    getUserCourses();
    getAllPaymentMethods();
  }, [user])

  return (
    <UserContain>
      <TitleContain>
        <FirstBox>
          <Title>Usuario Activo</Title>
        </FirstBox>
        <CloseIcon onClick={() => setIsVisible(false)} />
      </TitleContain>

      <><ProfileContain>
        <ProfilePic />
        <Level>
          <GetUserLevel userLevel={user} />
        </Level>
      </ProfileContain><Columns>
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
                {user.created_at}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                {!user.phoneNumber ? "N/A" : user.phoneNumber}
              </Label>
            </Info>
          </ColumnContain>
        </Columns><Courses>
          <TitleBox>
            Cursos Activos
          </TitleBox>
          {paidCourses.length > 0 ? <CourseContain>
            {paidCourses.map((x) => {
              return (
                <Image1 />
              )
            })}
          </CourseContain> : <CourseContain>
            Sin cursos...
          </CourseContain>}
          <TransparentButton onClick={() => { setShow(true); }}>Agregar Curso</TransparentButton>
        </Courses><PayContain>
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
        </PayContain>
        <TransparentButton onClick={() => { setShowAddDays(true); }}>Agregar días de suscripción</TransparentButton>
        <TransparentButton onClick={() => { deleteUser() }}>Eliminar usuario</TransparentButton>
      </>
      <Modal1 show={show} setShow={setShow} user={user} courses={courses} handleCourse={handleCourse} />
      <ModalAddDays show={showAddDays} setShow={setShowAddDays} user={user} />
    </UserContain>
  )
}
export default UserCardData;