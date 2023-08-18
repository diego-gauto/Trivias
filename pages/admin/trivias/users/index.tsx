import { useEffect, useState } from "react";

import Link from "next/link";
import Papa from "papaparse";

import UserTriviaList from "../../../../components/admin/Trivias/userTriviaList/userTriviaList";
import { getAllUsersApi } from "../../../../components/api/usertrivia";
import { Background, LoaderContain, LoaderImage } from "../../../../screens/Login.styled";
import styles from "./listUser.module.css";

interface UserTrivia {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
}

const UsersTrivias = () => {
  const [userTrivias, setUserTrivias] = useState<UserTrivia[]>([]);
  const [loading, setLoading] = useState(true);


  const { main, buttonContainer, volver, link, titles } = styles

  const downloadCsv = () => {
    const csv = Papa.unparse(userTrivias);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'userTrivias.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsersApi();

        setUserTrivias(users)
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }

    };

    fetchData();
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
        <Link href={"/admin/Trivias"}>
          <a className={link}>
            <div className={volver}>
              <img src="/images/trivias/icono . retroceder.svg" alt="" />
              <div> Volver</div>
            </div>
          </a>
        </Link>
        <h2>Listados de usuarios</h2>
      </div>

      <div className={buttonContainer}>
        <button onClick={downloadCsv}>Descargar CSV</button>
      </div>
      <UserTriviaList usersTrivia={userTrivias} />
    </div>
  );
}
export default UsersTrivias;