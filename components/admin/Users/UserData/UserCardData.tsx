

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

const AllUsers = ({ user, setIsVisible }: any) => {
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
        <Level />
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
              <Label style={{ maxWidth: "200px", overflowWrap: "break-word" }}>
                {user.email}
              </Label>
            </Info>
            <Info>
              Fecha de Creación
              <Label>
                {new Date(user.created_at.seconds * 1000).toLocaleDateString("es-MX")}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                5512345678
              </Label>
            </Info>
          </ColumnContain>
        </Columns><Courses>
          <TitleBox>
            Cursos Activos
          </TitleBox>
          <CourseContain>
            <Image1 />
            <Image2 />
            <Image3 />
          </CourseContain>
          <TransparentButton /*onClick={() => { setShow(true); }}*/>Agregar Curso</TransparentButton>
        </Courses><PayContain>
          <TitleBox>
            Métodos de pago asociados
          </TitleBox>
          <LastContainer>
            <Pay1 />
            <Pay2 />
          </LastContainer>
        </PayContain></>

      <Modal1 /*show={show} setShow={setShow} */ />
    </UserContain>
  )
}
export default AllUsers;