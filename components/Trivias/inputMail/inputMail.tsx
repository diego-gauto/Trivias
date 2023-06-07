import styles from "./inputMail.module.css";

const InputMail = (props: any) => {
  const { inputs } = styles;
  return (
    <div className={inputs}>
      <label htmlFor="nombre">{props.label}</label>
      <input
        type="text"
        placeholder={props.placeholder}
        name="nombre"
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputMail;
