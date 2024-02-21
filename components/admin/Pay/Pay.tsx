import React, { useEffect, useState } from "react";
import { DEFAULT_USER_IMG } from "../../../constants/paths";
import { getInvoicesApi, getInvoicesWithOffsetTestApi } from "../../api/admin";
import { AdminContain, Table } from "../SideBar.styled";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
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

import Pagination from '../../Pagination/Pagination';

export interface Invoice {
  id: number
  amount: number
  method: string
  paid_at: string
  product: string
  user_id: number
  name: string
  email: string
}

const Pay = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    retrieveInvoices();
  }, [offset]);

  const retrieveInvoices = async () => {
    setIsLoading(true);
    try {
      const { invoices, count } = (await getInvoicesWithOffsetTestApi({ offset })).data;
      console.log(invoices);
      setInvoices(invoices);
      setCount(count);
    } catch (error) {
      console.error(error);
      changePage(0);
    }
    setIsLoading(false);
  }

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  const changePage = (page: number) => {
    setOffset(page * 100);
  }

  return (
    <AdminContain>
      <PayContain>
        <Container>
          <TitleContain>
            <Title>Ventas: {count}</Title>
            <Pagination
              changePage={changePage}
              currentPage={(offset / 100)}
              totalPage={Math.ceil(count / 100)}
            />
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
                !isLoading &&
                invoices.map((invoice, index) => {
                  return (
                    <tr key={"allPayment" + index}>
                      <td>
                        <ProfileContain>
                          <Imagecontain>
                            <Profile
                              src={DEFAULT_USER_IMG}
                            />
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
          {
            isLoading &&
            <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
              <LoaderImage>
                <LoaderContain />
              </LoaderImage>
            </Background>
          }
        </Container>
      </PayContain>
    </AdminContain>
  )
}
export default Pay;