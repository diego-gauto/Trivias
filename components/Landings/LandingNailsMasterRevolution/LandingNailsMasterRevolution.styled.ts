import styled from "styled-components";

export const SuscriptionContain = styled.div`
  width: 100%;
  overflow-x: hidden;
  color: #3f1168;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  button {
    &:hover {
      opacity: 0.7;
    }
  }
  .yellow {
    color: #ff9c00;
  }
  .light-p {
    color: #952cee;
  }
  .fechas {
    margin-bottom: 100px;
  }
  .bolder {
    font-weight: 800 !important;
  }
  .bold {
    font-weight: 700;
  }
  .no-bold {
    font-weight: unset;
  }
  .materials-modal {
    width: 100%;
    .end {
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
    }
    .title {
      margin-bottom: 15px;
      font-weight: 800;
    }
    .subtitle {
      margin-bottom: 15px;
      font-weight: 700;
    }
    .materials-list {
      display: flex;
      padding: 20px;
      .materials-column {
        width: 33%;
        display: flex;
        flex-direction: column;
        .icon-row {
          width: 90%;
          display: flex;
          align-items: flex-start;
          height: fit-content;
          img {
            margin-top: 5px;
            margin-right: 10px;
          }
          p {
            text-align: start;
            font-weight: 500;
            font-size: 18px;
          }
        }
      }
    }
    .materials-footer {
      margin-bottom: 20px;
      .tip {
        width: 90%;
        margin-block: 15px;
        font-style: italic;
        color: #952cee;
        font-size: 20px;
      }
    }
    .icon {
      cursor: pointer;
      width: 40px;
      height: 40px;
    }
  }

  .section {
    width: 100%;
    position: relative;
    margin-top: 75px;
    margin-bottom: 75px;
    .extra-margin {
      margin-top: 20px;
    }
    .big-text {
      font-size: 90px;
    }
    .left-img {
      min-width: 420px;
      width: 43%;
      z-index: -1;
      position: absolute;
      transform: translate(0px, -40px);
      left: 0;
    }
    .right-img-1 {
      min-width: 350px;
      width: 34%;
      z-index: -1;
      position: absolute;
      right: 0;
      transform: translateY(-460px);
    }
    .right-img-2 {
      min-width: 340px;
      width: 30%;
      z-index: -1;
      position: absolute;
      transform: translateY(-115px);
      right: 0;
    }
  }
  .stars {
    height: 40px;
  }

  .space {
    margin-block: 25px;
  }
  .p-pink {
    color: #d244d1;
  }
  .all-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .big-title {
    font-size: 75px;
  }
  .btn {
    color: white;
    padding: 10px;
    border: none;
    border-radius: 50px;
    padding-inline: 40px;
    font-size: 20px;
    font-weight: 700;
    background-color: #3f1168;
    &.left-right {
      background-image: linear-gradient(to right, #9e2fea, #c940d7);
    }
    &.up-down {
      background-image: linear-gradient(to top, #9e2fea, #c940d7);
    }
  }

  .info {
    width: 100%;
    position: relative;
    padding-block: 75px;
    .bottom-l {
      width: 100%;
      z-index: -1;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .info-top {
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        text-align: start;
        h2 {
          .subtitle {
            font-size: x-large;
            font-weight: unset;
          }
        }
        .uñas {
          max-width: 600px;
          display: flex;
          gap: 15px;
          .uñas-q {
            display: flex;
            gap: 15px;
            flex-direction: column;
            .uñas-q-container {
              transition: 0.3s ease;
              overflow: hidden;
              max-height: 55px;
              cursor: pointer;
              width: 100%;
              padding: 12px;
              border: none;
              border-radius: 14px;
              background-color: #ece7f2;
              .q {
                align-items: center;
                display: flex;
                justify-content: space-between;
              }
              .icon {
                margin-bottom: 15px;
                border-radius: 100%;
                background-color: #3f1168;
                color: #ffffff;
              }
            }
            .uñas-q-container.open {
              transition: 0.3s ease;
              height: fit-content;
              max-height: 1000px;
              .q {
                color: #d244d1;
              }
              .icon {
                border-radius: 100%;
                background-color: #d244d1;
                color: #ffffff;
                align-self: center;
              }
            }
          }
        }
      }
      .img {
        height: fit-content;
        width: 400px;
      }
    }
    .info-cards {
      margin-top: 75px;
      margin-bottom: 25px;
      gap: 40px;
      .card {
        min-height: 400px;
        padding: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        border: none;
        width: 310px;
        border-radius: 42px;
        background-color: #f6f7fa;
        h4 {
          font-weight: 800;
          margin-bottom: 25px;
        }
        p {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          opacity: 0.6;
        }
        .adjust {
          padding: 50px;
          .icon-shop {
            width: 70px;
            height: 60px;
          }
          .icon-page {
            width: 55px;
            height: 60px;
          }
          .icon-pc {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
  }

  .video-section {
    padding-block: 70px;
    width: 100%;
    background-color: #ece7f2;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    .video-container {
      display: flex;
      background-color: #edf3f8;
      min-width: 450px;
      width: 450px;
      height: 255px;
      justify-content: center;
      iframe {
        width: 100%;
      }
      p {
        align-self: center;
      }
    }
    .info-video {
      margin: 10px;
      text-align: start;
      align-self: center;
      .big-title {
        font-size: 3.5rem;
      }
    }
    @media (max-width: 450px) {
      .video-container {
        width: 300px;
        min-width: 300px;
        height: 169px;
      }
      .info-video {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        .title-text {
          font-size: 1.2rem;
        }
        .big-title {
          font-size: 2.4rem !important;
        }
      }
    }
  }

  .arita-section {
    overflow: hidden;
    width: 100%;
    background-color: #f6f7fa;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
    .big-title{
      white-space: nowrap;
    }
    .circle {
      background-color: #ffde5e;
      border-radius: 100%;
      width: 300px;
      height: 300px;
    }
    .corner-left {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-120px, -120px);
      z-index: 0;
    }
    .corner-right {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(120px, 120px);
      z-index: 0;
    }
    .image-quote {
      width: 250px;
      position: relative;
      .image {
        position: relative;
        z-index: 3;
        transform: translateX(-150px);
      }
      .quote {
        text-align: end;
        transform: translate(-130px, 250px);
        position: relative;
        font-weight: 700;
        z-index: 3;
      }
    }
    .text {
      z-index: 2;
      text-align: start;
      margin-top: 170px;
      margin-left: 150px;
      .header-contain {
        position: relative;
        z-index: 1;
        transform: translateX(-150px);
        border-radius: 50px;
        padding-left: 150px;
        padding-right: 50px;
        width: fit-content;
        background-color: #ffde5e;
      }
      .sangria {
        margin-left: 25px;
      }
    }
  }

  .benefits-section {
    width: 100%;
    margin-block: 50px;
    margin-bottom: 50px;
    position: relative;
    .back-hands {
      right: 0;
      top: 0;
      z-index: 0;
      position: absolute;
      transform: translateY(35px);
    }
    .blue {
      color: #6678f9;
    }
    h2 {
      font-weight: 700;
      b {
        font-weight: unset;
      }
    }
    .benefits-info {
      margin-top: 50px;
      .info-row {
        position: relative;
        display: flex;
        justify-content: center;
        gap: 10px;
        .info-content {
          position: relative;
          z-index: 3;
          margin: 20px;
          width: 500px;
          display: flex;
          .icon {
            margin-right: 15px;
            align-self: center;
            width: 40px;
            height: 40px;
          }
          h5 {
            align-self: center;
            font-weight: 700;
            text-align: start;
          }
        }
        .info-side {
          width: 400px;
        }
      }
      .gray {
        background-color: #f6f7fa;
      }
    }
  }

  .program {
    position: relative;
    padding-top: 60px;
    padding-bottom: 40px;
    width: 100%;
    background-color: #ece7f2;
    .ghost {
      position: absolute;
      right: 0;
      z-index: 0;
    }
    .program-course {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .course-container {
        width: 1080px;
        .course-detail {
          margin: 10px;
          display: flex;
          .icon {
            margin-right: 30px;
            width: 30px;
            height: 30px;
          }
          p {
            font-size: 16px;
            position: relative;
            z-index: 2;
            font-weight: 700;
            .p-pink {
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .cost-section {
    overflow: hidden;
    padding-block: 60px;
    width: 100%;
    background-image: linear-gradient(to bottom, #ece7f2, #ffffff);
    .cost-body {
      display: flex;
      align-items: center;
      justify-content: center;
      .cost-info {
        width: 100%;
        position: relative;
        .chica-resp{
          display: none;
        }
        .left-img {
          position: absolute;
          z-index: 0;
          left: 0;
          transform: translateY(-80px);
        }
        .right-img {
          position: absolute;
          z-index: 0;
          right: 0;
          top: 0;
          transform: translateY(55px);
        }
        .center {
          .btn {
            padding-inline: 70px;
          }
          h2 {
            font-weight: 700;
            margin-block: 30px;
          }
          p {
            font-size: 18px;
            font-style: italic;
          }
          .red {
            color: #ff1616;
            font-weight: 800;
          }
          .green {
            color: #16a854;
          }
        }
      }
    }
  }

  .certificado-section {
    padding-block: 70px;
    width: 100%;
    min-height: 450px;
    background-color: #f6f7fa;
    display: flex;
    justify-content: center;
    gap: 25px;
    position: relative;
    .left-l {
      z-index: 0;
      position: absolute;
      left: 0;
    }
    .right-l {
      z-index: 0;
      position: absolute;
      right: 0;
    }
    .left-side {
      margin: 15px;
      width: 500px;
      text-align: start;
      .h1 {
        margin-block: 30px;
        font-size: 50px;
        text-align: center;
      }
      h2 {
        font-weight: 700;
        i {
          font-weight: 700;
        }
      }
    }
    .right-side {
      width: 400px;
      .float-bottom {
        transform: translateX(-300px);
        position: absolute;
        bottom: 0;
        z-index: 1;
      }
    }
  }

  .rewards-section {
    width: 100%;
    margin-block: 60px;
    .title {
      margin-bottom: 60px;
      margin-inline: 15px;
      h2 {
        font-weight: unset !important;
      }
    }
    .card-style {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
      border: none;
      border-radius: 28px;
      background-color: #ffffff;
    }
    .rewards-container {
      margin-inline: 100px;
      margin-block: 80px;
      display: flex;
      justify-content: center;
      gap: 15px;
      .reward-card {
        padding: 15px;
        width: 320px;
        min-height: 390px;
        max-height: 390px;
        .normal-card {
          display: unset;
        }
        .hover-card {
          display: none;
          p {
            font-weight: 700;
            font-size: medium;
          }
        }
        h5 {
          font-weight: 700;
          b {
            font-weight: unset;
          }
        }
        h4 {
          padding-top: 50px;
          padding-bottom: 25px;
          font-weight: 700;
          font-style: italic;
        }
        .img {
          position: relative;
          padding-top: 50px;
          .title-img {
            position: absolute;
          }
        }
        &:hover {
          .normal-card {
            display: none;
          }
          .hover-card {
            display: unset;
          }
          color: #ffffff;
          background-image: linear-gradient(
            to bottom right,
            #ff8900,
            #d244d1,
            #962dec
          );
        }
      }
      .points-rewards {
        display: flex;
        flex-direction: column;
        gap: 15px;
        .display-row {
          min-height: 50%;
          display: inline-flex;
          gap: 15px;
          .card {
            max-height: 175px;
            position: relative;
            width: 280px;
            .points {
              transform: translateY(10px);
              bottom: 0;
              position: absolute;
              align-self: center;
              padding-inline: 25px;
              width: fit-content;
              font-size: 20px;
              font-style: italic;
              font-weight: 700;
              color: #ffffff;
              border-radius: 28px;
              background-color: #3f1168;
              width: 280px;
            }
          }
        }
      }
    }
  }

  .experiences-section {
    padding-block: 50px;
    width: 100%;
    background-color: #e2b4e7;
    .experiences-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-inline: 50px;
      .next {
        margin-inline: 25px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 100%;
        width: fit-content;
        padding: 15px;
        border: 1px solid black;
        background-color: transparent;
        .icon {
          color: #000000;
          width: 10px;
          height: 10px;
        }
      }
      .experiences {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        width: 947px;
        gap: 15px;
        padding-block: 30px;
      }
      .experiences.resp {
        display: none;
      }
    }
  }

  .subject-section {
    position: relative;
    width: 100%;
    background-color: #ece7f2;
    padding-block: 50px;
    padding-bottom: 150px;
    .title-ppal {
      font-size: 65px;
    }
    .up-l {
      z-index: 0;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      transform: rotate(180deg);
    }
    .down-l {
      width: 100%;
      z-index: 0;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .subject-container {
      display: flex;
      margin-block: 15px;
      display: flex;
      justify-content: center;
      gap: 150px;
      padding-left: 50px;
      .side {
        width: 500px;
        .subject {
          text-align: start;
          margin-bottom: 30px;
          .lessons {
            display: flex;
            margin-bottom: 20px;
            .num {
              font-size: 23px;
              transform: translateX(-25px);
            }
            .title {
              font-size: 23px;
              transform: translateX(-20px);
            }
          }
        }
      }
    }
  }

  .devices-section {
    width: 100%;
    background-color: #eaeef3;
  }

  .dudas-section {
    width: 100%;
    background-color: #f6f7fa;

    .dudas-img {
      position: relative;
      display: flex;
    }
    .watsap-button {
      position: absolute;
      cursor: pointer;
      width: 250px;
      transform: translateX(190px) translateY(350px);
      border: none;
      padding-block: 10px;
      padding-inline: 25px;
      border-radius: 50px;
      color: #ffffff;
      background-color: #28af25;
    }
  }

  .faq-section {
    margin-block: 50px;
    h2 {
      font-weight: 700;
    }
    .faq {
      .q-container {
        width: 1200px;
        cursor: pointer;
        overflow: hidden;
        margin-block: 15px;
        border-radius: 24px;
        background-color: #f6f7fa;
        .q {
          margin-bottom: 3px;
          display: flex;
          justify-content: space-between;
          .title {
            margin-top: 15px;
            margin-left: 15px;
            font-size: 25px;
            width: 80%;
            text-align: start;
            font-weight: 700;
          }
          .icon {
            background-color: #3f1168;
            border-radius: 100%;
            color: #ffffff;
            margin-right: 15px;
            align-self: center;
            width: 20px;
            height: 20px;
          }
        }
        .a {
          margin-top: 15px;
          font-weight: 700;
          margin-left: 15px;
          text-align: start;
        }
        .q.open-q {
          transition: 0.2s ease;
          .icon {
            background-color: #d244d1;
          }
          .title {
            color: #d244d1;
          }
        }
      }
      .q-container.min {
        max-height: 60px;
        transition: 0.5s ease;
      }
      .q-container.max {
        max-height: 300px;
        transition: 0.5s ease;
      }
    }
  }

  .email-send {
    padding: 8px;
    width: fit-content;
    position: relative;
    border: none;
    border-radius: 14px;
    background-color: #edf3f8;
    .email-input {
      background-color: transparent;
      border: none;
      outline: none;
    }
    .email-button {
      padding: 5px;
      border: none;
      border-radius: 10px;
      color: #ffffff;
      background-color: #d244d1;
    }
  }

  .footer-footer {
    width: 100%;
    padding-block: 50px;
    background-color: #ece7f2;
    color: #ffffff;
    .inside-footer {
      border-radius: 14px;
      background-color: #3f1168;
      width: 1000px;
      height: 400px;
      display: flex;
      justify-content: space-between;
      .info {
        text-align: start;
        margin-inline: 20px;
        p {
          font-size: large;
        }
      }
      .img {
        align-self: center;
        width: 500px;
        height: 300px;
        margin: 15px;
        border-radius: 14px;
      }
    }
  }
  //////////////////////////////////////////////////////////////
  @media (max-width: 1000px) {
    .section {
      .space{
        .big-text{
          font-size: 75px;
        }
      }
      .left-img {
        trasnform: unset;
        top: 650px;
        width: 30%;
        min-width: 240px;
      }
      .right-img-1 {
        max-width: 350px;
        width: 32%;
        min-width: unset;
        transform: translateY(-360px);
        min-width: 250px;
      }
      .right-img-2 {
        min-width: 250px;
        transform: translateY(220px);
      }
    }
    .materials-modal {
      width: unset;
      .materials-list {
        padding: 0;
        flex-direction: column;
        .materials-column {
          width: 100%;
        }
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 1080px) {
    .program {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      .h4 {
        width: 90%;
      }
      .program-course {
        width: 90%;
        .course-container {
          width: 100%;
        }
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 1250px) {
    .arita-section{
      .text{
        max-width: 430px;
        .text-container{
          .big-title{
            font-size: 60px;
          }
        }
      }
    }
    .benefits-section {
      .benefits-info {
        .back-hands {
          display: none;
        }
      }
    }
    .program {
      .program-course {
        .course-container {
          .course-detail {
            p {
              text-align: start;
            }
          }
        }
      }
    }

    .cost-section {
      .cost-body {
        .cost-info {
          .left-img {
            width: 360px;
            transform: translateY(-40px);
          }
          .right-img {
            width: 220px;
            right: -30px;
            top: 25px;
          }
        }
      }
    }

    .certificado-section {
      .left-side {
        width: 450px;
        .h1{
          white-space: nowrap;
        }
      }
      .right-side {
        .float-bottom {
          width: 650px;
          transform: translate(-260px, 0px);
        }
      }
    }

    .rewards-section {
      .rewards-container {
        width: unset;
        flex-direction: column;
        .points-rewards {
          .display-row {
          }
        }
      }
    }

    .experiences-section {
      .experiences-container {
        margin-inline: 0px;
        .experiences {
          display: flex;
        }
        .experiences.resp {
          display: none;
        }
      }
    }

    .subject-section {
      .btn {
        padding-inline: 20px;
      }
    }

    .devices-section {
      .devices {
        width: 100%;
      }
    }

    .dudas-section {
      padding-top: 15px;
      flex-direction: column;
      .text-end {
        text-align: center !important;
      }
      .dudas-img {
        display: flex;
        justify-content: center;
        align-items: center;
        .point {
          width: 80%;
        }
        .watsap-button {
          transform: translate(0px, 100px);
        }
      }
    }

    .faq-section {
      .faq {
        .q-container {
          width: 750px;
          .q {
            .title {
              font-size: 20px;
            }
          }
        }
        .q-container.min {
          max-height: 80px;
          .border-top {
            display: none;
          }
        }
      }
    }

    .footer-footer {
      .inside-footer {
        width: 750px;
        .info {
          padding-top: 30px;
          .email-send {
            .email-input {
              width: fit-content;
            }
          }
        }
        .img {
          width: 300px;
        }
      }
    }
  }
  /////////////////////////////////////////////////
  @media(max-width: 1000px){
    .arita-section{
      .text{
        max-width: 380px;
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 850px) {
    .section {
      h4{
        font-size: .8rem;
      }
      margin-bottom: 25px;
      .left-img {
        top: 550px;
        min-width: 200px;
      }
      .right-img-1 {
        transform: translateY(-345px);
        min-width: 160px;
      }
      .right-img-2 {
        min-width: 140px;
        transform: translateY(200px);
      }
      .fechas {
        margin-top: 1.5rem !important;
        margin-bottom: 70px !important;
      }
      .space {
        .subtitle {
          font-size: 18px;
          margin-top: 20px;
          font-weight: 800;
        }
      }
      .all-center {
        img {
          width: 150px;
          height: 25px;
        }
        h3 {
          margin-block: 15px;
          font-size: 16px;
        }
      }
      .extra-margin {
        font-size: 18px;
        padding-inline: 20px;
      }
      .btn {
        padding: 0px;
        padding-inline: 30px;
        padding-block: 8px;
        font-size: 16px;
        line-height: 20px;
      }
    }
    .info {
      padding-block: 50px;
      .h1 {
        margin-top: 30px;
      }
      .info-top {
        flex-direction: column;
        img {
          order: 1;
          width: 350px !important;
        }
        .text {
          order: 2;
          margin-bottom: 50px;
          .title {
            margin: 15px;
            font-size: 24px;
            text-align: center;
            .subtitle {
              font-size: 18px;
            }
          }
          .uñas {
            gap: 0px;
            .uñas-q {
              margin: 5px;
              .uñas-q-container {
                width: unset;
                max-height: 46px;
                h2 {
                  font-size: 20px;
                }
                .q {
                }
              }
            }
          }
        }
      }
      .info-cards {
        flex-direction: column;
      }
    }

    .video-section {
      flex-direction: column;
      .info-video {
        align-items: unset;
        .title-text {
          font-size: 16px;
        }
        .big-title {
          font-size: 36px !important;
        }
        p {
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 0px;
        }
        button {
          padding: 0px;
          margin-top: 20px;
          width: fit-content;
          padding-inline: 20px;
          padding-block: 5px;
          font-size: 14px;
        }
      }
    }

    .arita-section {
      .corner-left {
        right: 0px;
        left: unset;
        transform: translate(60px, -60px);
        width: 150px;
        height: 150px;
      }
      .corner-right {
        display: none;
      }
      .image-quote {
        display: none;
      }
      .text {
        margin-left: 0px;
        margin-top: 50px;
        transform: translate(0px, 0px);
        padding-inline: 30px;
        .text-container {
          position: relative;
          .sangria {
            width: 100%;
          }
          .image-container {
            position: absolute;
            top: 41%;
            transform: translateY(-50%);
            left: 250px;
            width: 100%;
            .image {
              width: 45%;
              min-width: 150px;
            }
          }
        }
        .quote-resp {
          text-align: center;
          background-color: #ffde5e;
          border-radius: 100px;
          padding-inline: 30px;
          line-height: 20px;
          font-size: 14px;
          margin-inline: 30px;
          span {
            font-weight: 600;
          }
          i {
            font-weight: 800;
          }
        }
        .header-contain {
          background-color: unset;
          padding-left: unset;
          transform: unset;
          padding-right: unset;
          .big-title {
            font-size: 50px;
            font-weight: 800;
          }
        }
        .p-pink {
          font-style: italic;
        }
        .sangria {
          width: 250px;
          margin-left: 0px;
        }
      }
    }

    .benefits-section {
      .text-blue {
        padding-inline: 20px;
        font-size: 20px;
      }
      .benefits-info {
        .gray {
          background-color: unset;
        }
        .info-row {
          .info-content {
            width: unset;
            margin: unset;
            padding-block: 10px;
            padding-inline: 20px;
          }
          .info-side {
            background-color: #f6f7fa;
          }
          flex-direction: column;
          h5 {
            font-size: 1rem;
          }
        }
        .back-hands {
          display: none;
        }
      }
    }

    .program {
      .program-course {
        .course-container {
          .course-detail {
            p {
              text-align: start;
            }
          }
        }
      }
    }
    .cost-section {
      background-image: unset;
      padding-block: 20px;
      .cost-body {
        .cost-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          .chica-resp{
            display: unset;
          }
          .center {
            order: 2;
            padding-inline: 20px;
            .btn {
              padding-inline: 25px;
              font-size: 16px;
              padding-block: 8px;
              line-height: 20px;
            }
            .red{
              font-weight: 500;
            }
            .green {
              margin-block: 0px;
              margin-top: 30px;
            }
          }
          .left-img {
            display: none;
          }
          .right-img {
            display: none;
          }
        }
      }
    }

    .certificado-section {
      flex-direction: column;
      align-items: center;
      gap: 40px;
      padding-block: 0px;
      padding-top: 75px;
      margin-bottom: 30px;
      .left-l {
        width: 50px;
        top: 50%;
      }
      .right-l {
        top: 0px;
        width: 40px;
      }
      .left-side {
        margin: 0px;
        width: 100%;
        padding-inline: 20px;
        .p-pink {
          font-size: 36px;
        }
        .text-certificate {
          font-size: 20px;
          font-weight: 400;
          text-align: justify;
        }
      }
      .right-side {
        display: none;
      }
      .float-bottom {
        width: 100%;
      }
    }
    .rewards-section {
      .title {
        display: flex;
        gap: 10px;
        align-items: center;
        img {
          margin-right: 0rem !important;
          width: 40px;
          height: 40px;
        }
        h2 {
          font-size: 1.4rem;
          text-align: start;
          margin: 0;
        }
      }
      .rewards-container {
        width: unset;
        flex-direction: column;
        margin-inline: 0px;
        .points-rewards {
          gap: 50px;
          margin-top: 40px;
          .display-row {
            gap: 50px;
            .card {
              width: 180px;
              .points {
                width: 180px;
                font-size: 14px;
                padding-inline: 0px;
              }
            }
          }
        }
      }
    }

    .experiences-section {
      .h1 {
        font-size: 40px;
      }
      .experiences-container {
        margin-inline: 0;
        .next {
          margin-inline: 5px;
          border: none;
          padding: 5px;
          .icon {
            width: 30px;
            height: 30px;
          }
        }
        .experiences {
          max-width: 300px;
          display: none;
        }
        .experiences.resp {
          display: flex;
        }
      }
    }

    .subject-section {
      padding-inline: 20px;
      h4 {
        margin-bottom: 40px;
        font-size: 20px;
      }
      .subject-container {
        flex-direction: column;
        gap: 0px;
        align-items: center;
        .side {
          width: 100%;
          .subject {
            margin-bottom: 20px;
            .lessons {
              .title {
                font-size: 20px;
              }
            }
          }
        }
        h3 {
          font-size: 20px;
        }
        h5 {
          font-size: 14px;
        }
      }
      .btn {
        padding-inline: 20px;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .devices-section {
      display: flex;
      flex-direction: column;
      .big-title {
        font-size: 40px;
        order: 2;
      }
      .devices {
        width: 100%;
        order: 1;
      }
    }

    .dudas-section {
      padding-top: 15px;
      flex-direction: column;
      background-color: white;
      .text-end {
        text-align: center !important;
      }
      .dudas-img {
        display: flex;
        justify-content: center;
        align-items: center;
        .point {
          width: 80%;
          min-width: 420px;
        }
        .watsap-button {
          transform: translate(0px, 100px);
          width: unset;
          padding-block: 5px;
          padding-left: 15px;
          paddin-right: 40px;
          img {
            width: 30px;
            height: 30px;
          }
          p {
            text-align: start;
            font-size: 14px;
            line-height: 16px;
            font-weight: 600;
          }
        }
      }
    }

    .faq-section {
      background-color: #ece7f2;
      margin-block: 0px;
      padding-block: 50px;
      width: 100%;
      .big-title {
        font-size: 40px;
      }
      .faq {
        .q-container {
          width: 450px;
          background-color: unset;
        }
        .q-container.min {
          max-height: 75px;
          .q {
            .title {
              font-size: 16px;
              font-weight: 600 !important;
            }
          }
        }
      }
    }

    .footer-footer {
      .inside-footer {
        width: 450px;
        .info {
          .email-send {
            .email-input {
              width: fit-content;
            }
          }
        }
        .img {
          display: none;
        }
      }
    }
  }
   @media(max-width: 550px){
    .section{
      .right-img-1 {
        transform: translateY(-270px);
        min-width: 120px;
      }
      .space{
        .big-text{
          font-size: 60px;
        }
      }
    }
   }
    @media (max-width: 400px) {
      .section{
        .space{
          margin-bottom: 5px;
          .big-text{
            font-size: 45px;
          }
          .subtitle{
            font-size: 16px;
            font-weight: 500;
          }
        }
        .all-center{
          img{
            width: 120px;
            height: 20px;
          }
          h3{
            padding-left: 10px;
            font-size: 12px;
            margin-block: 5px;
          }

        }
        .extra-margin{
          margin-top: 30px;
          font-size: 14px;
        }
        .left-img {
          top: 470px;
          min-width: 190px;
          left: -10px;
        }
        .right-img-1 {
          transform: translateY(-240px);
          min-width: 185px;
          right: -25px;
        }
        .right-img-2 {
          min-width: 140px;
          transform: translateY(190px);
          right: -10px;
        }
        .btn{
          padding-block: 5px;
          font-size: 13px;
          padding-inline: 25px;
          line-height: 18px;
          font-weight: 500;
        }
      }
      .info{
        .info-cards{
          .card{
            width: 185px;
            min-height: unset;
            h4{
              font-size: .9rem;
              font-weight: 600;
            }
            p{
              font-size: 12px;
            }
            .adjust{
              padding: 30px;
              .icon-shop{
                width: 40px;
                height: 32px;
              }
              .icon-pc{
                width: 32px;
                height: 30px;
              }
              .icon-page{
                width: 30px;
                height: 34px;
              }
            }
          }
        }
        .h1{
          font-size: 1.6rem;
        }
        .info-top{
          .img{
            width: 300px !important;
          }
          .text{
            .title{
              font-size: 20px;
              .subtitle{
                font-size: 15px;
              }
            }
            .uñas{
              justify-content: center;
              .uñas-q{
                gap: 10px;
                .uñas-q-container{
                  max-width: 140px;
                  padding: 5px;
                  max-height: 32px;
                  border-radius: 10px;
                  p{
                    font-size: 10px;
                  }
                  h2{
                    margin-left: 10px;
                    font-size: 14px;
                    margin-bottom: 0px;
                  }
                  svg{
                    width: 12px;
                    height: 12px;
                  }
                }
              }
            }
          }
        }
      }
      .video-section{
        .info-video{
          .big-title{
            font-size: 34px !important;
          }
          p{
            font-size: 12px;
          }
        }

      }
      .devices-section {
        .big-title {
          font-size: 34px;
        }
      }
      .arita-section {
        .text {
          padding-inline: 15px;
          .text-container{
            .image-container{
              left: 160px;
              top: 43%;
              .image{
                min-width: 166px;
              }
            }
          }
          .header-contain {
            .big-title {
              font-size: 44px;
            }
          }
          .p-pink {
            font-size: 14px;
          }
          .sangria {
            width: 180px;
            p {
              font-size: 11px;
            }
          }
          .quote-resp {
            margin-inline: 10px;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
      .benefits-section {
        h2 {
          margin-bottom: 1rem;
        }
        .text-blue{
          font-size: 17px;
          padding-blue: 10px;
        }
      }
      .program {
        padding-bottom: 60px;
        h2 {
          padding-inline: 20px;
          font-size: 22px;
          margin-bottom: 20px;
        }
        .h4 {
          font-size: 11px;
          line-height: 18px;
          font-weight: 400;
          letter-spacing: 1px;
          margin-bottom: 30px;
          width: unset;
        }
        .program-course {
          .ghost {
            width: 150px;
            bottom: 0px;
          }
          .course-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .course-detail {
              display: flex;
              gap: 10px;
              margin: 0px;
              .icon {
                margin-right: 0px;
              }
              p {
                font-size: 12px;
                margin-bottom: 0px;
              }
              .p-pink {
                font-style: italic;
              }
            }
          }
        }
      }
      .cost-section{
        margin-bottom: 30px;
        .cost-body{
          .cost-info{
            .center{
              .btn{
                line-height: 18px;
                font-weight: 500;
                font-size: 14px;
                padding-inline: 30px;
                padding-block: 5px;
              }
              p{
                font-size: 14px;
                font-weight: 500;
              }
              .p-pink{
                font-size: 2.2rem;
                text-transform: uppercase;
              }
            }
          }
        }
      }
      .certificado-section{
        .left-side{
          padding-inline: 15px;
          .p-pink{
            font-size: 32px;
          }
          .text-certificate{
            text-align: start;
            font-size: 18px;
            .p-pink{
              font-size: 18px;
              i{
                font-size: 14px;
                font-weight: 500;
              }
            }
          }
        }
      }
      .rewards-section {
        .title {
          img {
            width: 34px;
            height: 34px;
          }
          h2 {
            font-size: 1.6rem;
          }
        }
        .rewards-container {
          .reward-card{
            width: 280px;
            min-height: 320px;
            max-height: 320px;
            h5{
              font-size: 16px;
            }
          }
          .points-rewards {
            gap: 20px;
            .display-row {
              gap: 20px;
              .card {
                width: 150px;
                .points {
                  width: 120px;
                  font-size: 10px;
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
      .subject-section{
        padding-bottom: 80px;
        .btn{
          font-size: 11px;
          padding-inline: 12px;
        }
        .title-ppal{
          font-size: 50px;
        }
        h4{
          font-size: 18px;
        }
        .subject-container{
          padding-left: 20px;
          .side{
            .subject{
              .lessons{
                margin-bottom: 0;
                .num{
                  font-size: 18px;
                }
                .title{
                  font-size: 16px;
                }
              }
            }
          }
          h5{
            font-size: 12px;
          }
        }
      }
      .devices-section{
        .big-title{
          font-size: 28px;
          margin-block: 20px;
        }
      }
    }
  }
`;
