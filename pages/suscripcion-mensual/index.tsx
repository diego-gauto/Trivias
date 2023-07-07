import LandingSuscription from "../../components/LandingSuscription/LandingSuscription";
import Terms from "../../components/TermsModal/Terms";
import { MainContain } from "../../screens/Styles.styled";

const termsConditions = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <LandingSuscription />
    </MainContain>
  )
}
export default termsConditions;