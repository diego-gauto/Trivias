import React, { useState } from "react";

import PhoneInput from "react-phone-input-2";
import es from "react-phone-input-2/lang/es.json";
import "react-phone-input-2/lib/style.css";

import styles from "./inputWhatsapp.module.css";

const InputPais = (props: any) => {
  const [country, setCountry] = useState("mx");
  const [countryName, setCountryName] = useState("");
  const [value, setValue] = useState("");

  const { label, formControl, flagDropdown, flagButton, PhoneInputGroup } = styles;

  const handleChange = (value: any, selectedCountry: any) => {
    setCountry(selectedCountry.countryCode);

    const selectedCountryName = (es as Record<string, string>)[selectedCountry.countryCode];
    if (selectedCountryName) {
      setCountryName(selectedCountryName);
    }

    // Pasa el valor ingreso del numero de WA y del país seleccionado al componente padre
    props.onChange(value, selectedCountryName, selectedCountry.countryCode);
  };

  return (
    <div className={PhoneInputGroup}>
      <h3 className={label}>{props.label}</h3>
      <PhoneInput
        inputClass={formControl}
        dropdownClass={flagDropdown}
        buttonClass={flagButton}
        localization={es}
        country={country}
        onChange={handleChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        countryCodeEditable={false}
      />
    </div>
  );
};

export default InputPais;
