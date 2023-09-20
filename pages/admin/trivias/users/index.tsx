import { useEffect, useState } from "react";

import select from "antd/es/select";
import Link from "next/link";
import Papa from "papaparse";

import UserTriviaList from "../../../../components/admin/Trivias/userTriviaList/userTriviaList";
import { getAllTriviasApi } from "../../../../components/api/trivias";
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

type Trivia = {
  id: number;
  title: string;
};

let allUsers: any = [];

const UsersTrivias = () => {
  const [userTrivias, setUserTrivias] = useState<UserTrivia[]>([]);
  const [trivias, setTrivias] = useState<Trivia[]>([])
  const [selectedTrivia, setSelectedTrivia] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [selectedIsUser, setSelectedIsUser] = useState<string | null>(""); // Nuevo estado
  const [loading, setLoading] = useState(true);


  const { main, buttonContainer, volver, volverText, link, titles, title, selectContainer, selectGroup, select, button } = styles

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
    const fetchTrivias = async () => {
      try {
        // Realiza la llamada a la API para obtener las trivias
        const triviasData = await getAllTriviasApi(); // Reemplaza 'fetchTriviasApi' con tu función de llamada a la API real

        // Mapea los datos de las trivias para obtener id y title
        const mappedTrivias = triviasData.map((trivia: any) => ({
          id: trivia.id,
          title: trivia.title,
        }));

        // Almacena las trivias en el estado
        setTrivias(mappedTrivias);
      } catch (error) {
        console.error('Error al obtener las trivias:', error);
      }
    };

    // Llama a la función para cargar las trivias al cargar inicialmente el componente
    fetchTrivias();
  }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const users = await getAllUsersApi();

  //       setUserTrivias(users)
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error al obtener los usuarios:', error);
  //     }

  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Verifica si ya se han cargado los usuarios
        if (allUsers.length === 0) {
          allUsers = await getAllUsersApi();
        }

        // Filtra los usuarios según la trivia seleccionada
        const filteredUsers = allUsers.filter((user: any) => {
          // Verificar si se ha seleccionado una opción de usuario
          if (selectedIsUser === "1" || selectedIsUser === "0") {
            // Verificar si el usuario coincide con la opción seleccionada
            if (user.isUser === Number(selectedIsUser)) {
              // Resto de la lógica de filtrado para trivia y resultado
              if (selectedTrivia && selectedResult) {
                return user.trivias.some(
                  (trivia: any) =>
                    trivia.numeroTrivia === selectedTrivia && trivia.resultado === selectedResult
                );
              }

              if (selectedTrivia) {
                return user.trivias.some((trivia: any) => trivia.numeroTrivia === selectedTrivia);
              }

              if (selectedResult) {
                return user.trivias.some((trivia: any) => trivia.resultado === selectedResult);
              }

              // Si no se seleccionó trivia ni resultado, regresa true para incluir el usuario
              return true;
            }
          } else {
            // Si no se seleccionó una opción de usuario, aplicar el resto de las condiciones
            if (selectedTrivia && selectedResult) {
              return user.trivias.some(
                (trivia: any) =>
                  trivia.numeroTrivia === selectedTrivia && trivia.resultado === selectedResult
              );
            }

            if (selectedTrivia) {
              return user.trivias.some((trivia: any) => trivia.numeroTrivia === selectedTrivia);
            }

            if (selectedResult) {
              return user.trivias.some((trivia: any) => trivia.resultado === selectedResult);
            }

            // Si no se seleccionó ninguna opción de filtro, regresa true para incluir el usuario
            return true;
          }
        });

        setUserTrivias(filteredUsers);
        setLoading(false);
        console.log(filteredUsers)
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, [selectedTrivia, selectedResult, selectedIsUser]);

  const handleTriviaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedTrivia(selectedId);
  };

  const handleResultChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedResult = event.target.value;
    setSelectedResult(selectedResult);
  };

  const handleIsUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIsUser = event.target.value;
    setSelectedIsUser(selectedIsUser);
  };

  if (loading) {
    return (
      <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }


  console.log(selectedTrivia)
  console.log(allUsers)
  return (
    <div className={main}>
      <div className={titles}>
        <div className={buttonContainer}>
          <Link href={"/admin/Trivias"}>
            <a className={link}>
              <div className={volver}>
                <img src="/images/trivias/icono . retroceder.svg" alt="" />
                <div className={volverText}> Volver</div>
              </div>
            </a>
          </Link>
          <button className={button} onClick={downloadCsv} >Descargar CSV</button>
        </div>
        <h2 className={title}>Listados de usuarios</h2>
        <h3>Total de usuarios: {userTrivias.length}</h3>
      </div>

      <div className={selectContainer}>
        <div className={selectGroup}>
          <label htmlFor="triviaSelect">Seleccionar Trivia: </label>
          <select className={select} id="triviaSelect" onChange={handleTriviaChange} value={selectedTrivia || ''}>
            <option value="">Todas las trivias</option>
            {trivias.map((trivia) => (
              <option key={trivia.id} value={String(trivia.id)}>
                {trivia.title}
              </option>
            ))}
          </select>
        </div>

        <div className={selectGroup}>
          <label htmlFor="resultSelect">Seleccionar Nivel de Resultado: </label>
          <select className={select} id="resultSelect" onChange={handleResultChange} value={selectedResult || ''}>
            <option value="">Todos los niveles</option>
            <option value="0">5 respuestas correctas</option>
            <option value="1">3 ó 4 respuestas correctas</option>
            <option value="2">0, 1 ó 2 respuestas correctas</option>
          </select>
        </div>

        <div className={selectGroup}>
          <label htmlFor="isUserSelect">Seleccionar Usuarios:</label>
          <select
            className={select}
            id="isUserSelect"
            onChange={handleIsUserChange}
            value={selectedIsUser || ""}
          >
            <option value="">Todos los usuarios</option>
            <option value="1">Usuarios existentes</option>
            <option value="0">Usuarios no existentes</option>
          </select>
        </div>

      </div>
      <UserTriviaList usersTrivia={userTrivias} />
    </div>
  );
}
export default UsersTrivias;