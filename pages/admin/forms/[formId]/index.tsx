import { useEffect, useState, MouseEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Papa from "papaparse";

import UserFormList from "../../../../components/admin/Forms/userFormList/userFormList";
// import { getAllTriviasApi } from "../../../../components/api/trivias";
import { getUsersByFormApi } from "../../../../components/api/userform";
import {
  Background,
  LoaderContain,
  LoaderImage,
} from "../../../../screens/Login.styled";
import styles from "./listUser.module.css";
import { getUserMembership } from "../../../../components/api/users";

interface UserForm {
  id: number;
  user_id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
  suscription_status: string;
  fecha: string;
  option1: string;
  option2: string;
  option3: string;
}

// type Trivia = {
//   id: number;
//   title: string;
// };

// let allUsers: any = [];

const UsersForms = () => {
  const [usersForms, setUsersForms] = useState<UserForm[]>([]);
  // const [trivias, setTrivias] = useState<Trivia[]>([])
  // const [selectedTrivia, setSelectedTrivia] = useState<string | null>(null);
  // const [selectedResult, setSelectedResult] = useState<string | null>(null);
  // const [selectedIsUser, setSelectedIsUser] = useState<string | null>(""); // Nuevo estado
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 25;
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const users = usersForms.slice(firstIndex, lastIndex);
  const npage = Math.ceil(usersForms.length / usersPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const {
    main,
    buttonContainer,
    volver,
    volverText,
    link,
    titles,
    title,
    selectContainer,
    selectGroup,
    select,
    button,
    pagination,
    pageItem,
    pageLink,
    active,
  } = styles;

  const {
    query: { formId },
  } = useRouter();

  const downloadCsv = () => {
    const csv = Papa.unparse(usersForms);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "usersForms.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchUsersForms = async () => {
      try {
        // Realiza la llamada a la API para obtener los usuarios del formulario
        const usersData = await getUsersByFormApi(Number(formId));
        console.log(usersData);

        const formatDate = (date: Date): string => {
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");

          return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        };

        const mappedUsers = usersData.map((user: UserForm, index: number) => {
          return {
            ...user,
            id: index + 1,
            fecha: formatDate(new Date(user.fecha)),
            isUser: user.user_id ? "Si" : "No",
          };
        });
        setUsersForms(mappedUsers);
        console.log(mappedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las trivias:", error);
      }
    };

    // Llama a la función para cargar las trivias al cargar inicialmente el componente
    fetchUsersForms();
  }, []);

  const prevPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (
    e: MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const nextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <Background style={{ alignItems: "center", justifyContent: "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }

  return (
    <div className={main}>
      <div className={titles}>
        <div className={buttonContainer}>
          <Link href={"/admin/Forms"}>
            <a className={link}>
              <div className={volver}>
                <img src="/images/trivias/icono . retroceder.svg" alt="" />
                <div className={volverText}> Volver</div>
              </div>
            </a>
          </Link>
          <button className={button} onClick={downloadCsv}>
            Descargar CSV
          </button>
        </div>
        <h2 className={title}>Listados de usuarios</h2>
        <h3>Total de usuarios: {usersForms.length}</h3>
      </div>

      <UserFormList usersForm={users} />

      <nav>
        <ul className={pagination}>
          {npage <= 5 ? (
            // Si hay 3 o menos páginas, muestra opciones para llegar directamente a las páginas
            numbers.map((number, index) => (
              <li
                className={`${pageItem} ${
                  currentPage === number ? active : ""
                }`}
                key={index}
              >
                <a
                  href=""
                  className={pageLink}
                  onClick={(e) => changeCurrentPage(e, number)}
                >
                  {number}
                </a>
              </li>
            ))
          ) : (
            // Si hay más de 5 páginas, muestra controles para la primera, anterior, actual, siguiente y última página
            <>
              <li className={pageItem}>
                <a
                  href=""
                  className={pageLink}
                  onClick={(e) => changeCurrentPage(e, 1)}
                >
                  Primera
                </a>
              </li>
              <li className={pageItem}>
                <a href="" className={pageLink} onClick={(e) => prevPage(e)}>
                  Anterior
                </a>
              </li>

              <li className={`${pageItem} ${active}`}>
                <span className={pageLink}>{currentPage}</span>
              </li>

              <li className={pageItem}>
                <a href="" className={pageLink} onClick={nextPage}>
                  Siguiente
                </a>
              </li>
              <li className={pageItem}>
                <a
                  href=""
                  className={pageLink}
                  onClick={(e) => changeCurrentPage(e, npage)}
                >
                  Última
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default UsersForms;
