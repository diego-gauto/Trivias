import Link from "next/link";

import styles from "./selectorTrivias.module.css";

const SelectorTrivias = () => {

  const { container, buttonContainer, button } = styles

  return (
    <div className={container}>
      <div className={buttonContainer}>

        <Link href="/admin/trivias/trivias">
          <a>
            <button className={button}>Admin Trivias</button>
          </a>
        </Link>

        <p>Creación y edición de trivias</p>
      </div>
      <div className={buttonContainer}>

        <Link href="/admin/trivias/users">
          <a>
            <button className={button}>Listados de usuarios</button>
          </a>
        </Link>

        <p>Listados de usuarios que hayan jugado a las trivias</p>
      </div>
    </div>
  );
}
export default SelectorTrivias;