import UsersList from "../../components/admin/Users/UsersList";
import Users from "../../components/admin/UsersNew/Users";
import { MainContain } from "../../screens/Styles.styled";

const UsersView = () => {
  return (
    <MainContain>
      {/* <UsersList /> */}
      <Users />
    </MainContain>
  )
}
export default UsersView;