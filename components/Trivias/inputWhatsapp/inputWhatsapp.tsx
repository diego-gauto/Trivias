import React, { useState } from "react";

import PhoneInput from "react-phone-input-2";
import es from "react-phone-input-2/lang/es.json";
import "react-phone-input-2/lib/style.css";

import styles from "./inputWhatsapp.module.css";

const InputPais = (props: any) => {
  const [country, setCountry] = useState("mx");
  // const [number, setNumber] = useState('');
  const [value, setValue] = useState("");

  const { label, formControl, flagDropdown, flagButton } = styles;

  return (
    <div>
      <h3 className={label}>{props.label}</h3>
      <PhoneInput
        inputClass={formControl}
        dropdownClass={flagDropdown}
        buttonClass={flagButton}
        localization={es}
        country={country}
        onChange={props.onChange}
        placeholder={props.placeholder}
        countryCodeEditable={false}
      />
    </div>
  );
};

export default InputPais;
