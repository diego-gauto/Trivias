

import { useEffect, useState } from "react";

import { updateRole } from "../../../../store/actions/AdminActions";
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

export type IAdminType = {
  general: boolean;
  pay: boolean;
  courses: boolean;
  rewards: boolean;
  landing: boolean;
  coupons: boolean;
  users: boolean;
  superAdmin: boolean;
};

const AdminDataUpdate = ({ admin, setIsVisible, adminID, role }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<boolean>();
  const [adminType, setAdminType] = useState<IAdminType>({ general: false, pay: false, courses: false, rewards: false, landing: false, coupons: false, users: false, superAdmin: false });
  useEffect(() => {
    const submitChanges = () => {
      //admin.created_at = new Date(admin.created_at.seconds * 1000).toLocaleDateString("es-MX");
      if (!value) return;
      var newRole = "";
      newRole = value;
      var newAdminType = { ...adminType };
      if (value == "superAdmin") {
        newAdminType.superAdmin = true;
        setAdminType(newAdminType)
      };
      let adminData = { ...admin };
      adminData.role = newRole;
      adminData.adminType = newAdminType;

      if (value == admin.role) return;

      updateRole(adminData, adminID).then(() => {
        alert("Rol actualizado correctamente")
        setIsVisible(false)
      });
    }
    submitChanges();
  }, [value]);

  useEffect(() => {
    setUpdatedRole(false);
    if (!admin.adminType) return;
    setCurrentRole(admin.adminType.superAdmin);
  }, [admin]);

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
              <Label>
                Gonvar Plus
              </Label>
            </Info>
            <InputContain>
              <Info>Cambiar rol</Info>
              <IconRoleContain>
                <SelectContain key={1}>
                  <SelectedRoleContain onClick={() => { setOpen(true); setUpdatedRole(true) }}>
                    {updatedRole != true ? (admin.role) : (value)}
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
                          value="Rol admin"
                        />
                        <Label2 >admin</Label2>
                      </OptionRole>
                      <OptionRole onClick={() => { setValue("superAdmin"); setOpen(false) }}>
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
                {/*new Date(admin.created_at.seconds * 1000).toLocaleDateString("es-MX")*/}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                {!admin.phoneNumber ? "N/A" : admin.phoneNumber}
              </Label>
            </Info>
            {!currentRole &&
              <ButtonRoleContain>
                <UpdateButton onClick={() => { setShow(true); }}>Editar acceso</UpdateButton>
              </ButtonRoleContain>
            }
          </ColumnContain>
        </Columns>
        <RoleEdit show={show} setShow={setShow} adminID={adminID} admin={admin} adminType={adminType} role={role} />
      </>

    </UserContain>
  )
}
export default AdminDataUpdate;