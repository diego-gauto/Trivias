import ThankYouFormDist from "../../../components/Forms/thankyou/thankYou-dist";
import { MainContain } from "../../../screens/Styles.styled";

const formThankYouPage = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <ThankYouFormDist />
    </MainContain>
  );
};
export default formThankYouPage;
