import { InstructionsComponent } from './Rewards.styled';

export const Instructions = () => {
  return (
    <InstructionsComponent>
      <p>Indicaciones: </p>
      <ul>
        <li>
          Si se coloca el mes de 0 el beneficio se podra cobrar desde que compro
          membresia una unica vez.
        </li>
        <li>
          Si se coloca el mes de -1 el beneficio se podra cobrar 1 vez al mes
          del 1 al 10 de cada inicio de mes
        </li>
        <li>
          Pero si se coloca el mes arriba del 0 (ej. 1, 4 , 7) la recompensa se
          podra cobrar al pasar esa cantidad de meses.
        </li>
      </ul>
    </InstructionsComponent>
  );
};
