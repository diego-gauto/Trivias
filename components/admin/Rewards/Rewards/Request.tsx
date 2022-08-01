import React from 'react'
import { Profile } from '../../Pay/Pay.styled';
import { Table } from '../../SideBar.styled';
import { InputContain, Tab, Unselect } from '../Rewards.styled';
import { TabContain } from './Points.styled';
import { Contain, FirstContain, IconContain, Search, SearchContain, SearchIcon, Title } from './Request.styled';

const Request = ({ setPlace }: any) => {
  return (
    <>
      <TabContain>
        <Unselect onClick={() => { setPlace("points") }}>
          <Tab>Recompensas por Puntuaje</Tab>
        </Unselect>
        <Unselect onClick={() => { setPlace("time") }}>
          <Tab>Recompensas por Tiempo</Tab>
        </Unselect>
        <InputContain>
          <Tab>Solicitudes de Recompensas</Tab>
        </InputContain>
      </TabContain>
      <Contain>
        <FirstContain>
          <Title> Usuarios</Title>
          <SearchContain>
            <SearchIcon />
            <Search placeholder="Buscar Usuario o Producto" />
          </SearchContain>
        </FirstContain>
        <Table id="Request">
          <tr>
            <th>Usuario</th>
            <th>Puntos</th>
            <th>Fecha de Creación</th>
            <th>Teléfono</th>
            <th>Desbloqueado</th>
            <th>Tipo</th>
            <th>Producto</th>
          </tr>
          {/* TABLAS */}
          <tr>
            <td style={{ fontWeight: 600 }}>
              <IconContain>
                <Profile />Mofupiyo
              </IconContain>
            </td>
            <td >4,500</td>
            <td>10/05/2022</td>
            <td >5512345678</td>
            <td>03/06/2022</td>
            <td>Físico</td>
            <td style={{ fontWeight: 600 }}>Gonvar Nails Leonardo Da Vinci</td>
          </tr>
        </Table>
      </Contain>
    </>

  )
}
export default Request;