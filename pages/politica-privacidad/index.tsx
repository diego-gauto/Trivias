import About from "../../components/AboutModal/About";
import { MainContain } from "../../screens/Styles.styled";

const Privacy = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <About></About>
    </MainContain>
  )
}
export default Privacy;