import styles from "./inputCP.module.css";

const InputCP = (props: any) => {
  const { inputs } = styles;
  const { label, disabled, placeholder, value, onChange, onBlur } = props;

  return (
    <div className={inputs}>
      <label htmlFor='cp'>{label}</label>
      <input
        type='text'
        placeholder={placeholder}
        name='cp'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default InputCP;
