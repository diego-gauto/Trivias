

import { useState } from "react";

import { SelectContain } from "../../Coupons/Coupons.styled";
import { IconContain, InputContain } from "../../Courses/Form/CourseForm_Create.styled";
import { CaretD2, Label2 } from "../../Courses/Form/Select/SelectStyles.styled";
import { Selected } from "../../Pay/Select/Select.styled";
import Modal1 from "../../Users/UserData/Modal/Modal";
import {
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  FirstBox,
  Info,
  Label,
  OptionRole,
  OptionRoleContain,
  ProfileContain,
  ProfilePic,
  Title,
  TitleContain,
  UserContain,
} from "./AdminDataUpdate.styled";

const AdminDataUpdate = ({ admin, role, setIsVisible }: any) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<boolean>(false);
  const [value, setValue] = useState<any>("");
  console.log(typeof role)


  return (
    <UserContain>
      <TitleContain>
        <FirstBox>
          <Title>Administrador Activo</Title>
        </FirstBox>
        <CloseIcon onClick={() => setIsVisible(false)} />
      </TitleContain>

      <><ProfileContain>
        <ProfilePic />
      </ProfileContain><Columns>
          <ColumnContain>
            <Info>
              Administrador
              <Label>
                {admin.name}
              </Label>
            </Info>
            <Info>
              Puntos
              <Label>
                {admin.score}
              </Label>
            </Info>
            <Info>
              Suscripción Actual
              <Label>
                Gonvar Plus
              </Label>
            </Info>
            <InputContain>
              <Info>Editar rol</Info>
              <IconContain>
                <SelectContain key={1}>
                  <Selected onClick={() => { setOpen(true); setUpdatedRole(true) }}>
                    {updatedRole != true ? (role) : (value)}
                    <CaretD2 />
                  </Selected>
                  {
                    open == true &&
                    <OptionRoleContain>
                      <OptionRole onClick={() => { setValue("admin"); setOpen(false) }}>
                        <input
                          type="radio"
                          id="Temporada1"
                          name="category"
                          value="Temporada 1"
                        />
                        <Label2 >admin</Label2>
                      </OptionRole>
                      <OptionRole onClick={() => { setValue("superAdmin"); setOpen(false) }}>
                        <input
                          type="radio"
                          id="Temporada2"
                          name="category"
                          value="Temporada 2"
                        />
                        <Label2>superAdmin</Label2>
                      </OptionRole>
                    </OptionRoleContain>
                  }
                </SelectContain>
              </IconContain>
            </InputContain>
          </ColumnContain>
          <ColumnContain>
            <Info>
              Correo electrónico
              <Label style={{ overflowWrap: "break-word" }}>
                {admin.email}
              </Label>
            </Info>
            <Info>
              Fecha de Creación
              <Label>
                {admin.created_at}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                {!admin.phoneNumber ? "N/A" : admin.phoneNumber}
              </Label>
            </Info>
          </ColumnContain>
        </Columns><Courses>
        </Courses>
      </>

      <Modal1 show={show} setShow={setShow} />
    </UserContain>
  )
}
export default AdminDataUpdate;