import { addDoc } from "firebase/firestore";
import React, { useState } from "react";

import LandingObject from "../Landing/templates";
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import {
  AddTitle,
  AllEditInputs,
  ColumnsContainer,
  ColumnsContainer2,
  Container,
  EditButtons,
  EditInput,
  EditInput2,
  EditText,
  FolderInput,
  GeneralContain,
  HomePageContain,
  Inputs,
  OptionsContainer,
  OptionBtn,
  OptionBtnOn,
  ProfileData,
  SaveButton,
} from "./Landing.styled";

const Landing = () => {

  // const addLandingForm = document.querySelector()
  // addLandingForm.addEventListener('submit', (e)=>{
  //   e.preventDefault()
  //   addDoc()
  // })

  const [showTab, setShowTab] = useState(1);
  const [data, setData] = useState(LandingObject);

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
        <Container>
          {
            showTab == 1 &&
            <HomePageContain>
              <OptionsContainer>
                <OptionBtnOn onClick={() => { setShowTab(1); }}>
                  Hero Page
                </OptionBtnOn>
                <OptionBtn onClick={() => { setShowTab(2); }}>
                  Reseñas
                </OptionBtn>
                <OptionBtn onClick={() => { setShowTab(3); }}>
                  Productos <br /> Destacados
                </OptionBtn>
              </OptionsContainer>
              <ProfileData style={{ boxShadow: "none", background: "none" }}>
                <ColumnsContainer2 style={{ width: "100%" }}>
                  <ColumnsContainer>
                    <AllEditInputs>
                      <Inputs>
                        <EditText>
                          Título Inicial
                        </EditText>
                        <EditInput value={data.title} onChange={(e) => setData((prevState) => ({ ...prevState, title: e.target.value }))} placeholder="Aprende a aplicar uñas desde Cero" />
                      </Inputs>
                      <Inputs>
                        <EditText>
                          Párrafo inicial
                        </EditText>
                        <EditInput2 value={data.text} onChange={(e) => setData((prevState) => ({ ...prevState, text: e.target.value }))} style={{ height: "210px" }} placeholder="Descubre tu verdadero potencial a través de nuestros entrenamientos personalizados. En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional. Entrenamientos de primer nivel para lograr resultados extraordinarios." />
                      </Inputs>
                    </AllEditInputs>
                    <AllEditInputs>
                      <Inputs>
                        <EditText>
                          Botón Primario
                        </EditText>
                        <EditInput value={data.primaryBtn} onChange={(e) => setData((prevState) => ({ ...prevState, primaryBtn: e.target.value }))} placeholder="Comienza desde $49" />
                      </Inputs>
                      <Inputs>
                        <EditText>
                          Botón Secundario
                        </EditText>
                        <EditInput value={data.secondaryBtn} onChange={(e) => setData((prevState) => ({ ...prevState, secondaryBtn: e.target.value }))} placeholder="Ve más cursos" />
                      </Inputs>
                      <Inputs>
                        <EditText>
                          Hero Image
                        </EditText>
                        <FolderInput value={data.heroImg} onChange={(e) => setData((prevState) => ({ ...prevState, heroImg: e.target.value }))} placeholder="Seleccionar archivo" />
                      </Inputs>
                    </AllEditInputs>
                    <AllEditInputs>
                      <Inputs>
                        <EditText>
                          Característica 1
                        </EditText>
                        <EditInput value={data.car1} onChange={(e) => setData((prevState) => ({ ...prevState, car1: e.target.value }))} placeholder="+4700 Alumnos" />
                      </Inputs>
                      <Inputs>
                        <EditText>
                          Característica 2
                        </EditText>
                        <EditInput value={data.car2} onChange={(e) => setData((prevState) => ({ ...prevState, car2: e.target.value }))} placeholder="+250 Cursos" />
                      </Inputs>
                      <Inputs>
                        <EditText>
                          Característica 3
                        </EditText>
                        <EditInput value={data.car3} onChange={(e) => setData((prevState) => ({ ...prevState, car3: e.target.value }))} placeholder="+50 Presenciales" />
                      </Inputs>
                    </AllEditInputs>
                  </ColumnsContainer>
                </ColumnsContainer2>
                <EditButtons>
                  <SaveButton>
                    Guardar
                  </SaveButton>
                </EditButtons>
              </ProfileData>
            </HomePageContain>
          }
          {
            showTab == 2 &&
            <HomePageContain>
              <OptionsContainer>
                <OptionBtn onClick={() => { setShowTab(1); }}>
                  Hero Page
                </OptionBtn>
                <OptionBtnOn onClick={() => { setShowTab(2); }}>
                  Reseñas
                </OptionBtnOn>
                <OptionBtn onClick={() => { setShowTab(3); }}>
                  Productos <br /> Destacados
                </OptionBtn>
              </OptionsContainer>
              <ProfileData style={{ boxShadow: "none", background: "none" }}>
                <ColumnsContainer>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Reseñador 1
                      </EditText>
                      <EditInput value={data.rev1} onChange={(e) => setData((prevState) => ({ ...prevState, rev1: e.target.value }))} placeholder="Luke Skywalker" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 1
                      </EditText>
                      <FolderInput value={data.evRev1} onChange={(e) => setData((prevState) => ({ ...prevState, evRev1: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Reseñador 2
                      </EditText>
                      <EditInput value={data.rev2} onChange={(e) => setData((prevState) => ({ ...prevState, rev2: e.target.value }))} placeholder="Obi Wan Kenobi" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 2
                      </EditText>
                      <FolderInput value={data.evRev2} onChange={(e) => setData((prevState) => ({ ...prevState, evRev2: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Reseñador 3
                      </EditText>
                      <EditInput value={data.rev3} onChange={(e) => setData((prevState) => ({ ...prevState, rev3: e.target.value }))} placeholder="Han Solo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 3
                      </EditText>
                      <FolderInput value={data.evRev3} onChange={(e) => setData((prevState) => ({ ...prevState, evRev3: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Reseñador 4
                      </EditText>
                      <EditInput value={data.rev4} onChange={(e) => setData((prevState) => ({ ...prevState, rev4: e.target.value }))} placeholder="Luke Skywalker" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 4
                      </EditText>
                      <FolderInput value={data.evRev4} onChange={(e) => setData((prevState) => ({ ...prevState, evRev4: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Reseñador 5
                      </EditText>
                      <EditInput value={data.rev5} onChange={(e) => setData((prevState) => ({ ...prevState, rev5: e.target.value }))} placeholder="Obi Wan Kenobi" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 5
                      </EditText>
                      <FolderInput value={data.evRev5} onChange={(e) => setData((prevState) => ({ ...prevState, evRev5: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Reseñador 6
                      </EditText>
                      <EditInput value={data.rev6} onChange={(e) => setData((prevState) => ({ ...prevState, rev6: e.target.value }))} placeholder="Han Solo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 6
                      </EditText>
                      <FolderInput value={data.evRev6} onChange={(e) => setData((prevState) => ({ ...prevState, evRev6: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Reseñador 7
                      </EditText>
                      <EditInput value={data.rev7} onChange={(e) => setData((prevState) => ({ ...prevState, rev7: e.target.value }))} placeholder="Luke Skywalker" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 7
                      </EditText>
                      <FolderInput value={data.evRev7} onChange={(e) => setData((prevState) => ({ ...prevState, evRev7: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Reseñador 8
                      </EditText>
                      <EditInput value={data.rev8} onChange={(e) => setData((prevState) => ({ ...prevState, rev8: e.target.value }))} placeholder="Obi Wan Kenobi" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 8
                      </EditText>
                      <FolderInput value={data.evRev8} onChange={(e) => setData((prevState) => ({ ...prevState, evRev8: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Reseñador 9
                      </EditText>
                      <EditInput value={data.rev9} onChange={(e) => setData((prevState) => ({ ...prevState, rev9: e.target.value }))} placeholder="Han Solo" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Evidencia Reseña 9
                      </EditText>
                      <FolderInput value={data.evRev9} onChange={(e) => setData((prevState) => ({ ...prevState, evRev9: e.target.value }))} placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                </ColumnsContainer>
                <EditButtons>
                  <SaveButton>
                    Guardar
                  </SaveButton>
                </EditButtons>
              </ProfileData>
            </HomePageContain>
          }
          {
            showTab == 3 &&
            <HomePageContain>
              <OptionsContainer>
                <OptionBtn onClick={() => { setShowTab(1); }}>
                  Hero Page
                </OptionBtn>
                <OptionBtn onClick={() => { setShowTab(2); }}>
                  Reseñas
                </OptionBtn>
                <OptionBtnOn onClick={() => { setShowTab(3); }}>
                  Productos <br /> Destacados
                </OptionBtnOn>
              </OptionsContainer>
              <ProfileData style={{ boxShadow: "none", background: "none" }}>
                <ColumnsContainer>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Producto 1
                      </EditText>
                      <EditInput value={data.product1} onChange={(e) => setData((prevState) => ({ ...prevState, product1: e.target.value }))} placeholder="Gonvar Nails Leonardo Da Vinci" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Precio
                      </EditText>
                      <EditInput value={data.price1} onChange={(e) => setData((prevState) => ({ ...prevState, price1: e.target.value }))} placeholder="Desde $ 12.00" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Imagen del Producto
                      </EditText>
                      <FolderInput placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Producto 2
                      </EditText>
                      <EditInput value={data.product2} onChange={(e) => setData((prevState) => ({ ...prevState, product2: e.target.value }))} placeholder="Gonvar Nails Leonardo Da Vinci" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Precio
                      </EditText>
                      <EditInput value={data.price2} onChange={(e) => setData((prevState) => ({ ...prevState, price2: e.target.value }))} placeholder="Desde $ 12.00" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Imagen del Producto
                      </EditText>
                      <FolderInput placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Producto 3
                      </EditText>
                      <EditInput value={data.product3} onChange={(e) => setData((prevState) => ({ ...prevState, product3: e.target.value }))} placeholder="Gonvar Nails Leonardo Da Vinci" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Precio
                      </EditText>
                      <EditInput value={data.price3} onChange={(e) => setData((prevState) => ({ ...prevState, price3: e.target.value }))} placeholder="Desde $ 12.00" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Imagen del Producto
                      </EditText>
                      <FolderInput placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                </ColumnsContainer>
                <ColumnsContainer>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Producto 4
                      </EditText>
                      <EditInput value={data.product4} onChange={(e) => setData((prevState) => ({ ...prevState, product4: e.target.value }))} placeholder="Gonvar Nails Leonardo Da Vinci" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Precio
                      </EditText>
                      <EditInput value={data.price4} onChange={(e) => setData((prevState) => ({ ...prevState, price4: e.target.value }))} placeholder="Desde $ 12.00" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Imagen del Producto
                      </EditText>
                      <FolderInput placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Producto 5
                      </EditText>
                      <EditInput value={data.product5} onChange={(e) => setData((prevState) => ({ ...prevState, product5: e.target.value }))} placeholder="Gonvar Nails Leonardo Da Vinci" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Precio
                      </EditText>
                      <EditInput value={data.price5} onChange={(e) => setData((prevState) => ({ ...prevState, price5: e.target.value }))} placeholder="Desde $ 12.00" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Imagen del Producto
                      </EditText>
                      <FolderInput placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                  <ColumnsContainer2>
                    <Inputs>
                      <EditText>
                        Producto 6
                      </EditText>
                      <EditInput value={data.product6} onChange={(e) => setData((prevState) => ({ ...prevState, product6: e.target.value }))} placeholder="Gonvar Nails Leonardo Da Vinci" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Precio
                      </EditText>
                      <EditInput value={data.price6} onChange={(e) => setData((prevState) => ({ ...prevState, price6: e.target.value }))} placeholder="Desde $ 12.00" />
                    </Inputs>
                    <Inputs>
                      <EditText>
                        Imagen del Producto
                      </EditText>
                      <FolderInput placeholder="Seleccionar archivo" />
                    </Inputs>
                  </ColumnsContainer2>
                </ColumnsContainer>
                <EditButtons>
                  <SaveButton>
                    Guardar
                  </SaveButton>
                </EditButtons>
              </ProfileData>
            </HomePageContain>
          }
        </Container>
      </GeneralContain>
    </AdminContain>
  )
}
export default Landing;