import LandingSuscription from "../../components/LandingSuscription/LandingSuscription";
import Terms from "../../components/TermsModal/Terms";
import { MainContain } from "../../screens/Styles.styled";

const termsConditions = () => {
  const price = "$1,599 mxn/anual"
  const month = false;
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <LandingSuscription price={price} isMonth={month} />
    </MainContain>
  )
}
export default termsConditions;