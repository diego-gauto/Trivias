

import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import {
  Container,
  CourseButton,
  GeneralContain,
  GonvarTitle,
  ShareButton,
  Title,
  TitleBox,
  TitleContain,
} from "./Sections.styled";

const Sections = () => {
  const usersCollectionRef = query(collection(db, "users"));
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {

    const getUsers = async (): Promise<void> => {
      const mainResponse = await getDocs(usersCollectionRef);
      const usersResponse = mainResponse.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const usersData = usersResponse.map((user: any) => ({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber ?? "",
        created_at: new Date(user.created_at.seconds * 1000).toLocaleDateString("es-MX"),
        score: user.score.toString(),
        role: user.role ?? "",
        id: user.id,
      }));
      setUsers(usersData);
    }
    getUsers();
  }, []);

  return (
    <AdminContain>
      <SideBar />
      <GeneralContain>
        <TitleBox>
          <Title>Secciones</Title>
          <CourseButton>New Course</CourseButton>
        </TitleBox>
        <Container>
          <TitleContain>
            <GonvarTitle>Lista de usuarios</GonvarTitle>
            <ShareButton>SHARE YOUR SITE</ShareButton>
          </TitleContain>
          <Table id="Users">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th>Cursos Suscritos</th>
              </tr>
              {/* TABLAS */}
              {
                users.map((user, index): any => {
                  return (
                    <tr key={index} >
                      <td >

                        {user.name}
                      </td>
                      <td >{user.email}</td>
                      <td>{user.created_at}</td>
                      <td >3 Activos</td>
                      {/* <td>{user.score} puntos</td> */}
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </Container>
      </GeneralContain>
    </AdminContain>
  )
}
export default Sections;