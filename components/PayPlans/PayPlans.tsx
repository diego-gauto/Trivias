import { useEffect, useState } from "react";

import router from "next/router";

import { PREVIEW_PATH } from "../../constants/paths";
import { useAuth } from "../../hooks/useAuth";
import { IUser } from "../../interfaces/IUserData";
import { FAQ } from "./FAQ/FAQ";
import { PayStyles } from "./PayPlans.styled";
import { Plans } from "./Plans/Plans";
import { CsvData } from "../admin/HomeWork/HomeWork";
import { getStripeInfo } from "../api/conekta/test";

const tarjetas = "/images/pay_plans/cards.png"
const oxxo = "/images/pay_plans/oxxo.png"

const PayPlans = () => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [selected, setSelected] = useState(1)
  var userData = useAuth();
  useEffect(() => {
    if (userData.user !== null) {
      setUser(userData.user)
    }
  }, [])

  const goTo = () => {
    router.push({ pathname: PREVIEW_PATH })
  }

  const handleSelected = (value: number) => {
    setSelected(value)
  }

  const uploadCsv = (event: any) => {
    const reader = new FileReader()
    const fileContent = event.target
    reader.readAsText(fileContent.files[0])

    reader.onload = () => {
      let csvData: any = reader.result
      let csvRecordsArray = csvData.split(/\r\n|\n/);

      const records = getDataRecordsArrayFromCSVFile(csvRecordsArray);

      processArrayWithDelay(records)
    }
    reader.onerror = function () {
    };
  }


  const getDataRecordsArrayFromCSVFile = (csvRecordsArray: any) => {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (csvRecordsArray[i]).split(',');
      let csvRecord: any = new CsvData();
      for (let i = 0; i < currentRecord.length; i++) {
        csvRecord.properties.push(currentRecord[i].trim())
      }
      if (csvRecord.properties[0] != '') { csvArr.push(csvRecord); }
    }
    return csvArr;
  }

  async function processArrayWithDelay(arrayOfEndpoints: any) {
    for (const endpoint of arrayOfEndpoints) {
      try {
        let body = {
          stripe_id: endpoint.properties[5]
        }

        const response = await getStripeInfo(body);
        // console.log(response);
        let today = new Date().getTime() / 1000;
        let days = (endpoint.properties[6] - today) / 86400
        let subscriptionArray = response.data.subscriptions.data
        if (days < 90) {
          if (subscriptionArray.length > 0 && subscriptionArray[0].status === 'active') {
            console.log(1);

          }
        }
        // console.log(response);
      } catch (error) {
        console.log(endpoint);
        console.error(`Error fetching data from ${endpoint}:`, error);
      }
    }
  }

  return (
    <PayStyles className="w-100">
      <button onClick={uploadCsv}>add</button>
      <input type="file" name="" id="" onChange={(e) => { uploadCsv(e) }} />
      <h1 style={{ display: "none" }}>Planes de suscripción Gonvar</h1>
      <div className="colors">
        <div className="back">
          <div className="title text-center py-5">
            <h3 className="purple h1">Planes y precios</h3>
            <p className="yellow">¡Elige la mejor suscripción para ti!</p>
          </div>

          {/* Responsive Switch*/}
          <div className="select-plan">
            <div className="options">
              {/* <p className={`option ${selected === 1 ? 'link' : ''}`}
                onClick={() => handleSelected(1)}>G+ mensual</p>
              <p className="option">|</p> */}
              <p className={`option ${selected === 2 ? 'link' : ''}`}
                onClick={() => handleSelected(2)}>G+ anual</p>
              <p className="option">|</p>
              <p className={`option ${selected === 3 ? 'link' : ''}`}
                onClick={() => handleSelected(3)}>Nails Máster</p>
            </div>
          </div>

          <div className="plans justify-content-center">
            <div className="middle">
              <Plans user={user} selected={0} />
            </div>
          </div>

          <div className="plans-res justify-content-center">
            <div className="middle">
              <Plans user={user} selected={selected} />
            </div>
          </div>



          <div className="subtitle text-center py-3">
            <h3 className="h4"><b>Nunca subiremos el precio</b> si mantienes tu suscripción activa.</h3>
            <div className="d-inline-flex">
              <p className="no-bold mt-3">Usa el método de pago más cómodo para ti: </p>
              <img src={tarjetas} alt="cards" className=" align-self-center" />
              <img src={oxxo} alt="oxxo" className=" align-self-center" />
            </div>
          </div>
          <button className="continue my-4 d-flex mx-auto" onClick={goTo}>Continuar sin suscripción</button>

          <div className="break  py-2 px-5">
            <div className="m-5">
              <h2 className="h3 text-center mb-5">Impulsa tu <b className="purple-pink no-bold">creciemiento profesional como Nail Artist</b>
                <br /> y alcanza tus metas</h2>
              <div className="row">
                <div className="col-sm-4 text-center">
                  <h2>+45 mil alumnas</h2>
                  <p>que se han inscrito a nuestra plataforma.</p>
                </div>
                <div className="col-sm-4 text-center">
                  <h2>+60 cursos</h2>
                  <p>donde aprenderás desde cero y paso a paso técnicas actualizadas.</p>
                </div>
                <div className="col-sm-4 text-center">
                  <h2>+300 horas</h2>
                  <p>De cursos completos,<br /> en calidad FULL HD.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="faq py-5">
            <h2 className="text-center purple-pink">Preguntas Frecuentes</h2>
            <div className="m-5 px-5 faq-bold d-flex justify-content-center">
              <FAQ />
            </div>
          </div>
        </div>
      </div>
    </PayStyles >
  )
}
export default PayPlans;