import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import { userInvoices } from '../../../components/api/profile';
import { getInvoice } from '../../../store/actions/PaymentActions';
import { getUserInvoices } from '../../../store/actions/ProfileActions';
import { HistoryContainer } from './User.styled'

export const History = ({ user, addPayment }: any) => {
  const [option, setOption] = useState(0);
  const [invoices, setInvoices] = useState<any>([])
  const [allOptions, setAllOptions] = useState([])
  const today = new Date().getTime() / 1000;
  const handleLeft = () => {
    if (option == 0) {
      setOption(allOptions.length - 1)
    }
    else {
      setOption(option - 1);
    }
  }
  const handleRight = () => {
    if (option == allOptions.length - 1) {
      setOption(0)
    }
    else {
      setOption(option + 1);
    }
  }

  const getDays = () => {
    return Math.round((user.final_date - today) / 86400)
  }

  const retrieveInvoices = () => {
    userInvoices(user.id).then((res) => {
      let tempInvoice: any = [];
      let tempOption: any = [];
      res.data.invoices.forEach((element: any) => {
        let tempDate: any = new Date(element.paid_at);
        let tempDay = tempDate.getDate();
        let tempMonth = tempDate.getMonth() + 1;
        let tempYear = tempDate.getFullYear();
        element.formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        element.amount = element.amount / 100;
        if (element.product === "Gonvar Plus" && (element.amount === 149 || element.amount === 1599)) {
          let tempFinalDate: any = new Date(element.paid_at).getTime() / 1000;
          tempDate = new Date((tempFinalDate + (element.amount === 1599 ? 31536000 : 2628000)) * 1000);
          tempDay = tempDate.getDate();
          tempMonth = tempDate.getMonth() + 1;
          tempYear = tempDate.getFullYear();
          element.finalDate = `${tempDay}/${tempMonth}/${tempYear}`;
          let date = new Date().getTime() / 1000;
          if (user.final_date > date) {
            element.status = "Activo"
          } else {
            element.status = "Inactivo"
          }
        } else {
          let tempFinalDate = element.finalDate
          tempDate = new Date((element.finalDate) * 1000);
          tempDay = tempDate.getDate();
          tempMonth = tempDate.getMonth() + 1;
          tempYear = tempDate.getFullYear();
          element.finalDate = `${tempDay}/${tempMonth}/${tempYear}`;
          let date = new Date().getTime() / 1000;
          if ((tempFinalDate) > date) {
            element.status = "Activo"
          } else {
            element.status = "Inactivo"
          }
        }
        tempInvoice.push(element);
      });

      tempInvoice.sort((a: any, b: any) => {
        return a.paid_at < b.paid_at ? 1 : -1;
      })
      tempInvoice = tempInvoice.slice(0, 5);
      tempInvoice.forEach((element: any, index: number) => {
        tempOption.push(index);
      });
      setAllOptions(tempOption);
      setInvoices(tempInvoice.slice(0, 5));
    })
  }

  useEffect(() => {
    retrieveInvoices()
  }, []);

  return (
    <HistoryContainer addPayment={addPayment}>
      <div className='title'>
        Historial de pedidos
      </div>
      <div className='history-content'>
        <RiArrowLeftSLine style={{ fontSize: 60, cursor: "pointer" }} onClick={handleLeft} />
        <div className='history-data'>
          <div className='history-info'>
            <p>No. Pedido</p>
            <p className='second-info' style={{ color: "#942ced", fontWeight: "600" }}>{invoices[option]?.id}</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Producto</p>
            <p className='second-info' style={{ wordBreak: "break-word" }}>{invoices[option]?.product}</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Compra</p>
            <p className='second-info'>{invoices[option]?.formatDate}</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Expiración</p>
            <p className='second-info'>{invoices[option]?.finalDate}</p>
          </div>
          <div className='line' />
          <div className='history-info'>
            <p>Estatus</p>
            <p className='second-info'>{invoices[option]?.status}</p>
          </div>
        </div>
        <RiArrowRightSLine style={{ fontSize: 60, cursor: "pointer" }} onClick={handleRight} />
      </div>
      <div className='dots'>
        {
          allOptions.map((val) => {
            return (
              <div
                key={"optionsHistory " + val}
                className='option-dot'
                style={option == val ? { backgroundColor: "#ff6700" } : { backgroundColor: "#3f1168" }}
                onClick={() => { setOption(val); }}
              />
            )
          })
        }
      </div>
    </HistoryContainer>
  )
}
