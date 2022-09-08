

import { useState } from "react";

import { SubmitHandler } from "react-hook-form";

import { updateRole } from "../../../../store/actions/AdminActions";
import { SelectContain } from "../../Coupons/Coupons.styled";
import { Button, ButtonContain, InputContain } from "../../Courses/Form/CourseForm_Create.styled";
import { CaretD2, Label2 } from "../../Courses/Form/Select/SelectStyles.styled";
import {
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  FirstBox,
  IconRoleContain,
  Info,
  Label,
  OptionRole,
  OptionRoleContain,
  ProfileContain,
  ProfilePic,
  SelectedRoleContain,
  Title,
  TitleContain,
  UserContain,
} from "./AdminDataUpdate.styled";

const AdminDataUpdate = ({ admin, role, setIsVisible, adminID }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<boolean>(false);
  const [value, setValue] = useState<any>("");

  const submitChanges: SubmitHandler<any> = (userValue: { newRole: any; }) => {
    var newRole = ""
    if (value !== undefined && value !== null) {
      newRole = value
    }

    let adminData = {
      data: {
        role: userValue.newRole
      }
    };
    console.log("role updated: ", adminData)

    updateRole(adminData, adminID).then(() => {
      console.log("role updated: ", adminData)
    });

  }

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
              <IconRoleContain>
                <SelectContain key={1}>
                  <SelectedRoleContain onClick={() => { setOpen(true); setUpdatedRole(true) }}>
                    {updatedRole != true ? (role) : (value)}
                    <CaretD2 />
                  </SelectedRoleContain>
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
              </IconRoleContain>
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
            <ButtonContain>
              <Button onClick={submitChanges}>actualizar</Button>
            </ButtonContain>
          </ColumnContain>
        </Columns><Courses>
        </Courses>
      </>

    </UserContain>
  )
}
export default AdminDataUpdate;