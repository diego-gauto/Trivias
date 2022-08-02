import React from 'react'
import SideBar from '../SideBar';
import { AdminContain, Table } from '../SideBar.styled';
import { PayContain, Title, TitleContain, Container, DateSelect, Visa, IconContain, MasterCard, PayPal, Profile, ProfileContain, ButtonIcon } from './Pay.styled';
import Select from './Select/Select';

const Pay = () => {
  return (
    <AdminContain>
      <SideBar />
      <PayContain>
        <Container>
          <TitleContain>
            <Title>Ventas</Title>
            <ButtonIcon>
              <Select />
            </ButtonIcon>
          </TitleContain>
          <Table id="Pay">
            <tbody>
              <tr>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Pago</th>
                <th>Cantidad (mxn)</th>
                <th>Curso</th>
                <th>Método de Pago</th>
              </tr>
              {/* TABLAS */}
              <tr>
                <td>
                  <ProfileContain>
                    <Profile />Mofupiyo
                  </ProfileContain>
                </td>
                <td>mofu@mofupiyo.com</td>
                <td>10/05/2022</td>
                <td style={{ fontWeight: 600 }}>$ 3,000.00</td>
                <td>Lorem Ipsum</td>
                <td><IconContain><Visa /></IconContain></td>
              </tr>
              <tr>
                <td>
                  <ProfileContain>
                    <Profile />Mofupiyo
                  </ProfileContain>
                </td>
                <td>mofu@mofupiyo.com</td>
                <td>10/05/2022</td>
                <td style={{ fontWeight: 600 }}>$ 3,000.00</td>
                <td>Lorem Ipsum</td>
                <td><IconContain><Visa /></IconContain></td>
              </tr>
              <tr>
                <td>
                  <ProfileContain>
                    <Profile />Mofupiyo
                  </ProfileContain>
                </td>
                <td>mofu@mofupiyo.com</td>
                <td>10/05/2022</td>
                <td style={{ fontWeight: 600 }}>$ 3,000.00</td>
                <td>Lorem Ipsum</td>
                <td><IconContain><MasterCard /></IconContain></td>
              </tr>
              <tr>
                <td>
                  <ProfileContain>
                    <Profile />Mofupiyo
                  </ProfileContain>
                </td>
                <td>mofu@mofupiyo.com</td>
                <td>10/05/2022</td>
                <td style={{ fontWeight: 600 }}>$ 3,000.00</td>
                <td>Lorem Ipsum</td>
                <td><IconContain><PayPal /></IconContain></td>
              </tr>

            </tbody>
          </Table>
        </Container>
      </PayContain>
    </AdminContain>
  )
}
export default Pay;