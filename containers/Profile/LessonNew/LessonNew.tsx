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

const Lesson = () => {
  const context = useAuth();
  const { course, isLoading, tempLesson, open, setOpen } = useCourse();

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
            <Video lesson={tempLesson} user={context.user} />
            <Modules lesson={tempLesson} course={course} />
          </LeftSide>
          <RightSide open={open}>
            <Top course={course} />
            <Progress course={course} user={context.user} />
          </RightSide>
        </MainContainer>}
    </>
  )
}
export default Lesson;