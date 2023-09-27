import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { ChangePlanModalContain } from "./ChangePlanModal.styled";
import { IUser } from "../../../interfaces/IUserData";
import { updateConektaCustomerInfo } from "../../api/profile";


interface IModal {
  user: IUser;
  show: boolean;
  onHide: () => void;
}
const ChangePlanModal = (props: IModal) => {
  const { show, onHide, user } = props;

  console.log(user);

  const update = () => {
    if (user.method === "conekta") {
      let body = {
        conekta_id: user.conekta_id,
        plan_id: "anual"
      }
      updateConektaCustomerInfo(body).then((res) => {
        console.log(res);
      })
    } else {
      console.log(1);

    }
  }

  return (
    <Modal show={show} onHide={onHide} centered >
      <ChangePlanModalContain>
        <p>
          Desea cambiar su plan mensual a anual?
        </p>
        <IoClose className='close-icon' onClick={onHide} />
        <div className="buttons-container">
          <button className="left" onClick={update}>Cambiar a Anualidad</button>
          <button className="right" onClick={onHide}>Mantener membresia actual</button>
        </div>
      </ChangePlanModalContain>
    </Modal>
  )
}
export default ChangePlanModal;