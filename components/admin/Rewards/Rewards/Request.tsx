import React, { useEffect, useState } from 'react'
import { getRequest } from '../../../../store/actions/RewardActions';
import { Table } from '../../SideBar.styled';
import { InputContain, Tab, Unselect } from '../Rewards.styled';
import { DEFAULT_USER_IMG } from "../../../../constants/paths";
import { TabContain } from './Points.styled';
import {
  Contain, FirstContain, IconContain, Imagecontain, Profile,
  Search, SearchContain, SearchIcon, Title
} from './Request.styled';

const Request = ({ setPlace }: any) => {

  const [request, setRequest] = useState([])

  const getAllRequest = () => {
    getRequest().then((res) => {
      res.forEach((element: any) => {
        let tempDate = new Date(element.createAt.seconds * 1000);
        let tempDay = tempDate.getDate()
        let tempMonth = tempDate.getMonth()
        let tempYear = tempDate.getFullYear()
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
      });
      setRequest(res);
    })
  }
  useEffect(() => {
    getAllRequest();
  }, [])

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
          <tbody>
            <tr>
              <th>Usuario</th>
              <th>Puntos</th>
              <th>Fecha de Creación</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Producto</th>
              <th>Estatus</th>
            </tr>
            {/* TABLAS */}
            {
              request.map((request: any, index: any) => {
                return (
                  <tr key={"RequestAdmin" + index}>
                    <td style={{ fontWeight: 600 }}>
                      <IconContain >
                        <Imagecontain>
                          {request && request.userImage
                            ?
                            < Profile
                              src={request.userImage}
                            />
                            :
                            <Profile
                              src={DEFAULT_USER_IMG}
                            />
                          }
                        </Imagecontain>
                        {request.user}
                      </IconContain>
                    </td>
                    <td >{request.points}</td>
                    <td>{request.formatDate}</td>
                    <td >{request.phoneNumber}</td>
                    <td>{request.type}</td>
                    <td style={{ fontWeight: 600 }}>{request.product}</td>
                    <td>
                      {
                        request.status == false
                          ? "No entregado"
                          : "Enviado"
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Contain>
    </>

  )
}
export default Request;