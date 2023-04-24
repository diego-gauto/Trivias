

import { useEffect, useState } from "react";
import { updateAdminRole } from "../../../api/admin";
import { SelectContain } from "../../Coupons/Coupons.styled";
import { InputContain } from "../../Courses/Form/CourseForm_Create.styled";
import { CaretD2, Label2 } from "../../Courses/Form/Select/SelectStyles.styled";
import {
  ButtonRoleContain,
  CloseIcon,
  Columns,
  ColumnContain,
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
  UpdateButton,
  UserContain,
} from "./AdminDataUpdate.styled";
import RoleEdit from "./RoleEdit";

type Props = {
  admin: any;
  setIsVisible: (open: boolean) => void;
  adminID: any;
  role: any;
  handleClick: any;
  courses: any
};

const AdminDataUpdate = ({ admin, setIsVisible, adminID, role, handleClick, courses }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const today = new Date().getTime() / 1000;

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
  }

  const updateRole = () => {
    updateAdminRole(admin.user_id).then((res) => {
      handleClick();
      setIsVisible(false);
      setOpen(false);
    })
  }

  const refresh = () => {
    handleClick();
    setIsVisible(false);
    setOpen(false);
  }



  return (
    <UserContain>
      <TitleContain>
        <FirstBox>
          <Title>Administrador Activo</Title>
        </FirstBox>
        <CloseIcon onClick={() => setIsVisible(false)} />
      </TitleContain>
      <>
        <ProfileContain>
          <ProfilePic />
        </ProfileContain>
        <Columns>
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
              {(admin.level > 0 || admin.final_date > today) && <Label>
                Gonvar Plus
              </Label>}
              {(admin.level === 0) && <Label>
                Sin Suscripción
              </Label>}
            </Info>
            {admin.role === 'admin' &&
              <InputContain>
                <Info>Cambiar rol</Info>
                {admin.role === 'admin' &&
                  <IconRoleContain>
                    <SelectContain key={1}>
                      <SelectedRoleContain onClick={() => { setOpen(true); if (open) setOpen(false) }}>
                        {!updatedRole && <>{admin.role === 'superAdmin' ? ("superAdmin") : ("admin")}</>}
                        {updatedRole && value}
                        <CaretD2 />
                      </SelectedRoleContain>
                      {
                        open &&
                        <OptionRoleContain>
                          <OptionRole onClick={() => { if (confirm("¿Seguro que desea actualizar este usuario a superAdmin?")) updateRole(); }}>
                            <input
                              type="radio"
                              id="Temporada2"
                              name="category"
                              value="Rol superAdmin"
                            />
                            <Label2>superAdmin</Label2>
                          </OptionRole>
                        </OptionRoleContain>
                      }
                    </SelectContain>
                  </IconRoleContain>}
              </InputContain>
            }
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
              {admin.created_at &&
                <Label>
                  {formatDate(admin.created_at)}
                </Label>
              }
            </Info>
            <Info>
              Teléfono
              <Label>
                {admin.phone_number === "undefined" ? "N/A" : admin.phone_number}
              </Label>
            </Info>
            {admin.role === 'admin' &&
              <ButtonRoleContain style={{ marginTop: "22px" }}>
                <UpdateButton onClick={() => { setShow(true); }}>Editar acceso</UpdateButton>
              </ButtonRoleContain>
            }
          </ColumnContain>
        </Columns>
        {show &&
          <RoleEdit show={show} setShow={setShow} adminID={adminID} admin={admin} role={role} refresh={refresh} courses={courses} />
        }
      </>
    </UserContain>
  )
}
export default AdminDataUpdate;