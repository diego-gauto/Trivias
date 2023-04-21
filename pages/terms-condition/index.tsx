import Terms from "../../components/TermsModal/Terms";
import Rewards from "../../containers/Profile/Rewards/Rewards";
import { MainContain } from "../../screens/Styles.styled";

const termsConditions = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Terms></Terms>
    </MainContain>
  )
}
export default termsConditions;