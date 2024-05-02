import React, { useState } from 'react';

import styles from './option.module.css';

interface Answer {
  label: string;
  value: string;
}

interface OptionComponentProps {
  label: string;
  options: Answer[];
  onOptionChange: (value: string) => void;
  isVisible: boolean; // Nueva prop para controlar la visibilidad
}

interface OptionComponentState {
  selectedOption: string | null;
}

interface DisplayContentProps {
  content: string;
}

const OptionComponent: React.FC<OptionComponentProps> = ({
  label,
  options,
  onOptionChange,
  isVisible,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const {
    optionContainer,
    optionsLabel,
    optionButton,
    optionLabel,
    customRadioButton,
  } = styles;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    onOptionChange(optionValue);
  };

  const handleCustomButtonClick = (option: Answer) => {
    setSelectedOption(option.value);
    onOptionChange(option.value);
  };

  const displayContent = ({ content }: DisplayContentProps) => {
    // Función para sanitizar la cadena HTML
    const sanitizeHTML = (html: string): { __html: string } => {
      return { __html: html };
    };

    return <div dangerouslySetInnerHTML={sanitizeHTML(content)} />;
  };

  if (!isVisible) {
    return null; // Si no es visible, no renderizar nada
  }

  return (
    <div className={optionContainer}>
      <label className={optionsLabel}>
        {displayContent({ content: label })}
      </label>
      {options.map((option, index) => (
        <div className={optionButton} key={index}>
          <input
            type='radio'
            id={option.value}
            name={`${label}-options`}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleRadioChange}
          />
          {/* <span
            className={customRadioButton}
            onClick={() => handleCustomButtonClick(option)}
            role="button"
            tabIndex={0}>
          </span> */}
          <label
            className={optionLabel}
            htmlFor={option.value}
            onClick={() => handleCustomButtonClick(option)}
          >
            {/* {option.split("111").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))} */}
            {displayContent({ content: option.label })}
          </label>
        </div>
      ))}
    </div>
  );
};

export default OptionComponent;
