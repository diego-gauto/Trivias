import TermsSubscription from '../../components/TemsSubscription/TermsSubscription';
import { MainContain } from '../../screens/Styles.styled';

const termsConditionSub = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <TermsSubscription />
    </MainContain>
  );
};
export default termsConditionSub;
