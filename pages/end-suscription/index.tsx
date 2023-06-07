import CancelFinal from "../../containers/Profile/User/CancelFinal/CancelFinal";
import { MainContain } from "../../screens/Styles.styled";

const CancelScreen = () => {
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <CancelFinal></CancelFinal>

    </MainContain>
  )
}
export default CancelScreen;