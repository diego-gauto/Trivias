import React, { useEffect, useState } from "react";
import { DEFAULT_USER_IMG } from "../../../constants/paths";
import { getInvoicesApi } from "../../api/admin";
import { AdminContain, Table } from "../SideBar.styled";
import {
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

const Pay = () => {
  const [invoices, setInvoices] = useState([]);

  const retrieveInvoices = () => {
    getInvoicesApi().then((res) => {
      let tempInvoices = res.data.invoices.sort((a: any, b: any) => {
        return a.paid_at < b.paid_at ? 1 : -1;
      })
      setInvoices(tempInvoices)
    })
  }

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  useEffect(() => {
    retrieveInvoices();
  }, []);

  return (
    <AdminContain>
      <PayContain>
        <Container>
          <TitleContain>
            <Title>Ventas</Title>
          </TitleContain>
          <Table id="Pay">
            <tbody style={{ display: 'inline-table', width: '100%' }}>
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
                invoices.map((invoice: any, index: number) => {
                  return (
                    <tr key={"allPayment" + index}>
                      <td>
                        <ProfileContain>
                          <Imagecontain>
                            {invoice && invoice.photo
                              ?
                              < Profile
                                src={invoice.photo}
                              />
                              :
                              <Profile
                                src={DEFAULT_USER_IMG}
                              />
                            }
                          </Imagecontain>
                          {invoice.name}
                        </ProfileContain>
                      </td>
                      <td>{invoice.email}</td>
                      <td>{formatDate(invoice.paid_at)}</td>
                      <td style={{ fontWeight: 600 }}>$ {invoice.amount / 100}.00</td>
                      <td>{invoice.product}</td>
                      {invoice.method.includes('stripe') ? <td>
                        <IconContain><Method brand={'stripe'} /></IconContain>
                      </td> : <td>
                        <IconContain><Method brand={'paypal'} /></IconContain>
                      </td>}
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