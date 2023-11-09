import Assignments from "../../components/admin/Assignments/Assignments";
import HomeWork from "../../components/admin/HomeWork/HomeWork";
import { MainContain } from "../../screens/Styles.styled";

const homeWorksView = () => {
  return (
    <MainContain>
      <HomeWork />
      {/* <Assignments /> */}
    </MainContain>
  )
}
export default homeWorksView;