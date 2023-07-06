import Rewards from "../../containers/Profile/Rewards/Rewards";
import { MainContain } from "../../screens/Styles.styled";

const Landings = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Rewards></Rewards>
    </MainContain>
  )
}
export default Landings;