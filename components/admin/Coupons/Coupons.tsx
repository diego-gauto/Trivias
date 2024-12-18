import React, { useEffect, useState } from 'react';
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from '../../../store/actions/CouponsActions';
import {
  addCouponApi,
  deleteCouponApi,
  getGenericQueryResponse,
  ICoupon,
  retrieveCoupons,
  updateCouponStatusApi,
} from '../../api/admin';
import { getUserApi } from '../../api/users';

import { TrashIcon } from '../Courses/Form/Edit.styled';
import { AdminContain, Table } from '../SideBar.styled';
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
} from './Coupons.styled';
import {
  Role,
  UserLevelValue,
} from '../../GenericQueries/UserRoles/UserRolesInterfaces';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../GenericQueries/UserRoles/UserRolesQueries';

interface UserAccesss {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

const Coupons = () => {
  const [select, setSelect] = useState('percentage');
  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelect(value);
  };
  const [coupon, setCoupon] = useState<ICoupon | null>(null);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [userAccess, setUserAccess] = useState<UserAccesss>({
    canView: false,
    canCreate: false,
    canDelete: false,
    canEdit: false,
  });
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const { canCreate, canDelete, canEdit, canView } = userAccess;

  const getUserData = async () => {
    try {
      const email = localStorage.getItem('email');
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const role = userRoles.find((role) => role.role === 'coupons');
      setUserAccess({
        canView: role?.view === 1,
        canEdit: role?.edit === 1,
        canDelete: role?.delete === 1,
        canCreate: role?.create === 1,
      });
      // Role level
      const userLevelQuery = generateUserRolesLevelQuery(userId);
      const userLevelResponse = await getGenericQueryResponse(userLevelQuery);
      const userRoleLevel = userLevelResponse.data.data[0]['role'];
      setUserLevel(userRoleLevel);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const addCoupon = () => {
    if (userLevel === 'admin' && canCreate) {
      alert('No tienes permisos para esta acción');
      return;
    }
    if (coupon === null) {
      return;
    }
    if (Object.keys(coupon).some((key) => key in coupon)) {
      alert('Por favor acomplete todo los espacios!');
    }
    if (Object.values(coupon).every((value) => value !== undefined)) {
      coupon.users = [];
      addCouponApi(coupon).then(() => {
        alert('Coupon creado con exito!');
        getAllCoupons();
        setCoupon(null);
      });
    }
  };

  const getAllCoupons = async () => {
    try {
      const res = await retrieveCoupons();
      setCoupons(res.data.coupons);
    } catch (error) {
      console.error(error);
    }
  };

  const handleActive = (index: number) => {
    if (userLevel === 'admin' && canEdit) {
      alert('No tienes permisos para esta acción');
      return;
    }
    let tempCoupons = [...coupons];
    tempCoupons[index]!.status = tempCoupons[index]!.status === 1 ? 0 : 1;
    setCoupons([...tempCoupons]);
    let tempCoupon = {
      id: tempCoupons[index]!.id,
      status: tempCoupons[index]!.status,
    };
    updateCouponStatusApi(tempCoupon);
  };

  const deleteThisCoupon = (coupon: ICoupon, index: number) => {
    if (userLevel === 'admin' && canDelete) {
      alert('No tienes permisos para esta acción');
      return;
    }
    let tempCoupons = coupons;
    tempCoupons.splice(index, 1);
    let tempCoupon = {
      id: coupon.id,
    };
    deleteCouponApi(tempCoupon).then(() => {
      alert('Cupón borrado con exito!');
      setCoupons([...tempCoupons]);
    });
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  return (
    <AdminContain>
      <CouponContain>
        {canCreate && userLevel === 'admin' && (
          <Container>
            <Title>Añadir Cupón</Title>
            <InputContain>
              <Label>Nombre del Cupón</Label>
              <Input
                placeholder='Nombre del Cupón'
                value={coupon !== null ? coupon.name : ''}
                onChange={(e) => {
                  if (coupon !== null) {
                    setCoupon({ ...coupon, name: e.target.value });
                  }
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Código del Cupón</Label>
              <Input
                placeholder='XXX000'
                value={coupon !== null ? coupon.code : ''}
                onChange={(e) => {
                  if (coupon !== null) {
                    setCoupon({ ...coupon, code: e.target.value });
                  }
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Tipo de Descuento</Label>
              <SelectContain>
                <TagLabel>
                  Porcentaje (%)
                  <input
                    type='radio'
                    name='radio'
                    value='percentage'
                    checked={select === 'percentage'}
                    onChange={(e) => {
                      handleSelectChange(e);
                      if (coupon !== null) {
                        setCoupon({
                          ...coupon,
                          type: 'porcentage',
                          discount: 0,
                        });
                      }
                    }}
                  />
                  <span></span>
                </TagLabel>
                <TagLabel>
                  Absoluto ($)
                  <input
                    type='radio'
                    name='radio'
                    value='absolute'
                    checked={select === 'absolute'}
                    onChange={(e) => {
                      handleSelectChange(e);
                      if (coupon !== null) {
                        setCoupon({ ...coupon, type: 'amount', discount: 0 });
                      }
                    }}
                  />
                  <span></span>
                </TagLabel>
              </SelectContain>
            </InputContain>
            {select == 'percentage' && (
              <InputContain>
                <Label>Descuento</Label>
                <Input
                  placeholder='00%'
                  value={coupon !== null ? coupon.discount : ''}
                  onChange={(e) => {
                    if (coupon !== null) {
                      setCoupon({
                        ...coupon,
                        discount: parseInt(e.target.value),
                      });
                    }
                  }}
                />
              </InputContain>
            )}
            {select == 'absolute' && (
              <InputContain>
                <Label>Descuento</Label>
                <Input
                  placeholder='$ 0.00'
                  value={coupon !== null ? coupon.discount : ''}
                  onChange={(e) => {
                    if (coupon !== null) {
                      setCoupon({
                        ...coupon,
                        discount: parseInt(e.target.value),
                      });
                    }
                  }}
                />
              </InputContain>
            )}

            <ButtonContain>
              <PurpleButton onClick={addCoupon}>Agregar Cupón </PurpleButton>
            </ButtonContain>
          </Container>
        )}

        <TableContain>
          <TitleContain>
            <TableTitle>Cupones Activos</TableTitle>
          </TitleContain>
          <Table id='Coupons'>
            <thead>
              <tr>
                <th>Cupón</th>
                <th>Código</th>
                <th>Descuento</th>
                <th>Activo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* TABLAS */}
              {coupons.map((coupon: any, index) => {
                return (
                  <tr key={'coupons-' + index}>
                    <td style={{ fontWeight: 600 }}>{coupon.name}</td>
                    <td>{coupon.code}</td>
                    {coupon.type == 'porcentage' ? (
                      <td>{coupon.discount}%</td>
                    ) : (
                      <td>${coupon.discount}</td>
                    )}
                    <td
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (
                          (userLevel === 'admin' && canEdit) ||
                          userLevel === 'superAdmin'
                        ) {
                          handleActive(index);
                        } else {
                          alert('No tiene permiso para editar los registros');
                        }
                      }}
                    >
                      {coupon.status ? (
                        <RadioContain>
                          <ActiveC>
                            <div />
                          </ActiveC>
                          <ActiveLbl>Activo</ActiveLbl>
                        </RadioContain>
                      ) : (
                        <RadioContain>
                          <UnActive />
                          <UnActiveLbl>Desactivado</UnActiveLbl>
                        </RadioContain>
                      )}
                    </td>
                    <td>
                      <IconContain>
                        <TrashIcon
                          onClick={() => {
                            if (
                              (userLevel === 'admin' && canDelete) ||
                              userLevel === 'superAdmin'
                            ) {
                              deleteThisCoupon(coupon, index);
                            } else {
                              alert('No tiene permiso para remover cupones');
                            }
                          }}
                        />
                      </IconContain>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableContain>
      </CouponContain>
    </AdminContain>
  );
};
export default Coupons;
