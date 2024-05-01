import Support from '../../components/Support/Support';
import { MainContain } from '../../screens/Styles.styled';

const CancelScreen = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <Support></Support>
    </MainContain>
  );
};
export default CancelScreen;
