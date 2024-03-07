import React, { useEffect, useState } from "react";
import { DEFAULT_USER_IMG, OXXO_PAY_METHOD, SPEI_PAY_METHOD, CONEKTA_PAY_METHOD, ADMIN_PAY_METHOD, PAYPAL_PAY_METHOD, STRIPE_PAY_METHOD, UNKNOWN_PAY_METHOD } from "../../../constants/paths";
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

type MethodFromInvoices = 'stripe' | 'paypal' | 'conekta' | 'admin' | 'oxxo' | 'spei';

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

  const generateIconContain = (methodValue: string): JSX.Element => {
    const styles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const method: MethodFromInvoices = methodValue as MethodFromInvoices;

    let srcPath = UNKNOWN_PAY_METHOD;
    if (method === 'admin') {
      srcPath = ADMIN_PAY_METHOD;
    } else if (method === 'conekta') {
      srcPath = CONEKTA_PAY_METHOD;
    } else if (method === 'oxxo') {
      srcPath = OXXO_PAY_METHOD;
    } else if (method === 'paypal') {
      srcPath = PAYPAL_PAY_METHOD;
    } else if (method === 'spei') {
      srcPath = SPEI_PAY_METHOD;
    } else if (method === 'stripe') {
      srcPath = STRIPE_PAY_METHOD;
    }

    return <td style={styles}>
      <img style={{
        border: '3px solid #d9d9d9',
        borderRadius: '5px',
      }} src={srcPath} alt={`${method} logo`} />
    </td>;
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
                      {
                        generateIconContain(invoice.method)
                      }
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