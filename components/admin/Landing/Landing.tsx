

import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import {
  AddText,
  AddTextContainer,
  AddTitle,
  GeneralContain,
  GonvarText,
  HeaderMenu,
  OptionsContainer,
  OptionBtn,
} from "./Landing.styled";

const Landing = () => {
  return (
    <AdminContain>
      <SideBar />
      <GeneralContain>
        <HeaderMenu>
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
        </HeaderMenu>
        <AddTitle>
          HomePage
        </AddTitle>
        <OptionsContainer>
          <OptionBtn>
            Hero Page
          </OptionBtn>
          <OptionBtn>
            Reseñas
          </OptionBtn>
          <OptionBtn>
            Productos <br /> Destacados
          </OptionBtn>
        </OptionsContainer>
      </GeneralContain>
    </AdminContain>
  )
}
export default Landing;