import NotFoundForm from "../../../components/Forms/notfound/notfound";
import { MainContain } from "../../../screens/Styles.styled";

const formThankYouPage = () => {
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}
    >
      <NotFoundForm />
    </MainContain>
  );
};
export default formThankYouPage;
