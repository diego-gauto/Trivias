import React, { useEffect, useState } from "react";
import { createCoupon, deleteCoupon, getCoupons, updateCoupon } from "../../../store/actions/CouponsActions";
import { addCouponApi, deleteCouponApi, retrieveCoupons, updateCouponStatusApi } from "../../api/admin";

import { TrashIcon } from "../Courses/Form/Edit.styled";
import { AdminContain, Table } from "../SideBar.styled";
import {
  ActiveC,
  ActiveLbl,
  ButtonContain,
  Container,
  CouponContain,
  IconContain,
  Input,
  InputContain,
  Label,
  PurpleButton,
  RadioContain,
  SelectContain,
  TableContain,
  TableTitle,
  TagLabel,
  Title,
  TitleContain,
  UnActive,
  UnActiveLbl,
} from "./Coupons.styled";

const Coupons = () => {

  const [select, setSelect] = useState("percentage");
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelect(value);
  };
  const [coupon, setCoupon] = useState<any>({ name: '', code: '', type: 'porcentage', discount: '', status: true });
  const [coupons, setCoupons] = useState<any>([]);

  const addCoupon = () => {
    if (Object.keys(coupon).some(key => coupon[key] === '')) {
      alert('Por favor acomplete todo los espacios!');
    }
    if (Object.values(coupon).every(value => value !== '')) {
      coupon.discount = parseInt(coupon.discount);
      coupon.users = [];
      addCouponApi(coupon).then(() => {
        alert('Coupon creado con exito!');
        getAllCoupons();
        setCoupon({ name: '', code: '', type: 'porcentage', discount: '', status: true })
      })
    }
  }

  const getAllCoupons = () => {
    retrieveCoupons().then((res) => {
      setCoupons(res.data.coupons);
    })
  }

  const handleActive = (i: any) => {
    let tempCoupons = coupons;
    tempCoupons[i].status = !tempCoupons[i].status;
    setCoupons([...tempCoupons]);
    let tempCoupon = {
      id: tempCoupons[i].id,
      status: tempCoupons[i].status
    }
    updateCouponStatusApi(tempCoupon);
  }

  const deleteThisCoupon = (coupon: any, index: any) => {
    let tempCoupons = coupons;
    tempCoupons.splice(index, 1);
    let tempCoupon = {
      id: coupon.id
    }
    deleteCouponApi(tempCoupon).then(() => {
      alert('Cupón borrado con exito!');
      setCoupons([...tempCoupons]);
    })
  }

  useEffect(() => {
    getAllCoupons();
  }, [])

  return (
    <AdminContain>
      <CouponContain>
        <Container>
          <Title>Añadir Cupón</Title>
          <InputContain>
            <Label>Nombre del Cupón</Label>
            <Input placeholder="Nombre del Cupón" value={coupon.name} onChange={(e) => {
              setCoupon({ ...coupon, name: e.target.value })
            }} />
          </InputContain>
          <InputContain>
            <Label>Código del Cupón</Label>
            <Input placeholder="XXX000" value={coupon.code} onChange={(e) => {
              setCoupon({ ...coupon, code: e.target.value })
            }} />
          </InputContain>
          <InputContain>
            <Label>Tipo de Descuento</Label>
            <SelectContain>
              <TagLabel>Porcentaje (%)
                <input
                  type="radio"
                  name="radio"
                  value="percentage"
                  checked={select === "percentage"}
                  onChange={(e) => { handleSelectChange(e), setCoupon({ ...coupon, type: 'porcentage', discount: '' }) }}
                />
                <span></span>
              </TagLabel>
              <TagLabel>Absoluto ($)
                <input
                  type="radio"
                  name="radio"
                  value="absolute"
                  checked={select === "absolute"}
                  onChange={(e) => { handleSelectChange(e), setCoupon({ ...coupon, type: 'amount', discount: '' }) }}
                />
                <span></span>
              </TagLabel>
            </SelectContain>
          </InputContain>
          {
            select == "percentage" &&
            <InputContain>
              <Label>Descuento</Label>
              <Input placeholder="00%" value={coupon.discount} onChange={(e) => {
                setCoupon({ ...coupon, discount: e.target.value })
              }} />
            </InputContain>
          }
          {
            select == "absolute" &&
            <InputContain>
              <Label>Descuento</Label>
              <Input placeholder="$ 0.00" value={coupon.discount} onChange={(e) => {
                setCoupon({ ...coupon, discount: e.target.value })
              }} />
            </InputContain>
          }

          <ButtonContain>
            <PurpleButton onClick={addCoupon}>Agregar Cupón </PurpleButton>
          </ButtonContain>
        </Container>

        <TableContain>
          <TitleContain>
            <TableTitle>Cupones Activos</TableTitle>
          </TitleContain>

          <Table id="Coupons">
            <tbody>
              <tr>
                <th>Cupón</th>
                <th>Código</th>
                <th>Descuento</th>
                <th>Activo</th>
                <th></th>
              </tr>
              {/* TABLAS */}
              {coupons.map((x: any, index: any) => {
                return (
                  <tr key={'coupons-' + index}>
                    <td style={{ fontWeight: 600 }}>
                      {x.name}
                    </td>
                    <td >{x.code}</td>
                    {x.type == 'porcentage' ? <td>{x.discount}%</td> : <td>${x.discount}</td>}
                    <td style={{ cursor: "pointer" }} onClick={() => { handleActive(index) }}>
                      {
                        x.status ?
                          <RadioContain>
                            <ActiveC>
                              <div />
                            </ActiveC>
                            <ActiveLbl>Activo</ActiveLbl>
                          </RadioContain> :
                          <RadioContain>
                            <UnActive />
                            <UnActiveLbl>Desactivado</UnActiveLbl>
                          </RadioContain>
                      }
                    </td>
                    <td>
                      <IconContain>
                        <TrashIcon onClick={() => { deleteThisCoupon(x, index) }} />
                      </IconContain>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </TableContain>
      </CouponContain>

    </AdminContain>
  )
}
export default Coupons;