import React, { useEffect, useState } from "react";
import { DEFAULT_USER_IMG, OXXO_PAY_METHOD, SPEI_PAY_METHOD, CONEKTA_PAY_METHOD, ADMIN_PAY_METHOD, PAYPAL_PAY_METHOD, STRIPE_PAY_METHOD, UNKNOWN_PAY_METHOD } from "../../../constants/paths";
import { getGenericQueryResponse, getInvoicesApi, getInvoicesWithOffsetTestApi } from "../../api/admin";
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
import { generateGetInvoicesCountQuery, generateGetInvoicesQuery, getDistinctMethodsOfInvoice } from './Queries';

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
  const [email, setEmail] = useState<string>("");
  const [methods, setMethods] = useState<string[]>([]);
  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number>(-1);

  useEffect(() => {
    getDistinctMethodsOfInvoices();
  }, [])

  useEffect(() => {
    newRetrieveInvoices();
  }, [offset, email, selectedMethodIndex]);

  const retrieveInvoices = async () => {
    setIsLoading(true);
    try {
      const { invoices, count } = (await getInvoicesWithOffsetTestApi({ offset })).data;
      setInvoices(invoices);
      setCount(count);
    } catch (error) {
      console.error(error);
      changePage(0);
    }
    setIsLoading(false);
  }

  const newRetrieveInvoices = async () => {
    setIsLoading(true);
    try {
      // Inovices count
      const queryInvoicesCount = generateGetInvoicesCountQuery(email, methods[selectedMethodIndex]);
      const responseInvoicesCount = await getGenericQueryResponse(queryInvoicesCount);
      const count = responseInvoicesCount.data.data[0]["count"];
      setCount(count);
      // Invoices data
      const queryInvoices = generateGetInvoicesQuery(email, methods[selectedMethodIndex], offset);
      const responseInvoices = await getGenericQueryResponse(queryInvoices);
      const data = responseInvoices.data.data;
      setInvoices(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const getDistinctMethodsOfInvoices = async () => {
    try {
      const query = getDistinctMethodsOfInvoice();
      const response = await getGenericQueryResponse(query);
      const methods = response.data.data.map(m => m["method"]);
      methods.sort()
      setMethods(methods);
    } catch (error) {
      console.error(error);
    }
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
            <div style={{
              width: '100%',
            }}>
              <div className="rows" style={{
                display: 'flex',
                flexDirection: 'column',
                paddingBlock: '20px',
                paddingInline: '30px',
                gap: '10px'
              }}>
                <div className="input-contain" style={{
                  minWidth: '50%'
                }}>
                  <label className="input-label">Usuario</label>
                  <input
                    className="input-create"
                    type="text"
                    placeholder="Email del usuario"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="input-contain" style={{
                  minWidth: '50%'
                }}>
                  <label className="input-label">Método de Pago</label>
                  <select onChange={(event) => {
                    setSelectedMethodIndex(parseInt(event.target.value));
                  }}>
                    <option key={`method_${0}`} value="-1">Sin especificar</option>
                    {
                      methods.map((method, index) => {
                        return <option key={`method_${index + 1}`} value={index}>{method}</option>;
                      })
                    }
                  </select>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Title>Ventas: {count}</Title>
                <Pagination
                  changePage={changePage}
                  currentPage={(offset / 100)}
                  totalPage={Math.ceil(count / 100)}
                />
              </div>
            </div>
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
                invoices
                  .filter(invoice => invoice.email.startsWith(email))
                  .map((invoice, index) => {
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