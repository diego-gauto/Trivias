// import Link from "next/link";

// import styles from "./selectorForms.module.css";

// const SelectorForms = () => {

//   const { container, buttonContainer, button } = styles

//   return (
//     <div className={container}>
//       <div className={buttonContainer}>

//         <Link href="/admin/forms/forms">
//           <a>
//             <button className={button}>Admin Formularios</button>
//           </a>
//         </Link>

//         <p>Creación de Formularios</p>
//       </div>
//       <div className={buttonContainer}>

//         <Link href="/admin/forms/users">
//           <a>
//             <button className={button}>Listados de usuarios</button>
//           </a>
//         </Link>

//         <p>Listados de usuarios que se hayan inscrito en los formularios</p>
//       </div>
//     </div>
//   );
// }
// export default SelectorForms;

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
// import { getAllTriviasApi } from "../../../../components/api/trivias";
import { getAllFormsApi } from "../../api/form";
import FormList from "./formList/formList";
import styles from "./selectorForms.module.css";

interface Form {
  id: number;
  name: string;
  createdAt: string;
  editedAt: string;
}

const formsMock = [
  { id: 1, title: "Formulario 1", date: new Date("12-01-2023") },
  { id: 2, title: "Formulario 2", date: new Date("12-02-2023") },
  { id: 3, title: "Formulario 3", date: new Date("12-03-2023") },
  { id: 4, title: "Formulario 4", date: new Date("12-04-2023") },
  { id: 5, title: "Formulario 5", date: new Date("12-05-2023") }]

const SelectorForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const { main, buttonContainer, volver, link, titles } = styles



  useEffect(() => {
    const fetchForms = async () => {
      try {
        const formsData = await getAllFormsApi();
        setForms(formsData);
        const nextFormId = formsData.length + 1;
        localStorage.setItem("nextFormId", nextFormId)
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las trivias:', error);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }

  return (

    <div className={main}>
      <div className={titles}>

        {/* <Link href={"/admin/Trivias"}>
          <a className={link}>
            <div className={volver}>
              <img src="/images/trivias/icono . retroceder.svg" alt="" />
              <div> Volver</div>
            </div>
          </a>
        </Link> */}
        <h2>Listados de Formularios</h2>
      </div>
      <div className={buttonContainer}>
        <Link href="/admin/forms/createForm">
          <a>
            <button>Crear Nuevo Formulario</button>
          </a>
        </Link>
      </div>
      <FormList forms={forms} />
    </div>
  );
}
export default SelectorForms;