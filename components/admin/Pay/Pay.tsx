import React, { useEffect, useState } from 'react'
import { getInvoice } from '../../../store/actions/PaymentActions';
import { DEFAULT_USER_IMG } from "../../../constants/paths";
import SideBar from '../SideBar';
import { AdminContain, Table } from '../SideBar.styled';
import {
  PayContain, Title, TitleContain, Container,
  IconContain, Profile, ProfileContain,
  ButtonIcon, Method, Imagecontain
} from './Pay.styled';
import Select from './Select/Select';

const Pay = () => {
  let today = new Date().getTime() / 1000;
  let weekAgo = today - 604800;
  let twoWeeksAgo = today - 1209600;
  const [invoice, setInvoice] = useState([]);
  const [tempInvoice, setTempInvoice] = useState<any>([]);

  const getAllInvoice = () => {
    let tempInvoice: any = [];
    getInvoice().then((res) => {
      res.forEach((element: any) => {
        let tempDate: any = new Date(element.paidAt.seconds * 1000);
        let tempDay = tempDate.getDate()
        let tempMonth = tempDate.getMonth()
        let tempYear = tempDate.getFullYear()
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        element.amount = element.amount / 100;
        tempInvoice.push(element);
        // if (element.paidAt.seconds > weekAgo) {
        //   tempInvoice.push(element);
        // }
      });
      setTempInvoice(tempInvoice);
      setInvoice(res);
    })
  }
  useEffect(() => {
    getAllInvoice();
  }, []);

  // const handleClick = (value: number) => {
  //   let tempInvoices: any = [];

  //   invoice.forEach((element: any) => {
  //     if (element.paidAt.seconds > twoWeeksAgo && value == 2) {
  //       tempInvoices.push(element);
  //     }
  //     if (element.paidAt.seconds > weekAgo && value == 1) {
  //       tempInvoices.push(element);
  //     }
  //   });
  //   setTempInvoice([...tempInvoices]);
  // }

  return (
    <AdminContain>
      <SideBar />
      <PayContain>
        <Container>
          <TitleContain>
            <Title>Ventas</Title>
            {/* <ButtonIcon>
              <Select handleClick={handleClick} />
            </ButtonIcon> */}
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
                tempInvoice.map((invoice: any, index: number) => {
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
                      {invoice.method == 'stripe' ? <td>
                        {
                          invoice.brand != null ?
                            <IconContain><Method brand={invoice.brand} /></IconContain> :
                            <IconContain><Method brand={'stripe'} /></IconContain>
                        }

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