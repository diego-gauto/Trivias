

import { useState } from "react";

import { updateRole } from "../../../../store/actions/AdminActions";
import { SelectContain } from "../../Coupons/Coupons.styled";
import { InputContain } from "../../Courses/Form/CourseForm_Create.styled";
import { CaretD2, Label2 } from "../../Courses/Form/Select/SelectStyles.styled";
import {
  ButtonRoleContain,
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
  UpdateButton,
  UserContain,
} from "./AdminDataUpdate.styled";

type RoleValues = {
  role: string;
  newRole: string;
  created_at: Date;
  email: string;
  membership: {
    finalDate: string;
    level: number;
    method: string;
    paymentMethod: {
      brand: string;
      card: string;
      last4: string;
      month: string;
      year: string;
    }
    planId: string;
    planName: string;
  }
  name: string;
  phoneNumber: string;
  photoURL: string;
  provider: string;
  score: number;
  stripeId: string;
  uid: string;
};

const AdminDataUpdate = ({ admin, role, setIsVisible, adminID }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updatedRole, setUpdatedRole] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const submitChanges = (userValue: RoleValues) => {
    var newRole = ""
    console.log("UserValue: ", userValue)
    if (value !== undefined && value !== null) {
      newRole = value
    }

    let adminData = {
      data: {
        created_at: userValue.created_at,
        role: newRole,
        email: userValue.email,
        membership: {
          finalDate: userValue.membership.finalDate,
          level: userValue.membership.level,
          method: userValue.membership.method,
          paymentMethod: {
            brand: userValue.membership.paymentMethod.brand,
            card: userValue.membership.paymentMethod.card,
            last4: userValue.membership.paymentMethod.last4,
            month: userValue.membership.paymentMethod.month,
            year: userValue.membership.paymentMethod.year,
          },
          planId: userValue.membership.planId,
          planName: userValue.membership.planName,
        },
        name: userValue.name,
        phoneNumber: userValue.phoneNumber,
        photoURL: userValue.photoURL,
        provider: userValue.provider,
        score: userValue.score,
        stripeId: userValue.stripeId,
        uid: userValue.uid,
      }
    };
    console.log("role updated: ", adminData)
    console.log("original: ", admin)

    updateRole(adminData, adminID).then(() => {
      console.log("role updated: ", adminData)
      window.location.href = "/admin/Sections";
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
            <ButtonRoleContain>
              <UpdateButton onClick={() => submitChanges(admin)}>actualizar</UpdateButton>
            </ButtonRoleContain>
          </ColumnContain>
        </Columns><Courses>
        </Courses>
      </>

    </UserContain>
  )
}
export default AdminDataUpdate;