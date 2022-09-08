

import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getPaidCourses } from "../../../../store/actions/UserActions";

import GetUserLevel from "./GetUserLevel";
import Modal1 from "./Modal/Modal";
import {
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  CourseContain,
  FirstBox,
  Image1,
  Image2,
  Image3,
  Info,
  Label,
  LastContainer,
  Level,
  Pay1,
  Pay2,
  PayContain,
  ProfileContain,
  ProfilePic,
  Title,
  TitleBox,
  TitleContain,
  TransparentButton,
  UserContain,
} from "./UsersCardData.styled";

const UserCardData = ({ user, setIsVisible, courses }: any) => {
  const [show, setShow] = useState(false);
  const [paidCourses, setPaidCourses] = useState<Array<any>>([]);

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

  useEffect(() => {
    getUserCourses();
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
          <LastContainer>
            <Pay1 />
            <Pay2 />
          </LastContainer>
        </PayContain></>
      <Modal1 show={show} setShow={setShow} user={user} courses={courses} />
    </UserContain>
  )
}
export default UserCardData;