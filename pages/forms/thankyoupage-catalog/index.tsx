import ThankYouFormStore from "../../../components/Forms/thankyou/thankYou-store";
import { MainContain } from "../../../screens/Styles.styled";

const formThankYouPageStore = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <ThankYouFormStore
        type="catalog"
      />
    </MainContain>
  );
};
export default formThankYouPageStore;
