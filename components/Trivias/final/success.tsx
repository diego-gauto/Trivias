import Link from "next/link";

import styles from "./success.module.css";

const Success = () => {
  const { failedContainer, recuerda, comienza, centrado, width80 } = styles;

  return (
    <div className={failedContainer}>
      <h1>Busca en tu correo</h1>
      <p>Te recomendamos comenzar con uno de nuestros cursos de uñas y belleza.</p>
      <p>Acá va el componente de la portadas</p>
      <p className={width80}>Recuerda que tenemos más de 60 cursos disponibles para ti.</p>
      <p className={comienza}>¡Comienza tu carrera de Nails Artist hoy!</p>
      <Link href={`/`}>
        <a className={centrado}>
          <button>Comenzar</button>
        </a>
      </Link>
    </div>
  );
};

export default Success;