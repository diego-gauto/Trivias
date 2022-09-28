import { useState } from "react";

import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";

import { rewardType } from "../../interfaces/IReward";
import { addRequest, addUserReward } from "../../store/actions/RewardActions";
import { IRewardModalProps } from "./IRewardModalProps";
import { AlertIcon, RewardModalContainer } from "./RewardModalContainer.styled";

export const RewardModal = (props: IRewardModalProps) => {
  const { show, setShow, reward, user, score, isTimeReward } = props;

  const handleClose = () => setShow(false);

  // START OF COPY CODE
  const [userReward, setUserReward] = useState({
    id: reward.id,
    status: false,
    title: reward.title
  });

  // Request for points reward
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

  // Request for months reward
  const [timeRequest, setTimeRequest] = useState({
    user: user.name,
    userPhoto: user.photoURL,
    month: score,
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

  const sendTimeRequest = async () => {
    let tempRequest = {
      userId: user.id,
      user: user.name,
      userPhoto: user.photoURL,
      month: score,
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

  const getRewardCopy = () => {
    if (reward.month && reward.month > 1) {
      return `${reward.month} meses`;
    } else if (reward.month && reward.month === 1) {
      return `${reward.month} mes`;
    } else if (reward.points && reward.points > 1) {
      return `${reward.points} puntos`;
    } else if (reward.points && reward.points === 1) {
      return `${reward.points} punto`;
    }
    return ""
  }

  const getRewardButtonCopy = () => {
    if (isTimeReward) {
      if (reward.month <= score) {
        if (reward.status === false && userReward.status == false) {
          return <Button className="claim-btn" onClick={() => {
            sendTimeRequest();
            AddUserRewards();
          }}>Reclamar</Button>
        } else {
          return <span>Recompensa reclamada</span>
        }
      }
    } else {
      if (reward.points <= user.score) {
        if (reward.status === false && userReward.status == false) {
          return <Button className="claim-btn" onClick={() => {
            sendRequest();
            AddUserRewards();
          }}>Reclamar</Button>
        } else {
          return <span>Recompensa reclamada</span>
        }
      }
    }
    return ""
  }

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
              {reward.points > score! && (
                <p className="pending">
                  Recompensa por desbloquear
                </p>
              )}
              {reward.month > score! && (
                <p className="pending">
                  Recompensa por desbloquear
                </p>
              )}
              <p className="about">
                {reward.about}
              </p>
              {reward.type === rewardType.physical && (
                <>
                  <p className="warning">
                    <AlertIcon />
                    Este es un producto físico y requiere entrega
                  </p>
                  <p className="admin-copy">
                    Pronto el administrador se contactará para poder organizar la
                    entrega de la recompensa.
                  </p>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={4} className="center">
              <p className="points">
                Recompensa por <br />
                {getRewardCopy()}
              </p>
            </Col>
            <Col className="div-button">
              {getRewardButtonCopy()}
              <Button className="close-btn" onClick={handleClose}>Entendido</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </RewardModalContainer>
  )
}
