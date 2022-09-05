import React, { useEffect, useState } from "react";

import { DEFAULT_USER_IMG } from "../../../constants/paths";
import { getInvoice } from "../../../store/actions/PaymentActions";
import SideBar from "../SideBar";
import { AdminContain, Table } from "../SideBar.styled";
import {
  ButtonIcon,
  Container,
  IconContain,
  Imagecontain,
  Method,
  PayContain,
  Profile,
  ProfileContain,
  Title,
  TitleContain,
} from "./Pay.styled";
import Select from "./Select/Select";

const Pay = () => {
  const [invoice, setInvoice] = useState([])
  const getAllInvoice = () => {
    getInvoice().then((res) => {
      res.forEach((element: any) => {
        let tempDate = new Date(element.paidAt.seconds * 1000);
        let tempDay = tempDate.getDate()
        let tempMonth = tempDate.getMonth()
        let tempYear = tempDate.getFullYear()
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        element.amount = element.amount / 100
      });
      setInvoice(res);
    })
  }
  useEffect(() => {
    getAllInvoice();
  }, [])

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
              {
                invoice.map((invoice: any, index) => {
                  return (
                    <tr key={"allPayment" + index}>
                      <td>
                        <ProfileContain>
                          <Imagecontain>
                            {invoice && invoice.userImage
                              ?
                              < Profile
                                src={invoice.userImage}
                              />
                              :
                              <Profile
                                src={DEFAULT_USER_IMG}
                              />
                            }
                          </Imagecontain>
                          {invoice.userName}
                        </ProfileContain>
                      </td>
                      <td>{invoice.userEmail}</td>
                      <td>{invoice.formatDate}</td>
                      <td style={{ fontWeight: 600 }}>$ {invoice.amount}.00</td>
                      <td>{invoice.product}</td>
                      <td>
                        {
                          invoice.brand != null &&
                          <IconContain><Method brand={invoice.brand} /></IconContain>
                        }

                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Container>
      </PayContain>
    </AdminContain>
  )
}
export default Pay;