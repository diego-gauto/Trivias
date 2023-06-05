import CancelSuscription from "../../containers/Profile/User/CancelSuscription/CancelSuscription";
import { MainContain } from "../../screens/Styles.styled";

const CancelScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <CancelSuscription></CancelSuscription>

    </MainContain>
  )
}
export default CancelScreen;