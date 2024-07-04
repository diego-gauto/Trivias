

import { useState } from "react";

import styles from "./selectState.module.css";

const estadosMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Coahuila", "Colima", "Ciudad de México", "Durango", "Guanajuato",
  "Guerrero", "Hidalgo", "Jalisco", "Estado de México", "Michoacán", "Morelos",
  "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
  "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala",
  "Veracruz", "Yucatán", "Zacatecas"
];

const SelectState = (props: any) => {
  const { inputs, active } = styles;
  const { label, value, onChange, onBlur } = props;

  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  // const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
  //   setIsActive(false);
  //   if (onBlur) {
  //     onBlur(event);
  //   }
  // };

  return (
    <div className={inputs}>
      <label htmlFor='estado'>{label}</label>
      <select
        name='estado'
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={onBlur}
        className={isActive ? active : ''}
      >
        <option value="" disabled>Selecciona un estado</option>
        {estadosMexico.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectState;