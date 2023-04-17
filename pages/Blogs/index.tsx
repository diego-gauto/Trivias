
import Blog from "../../containers/Profile/Blog/Blog";
import { MainContain } from "../../screens/Styles.styled";

const BlogScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Blog></Blog>

    </MainContain>
  )
}
export default BlogScreen;