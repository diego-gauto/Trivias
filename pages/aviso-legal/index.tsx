import Legal from "../../components/LegalDocument/Legal";
import { MainContain } from "../../screens/Styles.styled";

const legalDocument = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Legal></Legal>
    </MainContain>
  )
}
export default legalDocument;