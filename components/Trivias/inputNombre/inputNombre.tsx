import styles from "./inputNombre.module.css";

const InputNombre = (props: any) => {
  const { inputs } = styles;
  return (
    <div className={inputs}>
      <label htmlFor="nombre">{props.label}</label>
      <input
        type="text"
        placeholder={props.placeholder}
        name="nombre"
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
};

export default InputNombre;
