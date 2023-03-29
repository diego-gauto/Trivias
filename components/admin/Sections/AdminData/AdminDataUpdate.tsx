

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

type AdminType = {
  general: boolean;
  pay: boolean;
  courses: boolean;
  rewards: boolean;
  landing: boolean;
  coupons: boolean;
  users: boolean;
  superAdmin: boolean;
};

type Props = {
  admin: any;
  setIsVisible: (open: boolean) => void;
  adminID: any;
  role: any;
};

const AdminDataUpdate = ({ admin, setIsVisible, adminID, role }: Props) => {
  const [adminType, setAdminType] = useState<AdminType>({
    general: true,
    pay: false,
    courses: false,
    rewards: false,
    landing: false,
    coupons: false,
    users: false,
    superAdmin: false
  });
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<boolean>();

  useEffect(() => {
    const submitChanges = () => {
      if (!value) return;
      var newAdminType = { ...adminType };
      if (value == "superAdmin") {
        newAdminType.superAdmin = true;
        setAdminType(newAdminType)
      };
      let adminData = { ...admin };
      adminData.adminType = newAdminType;

      if (admin.adminType.superAdmin === adminData.adminType.superAdmin) return;

      updateRole(adminData, adminID).then(() => {
        alert("Rol actualizado correctamente")
        window.location.reload();
      });
    }
    submitChanges();
  }, [value]);

  useEffect(() => {
    setOpen(false);
    if ("adminType" in admin) {
    } else {
      admin.adminType = adminType;
    }
    if (!admin.adminType) return;
    setCurrentRole(admin.adminType.superAdmin);
  }, [admin, show]);

  const formatDate = (value: any) => {
    let tempDate = new Date(value).getTime();
    return new Date(tempDate).toLocaleDateString("es-MX")
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
              <Label>
                Gonvar Plus
              </Label>
            </Info>
            {!currentRole &&
              <InputContain>
                <Info>Cambiar rol</Info>
                {admin.role === 'admin' &&
                  <IconRoleContain>
                    <SelectContain key={1}>
                      <SelectedRoleContain onClick={() => { setOpen(true); if (open) setOpen(false) }}>
                        {!updatedRole && <>{admin.adminType.superAdmin ? ("superAdmin") : ("admin")}</>}
                        {updatedRole && value}
                        <CaretD2 />
                      </SelectedRoleContain>
                      {
                        open &&
                        <OptionRoleContain>
                          <OptionRole onClick={() => { if (confirm("¿Seguro que desea actualizar este usuario a superAdmin?")) setValue("superAdmin"); setOpen(false) }}>
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
                {!admin.phone_number ? "N/A" : admin.phone_number}
              </Label>
            </Info>
            {!currentRole &&
              <ButtonRoleContain style={{ marginTop: "22px" }}>
                <UpdateButton onClick={() => { setShow(true); }}>Editar acceso</UpdateButton>
              </ButtonRoleContain>
            }
          </ColumnContain>
        </Columns>
        {show &&
          <RoleEdit show={show} setShow={setShow} adminID={adminID} admin={admin} role={role} />
        }
      </>
    </UserContain>
  )
}
export default AdminDataUpdate;