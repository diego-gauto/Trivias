import React, { useState } from 'react'
import { TrashIcon } from '../Courses/Form/Edit.styled';
import SideBar from '../SideBar';
import { AdminContain, Table } from '../SideBar.styled';
import { Active, ActiveLbl, ButtonContain, Container, CouponContain, IconContain, Input, InputContain, Label, PurpleButton, RadioContain, SelectContain, TableContain, TableTitle, TagLabel, Tags, Title, TitleContain } from './Coupons.styled';
const Coupons = () => {

  const [select, setSelect] = useState("percentage");
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelect(value);
  };
  const [active, setActive] = useState("");
  const handleActive = (e: any) => {
    const value = e.target.value;
    setActive(value);
  };

  return (
    <AdminContain>
      <SideBar />
      <CouponContain>
        <Container>
          <Title>Añadir Cupón</Title>
          <InputContain>
            <Label>Nombre del Cupón</Label>
            <Input placeholder="Nombre del Cupón" />
          </InputContain>
          <InputContain>
            <Label>Código del Cupón</Label>
            <Input placeholder="XXX000" />
          </InputContain>
          <InputContain>
            <Label>Tipo de Descuento</Label>
            <SelectContain>
              <RadioContain>
                <Tags
                  type="radio"
                  name="radio"
                  value="percentage"
                  checked={select === "percentage"}
                  onChange={(e) => handleSelectChange(e)}
                />
                <TagLabel>Porcentaje (%)</TagLabel>
              </RadioContain>
              <RadioContain>
                <Tags
                  type="radio"
                  name="radio"
                  value="absolute"
                  checked={select === "absolute"}
                  onChange={(e) => handleSelectChange(e)}
                />
                <TagLabel>Absoluto ($)</TagLabel>
              </RadioContain>
            </SelectContain>
          </InputContain>
          {
            select == "percentage" &&
            <InputContain>
              <Label>Descuento</Label>
              <Input placeholder="00%" />
            </InputContain>
          }
          {
            select == "absolute" &&
            <InputContain>
              <Label>Descuento</Label>
              <Input placeholder="$ 0.00" />
            </InputContain>
          }

          <ButtonContain>
            <PurpleButton>Agregar Cupón </PurpleButton>
          </ButtonContain>
        </Container>

        <TableContain>
          <TitleContain>
            <TableTitle>Cupones Activos</TableTitle>
          </TitleContain>

          <Table id="Pagos">
            <tr>
              <th>Cupón</th>
              <th>Código</th>
              <th>Descuento</th>
              <th>Activo</th>
              <th></th>
            </tr>
            {/* TABLAS */}
            <tr>
              <td style={{ fontWeight: 600 }}>
                Primavera 2022
              </td>
              <td >SPRN22</td>
              <td>5%</td>
              <td >
                <RadioContain>
                  <Active
                    type="radio"
                    name="activity"
                    value="active"
                    checked={active === "active"}
                    onChange={(e) => handleActive(e)}
                  />
                  <ActiveLbl />
                  <div>Activo</div>
                </RadioContain>
              </td>
              <td>
                <IconContain>
                  <TrashIcon />
                </IconContain>
              </td>
            </tr>
          </Table>
        </TableContain>
      </CouponContain>

    </AdminContain>
  )
}
export default Coupons;