import { useState } from "react";

import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";

import { addRequest, addUserReward } from "../../store/actions/RewardActions";
import { IRewardModalProps } from "./IRewardModalProps";
import { AlertIcon, RewardModalContainer } from "./RewardModalContainer.styled";

export const RewardModal = (props: IRewardModalProps) => {
  const { show, setShow, reward, user } = props;

  const handleClose = () => setShow(false);

  // START OF COPY CODE
  const [userReward, setUserReward] = useState({
    id: reward.id,
    status: false,
    title: reward.title
  });

  const [request, setRequest] = useState({
    user: user.name,
    userPhoto: user.photoURL,
    points: user.score,
    createAt: new Date(),
    phoneNumber: user.phoneNumber,
    type: reward.type,
    product: reward.title,
    status: false,
  })

  const AddUserRewards = async () => {
    let tempReward = {
      id: reward.id,
      status: true,
      title: reward.title
    }
    addUserReward(tempReward, user.id).then((res: any) => {
      setUserReward(tempReward)
    });
  }

  const sendRequest = async () => {
    let tempRequest = {
      userId: user.id,
      user: user.name,
      userPhoto: user.photoURL,
      points: user.score,
      createAt: new Date(),
      phoneNumber: user.phoneNumber,
      type: reward.type,
      product: reward.title,
      status: false,
    }
    addRequest(tempRequest).then((res: any) => {
      setRequest(res);
    })
  }
  // END OF COPY CODE (anything else is refactored)

  return (
    <RewardModalContainer show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{reward.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} lg={4} className="center">
              <Image fluid src={reward.path} />
            </Col>
            <Col xs={12} lg={8}>
              <p className="about">
                {reward.about}
              </p>
              <p className="warning">
                <AlertIcon />
                Este es un producto físico y requiere entrega
              </p>
              <p className="admin-copy">
                Pronto el administrador se contactará para poder organizar la
                entrega de la recompensa.
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={4} className="center">
              <p className="points">
                Recompensa por <br /> {reward.points} puntos
              </p>
            </Col>
            <Col className="div-button">
              {reward.points <= user.score && (
                <>
                  {reward.status === false && userReward.status === false ? (
                    <Button className="claim-btn" onClick={() => {
                      sendRequest();
                      AddUserRewards();
                    }}>
                      Reclamar recompensa
                    </Button>) :
                    (<span>Recompensa Reclamada</span>)
                  }
                </>
              )}
              <Button className="close-btn" onClick={handleClose}>Entendido</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </RewardModalContainer>
  )
}
