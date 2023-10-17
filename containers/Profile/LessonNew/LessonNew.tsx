import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { HamburgerContainer, LeftSide, MainContainer, RightSide } from "./LessonNew.styled";
import { useCourse } from "../../../hooks/useLesson";
import Video from "./components/Video/Video";
import Modules from "./components/Modules/Modules";
import Top from "./components/Top/Top";
import Progress from "./components/Progress/Progress";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "./components/Menu/Menu";
import ActivityModal from "./ActivityModal/ActivityModal";

const Lesson = () => {
  const context = useAuth();
  const { course, isLoading, tempLesson, open, setOpen } = useCourse();
  const [show, setShow] = useState(false);
  return (
    <>
      {isLoading ? <Background style={{ justifyContent: "center", alignItems: "center" }}>
        <LoaderImage >
          <LoaderContain />
        </LoaderImage>
      </Background> :
        <MainContainer>
          <LeftSide>
            <div className='nav-course'>
              <img src="/images/Navbar/NavbarLogo2.png" alt="" />
              <HamburgerContainer>
                {!open ? <GiHamburgerMenu onClick={() => {
                  setOpen(!open)
                }}></GiHamburgerMenu> :
                  <AiOutlineClose onClick={() => {
                    setOpen(!open)
                  }}></AiOutlineClose>}
                <p>Lecciones</p>
              </HamburgerContainer>
            </div>
            <Video actualLesson={tempLesson} user={context.user} course={course} openModal={() => { setShow(true) }} />
            <Modules lesson={tempLesson} course={course} />
          </LeftSide>
          <RightSide open={open}>
            <Top course={course} />
            <Progress course={course} user={context.user} />
            <Menu course={course} user={context.user} />
          </RightSide>
          <ActivityModal show={show} setShow={() => { setShow(false) }} lesson={tempLesson} />
        </MainContainer>}
    </>
  )
}
export default Lesson;