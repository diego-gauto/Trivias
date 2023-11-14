import React, { useState } from "react";

import styles from "./option.module.css";

interface OptionComponentProps {
  label: string;
  options: string[];
  onOptionChange: (value: string) => void;
}

interface OptionComponentState {
  selectedOption: string | null;
}

const OptionComponent: React.FC<OptionComponentProps> = ({ label, options, onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { optionContainer, optionsLabel, optionButton, optionLabel } = styles

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value
    setSelectedOption(optionValue);
    onOptionChange(optionValue)
  };

  return (
    <div className={optionContainer}>
      <label className={optionsLabel}>{label}</label>
      {options.map((option, index) => (
        <div className={optionButton} key={index}>
          <input
            type="radio"
            id={option}
            name="options"
            value={option}
            checked={selectedOption === option}
            onChange={handleRadioChange}
          />
          <label className={optionLabel} htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default OptionComponent;
