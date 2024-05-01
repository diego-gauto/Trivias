import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { getCoupons } from '../../../../store/actions/CouponsActions';
import {
  AddText,
  ButtonsDiv,
  Container,
  CouponContain,
  CouponText,
  DiscountText,
  InputInfo,
  ModalContain,
  ModalInput,
  PurpleButton,
  Title,
  TransparentButton,
} from './ModalPurchase1.styled';
import ModalPurchase2 from './ModalPurchase2';

export const ModalPurchase1 = ({
  show,
  setShow,
  handleCoupons,
  userId,
}: any) => {
  const [show2, setShow2] = useState(false);
  const [coupons, setCoupons] = useState<any>([]);
  const [code, setCode] = useState('');
  const getAllCoupons = () => {
    getCoupons().then((res: any) => {
      setCoupons(res);
    });
  };

  const checkCoupon = () => {
    let coupon;
    coupon = coupons.filter((x: any) => x.code == code && x.status);
    if (coupon.length > 0) {
      if (coupon[0].users.includes(userId)) {
        alert('Este cupón ya ha sido canjeado');
      } else {
        coupon[0].users.push(userId);
        handleCoupons(coupon[0]);
        setShow2(true);
        setShow(false);
        setCode('');
      }
    } else {
      alert('Este cupón no existe!');
      handleCoupons();
    }
  };
  useEffect(() => {
    getAllCoupons();
  }, []);
  const handleClose = () => setShow(false);

  return (
    <ModalContain>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>Canjea un cupón</Title>
          {/* <CouponContain>
            <CouponText>
              Gonvair Verano 2022
            </CouponText>
            <DiscountText>
              40% descuento
            </DiscountText>
          </CouponContain> */}
          <InputInfo>
            <AddText>Código del Cupón</AddText>
            <ModalInput
              placeholder='GON22VER'
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </InputInfo>
          <ButtonsDiv>
            <TransparentButton onClick={handleClose}>
              Cancelar
            </TransparentButton>
            <PurpleButton
              onClick={() => {
                checkCoupon();
              }}
            >
              Canjear
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>
      <ModalPurchase2 show={show2} setShow={setShow2} />
    </ModalContain>
  );
};
export default ModalPurchase1;
