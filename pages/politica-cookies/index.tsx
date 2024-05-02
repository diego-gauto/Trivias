import Cookies from '../../components/cookiesDocument/Cookies';
import { MainContain } from '../../screens/Styles.styled';

const Privacy = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <Cookies></Cookies>
    </MainContain>
  );
};
export default Privacy;
