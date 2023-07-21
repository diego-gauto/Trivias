import LandingSuscription from "../../components/LandingSuscription/LandingSuscription";
import { MainContain } from "../../screens/Styles.styled";

const termsConditions = () => {
  const price = "$1,599 MXN/anual"
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