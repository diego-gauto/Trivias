

import ThankYouForm from "../../../components/Forms/thankyou/thankYou";
import { MainContain } from "../../../screens/Styles.styled";

const formThankYouPage = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <ThankYouForm />
    </MainContain>
  )
}
export default formThankYouPage;