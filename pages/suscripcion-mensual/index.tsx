import MonthlySuscription from "../../components/MonthlySuscription/MonthlySuscription";
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
      <MonthlySuscription />
    </MainContain>
  )
}
export default termsConditions;