import UsersDetails from '../../components/admin/UsersNew/UsersNew';
import { MainContain } from '../../screens/Styles.styled';

const UsersView = () => {
  return (
    <MainContain>
      {/* <UsersList /> */}
      <UsersDetails />
    </MainContain>
  );
};
export default UsersView;
