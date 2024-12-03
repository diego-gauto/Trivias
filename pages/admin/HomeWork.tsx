import Assignments from '../../components/admin/Assignments/Assignments';
// import HomeWork from '../../components/admin/HomeWork/HomeWork';
import { NewHomeworks } from '../../components/admin/HomeWork/HomeWorkNew';

import { MainContain } from '../../screens/Styles.styled';

const homeWorksView = () => {
  return (
    <MainContain>
      <NewHomeworks />
      {/* <Assignments /> */}
    </MainContain>
  );
};
export default homeWorksView;
