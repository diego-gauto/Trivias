import { useState } from "react";

import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import { AddTitle, Container, GeneralContain, OptionsContainer, OptionBtn } from "./Landing.styled";
import HeroPage from "./Tabs/HeroPage";

const Landing = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <AdminContain>
      <SideBar />
      <GeneralContain>
        {/* <HeaderMenu>
          <GonvarText style={{ marginLeft: "5%" }}>
            Admin User
          </GonvarText>
          <AddTextContainer>
            <AddText style={{ fontWeight: "800" }}>
              Textos Dinámicos
            </AddText>
            <AddText>
              Usuarios
            </AddText>
            <AddText>
              Ventas
            </AddText>
            <AddText>
              Cupones
            </AddText>
          </AddTextContainer>
        </HeaderMenu> */}
        <AddTitle>
          HomePage
        </AddTitle>
        <OptionsContainer>
          <OptionBtn onClick={handleShow}>
            Hero Page
          </OptionBtn>
          <OptionBtn>
            Reseñas
          </OptionBtn>
          <OptionBtn>
            Productos <br /> Destacados
          </OptionBtn>
        </OptionsContainer>
        <Container >
          <HeroPage />
        </Container>
      </GeneralContain>
    </AdminContain>
  )
}
export default Landing;