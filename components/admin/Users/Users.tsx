import React, { useState } from 'react'
import { TitleContain, Title, Container, ProfileContain, Profile } from '../Pay/Pay.styled';
import SideBar from '../SideBar';
import { AdminContain, Table } from '../SideBar.styled';
import UserInfo from './UserData/UserInfo';
import { UserContain, EditIcon, SearchContain, SearchIcon, SearchInput, UserShow } from './Users.styled';

const Users = () => {

  const [showUser, setShowUser] = useState(false);

  return (
    <AdminContain>
      <SideBar />
      <UserContain>
        <Container>
          <TitleContain>
            <Title>Usuarios</Title>
            <SearchContain>
              <SearchIcon />
              <SearchInput placeholder="Buscar un Usuario" />
            </SearchContain>
          </TitleContain>
          <Table id="Users">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Creación</th>
                <th>Cursos Suscritos</th>
                <th>Recompensas</th>
                <th>Visualizar</th>
              </tr>
              {/* TABLAS */}
              <tr onClick={() => { setShowUser(!showUser) }}>
                <td style={{ fontWeight: 600 }}>
                  <ProfileContain>
                    <Profile />Mofupiyo
                  </ProfileContain>
                </td>
                <td >mofu@mofupiyo.com</td>
                <td>10/05/2022</td>
                <td >3 Activos</td>
                <td>3,000 puntos</td>
                <td><UserShow><EditIcon />Visualizar Usuario</UserShow></td>
              </tr>
            </tbody>
          </Table>
        </Container>
        {
          showUser == true &&
          <UserInfo showUser={showUser} setShowUser={setShowUser} />
        }
      </UserContain>
    </AdminContain >
  )
}
export default Users;