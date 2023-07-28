import { useEffect, useState } from "react";

import Papa from "papaparse";

import UserTriviaList from "../../../../components/admin/Trivias/userTriviaList/userTriviaList";
import { getAllUsersApi } from "../../../../components/api/usertrivia";

interface UserTrivia {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  numeroWhatsapp: string;
  pais: string;
  isUser: boolean;
}

const userTriviasMock = [{
  id: 1,
  nombre: "Diego",
  apellido: "Gauto",
  correo: "diego@gonvar.io",
  whatsApp: "541153137872",
  pais: "Argentina",
  isUser: true,
}, {
  id: 2,
  nombre: "Leonardo",
  apellido: "Contreras",
  correo: "leo@gonvar.io",
  whatsApp: "525528992739",
  pais: "Mexico",
  isUser: true,
}, {
  id: 3,
  nombre: "Victor",
  apellido: "Diseñador",
  correo: "victor@gonvar.io",
  whatsApp: "524621020389",
  pais: "Mexico",
  isUser: false,
}]

const UsersTrivias = () => {
  const [userTrivias, setUserTrivias] = useState<UserTrivia[]>([]);

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
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Listados de usuarios</h2>
      <button onClick={downloadCsv}>Descargar CSV</button>
      <UserTriviaList usersTrivia={userTrivias} />
    </div>
  );
}
export default UsersTrivias;