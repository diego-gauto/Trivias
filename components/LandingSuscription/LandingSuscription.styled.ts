import styled from "styled-components";

export const SuscriptionContain = styled.div`
  position: relative;
  text-align: center;
  color: #3f1168;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    &:hover {
      opacity: 0.5;
    }
  }
  .extra-header {
    padding-inline: 10px;
    padding-block: 15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .header-button {
      padding-block: 5px;
      padding-inline: 15px;
      border: none;
      background-color: #d9d9d9;
      border-radius: 28px;
      color: #3f1168;
      font-weight: 700;
    }
  }
  .all-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .red {
    color: #ff1616;
  }
  .green {
    color: #16a854;
  }
  .subtitle {
    font-size: large;
  }
  .right-img {
    width: fit-content;
  }
  .p-pink {
    color: #d244d1;
  }
  .no-bold {
    font-weight: unset;
  }
  .bold {
    font-weight: 700;
  }
  .bolder {
    font-weight: 800 !important;
  }
  .space {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .big-title {
    font-size: 65px;
  }

  .intro-section {
    width: 100%;
    margin-bottom: 100px;
    position: relative;
    .gonvarplus {
      margin-block: 60px;
    }
    .plusgonvar {
      width: 70px;
      height: 70px;
    }
    .background-images {
      position: relative;
      width: 100%;
      .back-lines {
        top: 0;
        width: 100%;
        position: absolute;
      }
      .image-contain {
        width: 100%;
        transform: translate(0px, -20px);
        position: absolute;
        left: 0;
        z-index: -2;
        .images-fade {
          position: absolute;
          background: linear-gradient(180deg, transparent 0%, #fff 100%);
          opacity: 0.5;
          width: 100%;
          bottom: 0px;
          height: 20%;
          z-index: 100;
        }
      }
      .women-back {
        width: 100%;
      }
    }
  }

  .courses-section {
    width: 100%;
    margin-block: 50px;
    .group-buttons {
      width: 1200px;
      margin-top: 25px;
      margin-bottom: 25px;
      .center {
        gap: 25px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        button {
          font-style: italic;
          margin-inline: 10px;
          border: none;
          border-radius: 16px;
          color: white;
          padding-inline: 65px;
          background-image: linear-gradient(to right bottom, #aa1bc4, #eb7c2d);
        }
        .select {
          font-size: large;
          font-weight: 700;
          background-image: linear-gradient(
            to right bottom,
            #9930e7,
            #e35bc2
          ) !important;
        }
      }
    }
    .thumbnail {
      border-radius: 18px;
      width: 370px;
      height: 200px;
    }
    .course-container {
      gap: 20px;
    }
  }

  .ubi-section {
    margin-block: 75px;
    width: 100%;
    position: relative;
    .back-ghosts {
      .g-1 {
        position: absolute;
        z-index: -1;
        transform: translateX(-540px);
      }
      .g-2 {
        position: absolute;
        z-index: -1;
        transform: translateX(300px) translateY(200px);
      }
      .g-3 {
        position: absolute;
        z-index: -1;
        transform: translateX(-430px) translateY(300px);
      }
    }
  }

  .instructores-section {
    margin-block: 75px;
    width: 100%;
    .instructores {
      margin-block: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .inst-cont {
        margin-inline: 15px;
        .middle {
          font-size: 21px;
        }
        .arita {
          font-size: 24px;
        }
        b {
          font-size: 18px;
        }
        i {
          font-size: 14px;
        }
      }
    }
  }

  .difficulties-section {
    width: 100%;
    margin-block: 75px;
    .dif-lines {
      margin-block: 50px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      .behind {
        position: absolute;
        transform: translateY(-120px);
        z-index: -1;
      }
      .level {
        margin-inline: 20px;
      }
    }
  }

  .teaching-section {
    margin-block: 75px;
    width: 100%;
    .teach-lines {
      margin-top: 50px;
      margin-bottom: 100px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 100px;
      .lines {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .line-desc {
          width: 350px;
          position: absolute;
          background-color: #ffffff;
          transform: translateY(50px);
          bottom: 0;
        }
      }
    }
  }

  .certificado-section {
    width: 1200px;
    margin-block: 75px;
    position: relative;
    .back-lines {
      position: absolute;
      z-index: -1;
      .line-1 {
        position: absolute;
        transform: translate(-30px, -90px);
      }
      .line-2 {
        position: absolute;
        transform: translate(260px, 120px);
      }
      .line-3 {
        position: absolute;
        transform: translate(-600px, -280px);
      }
      .line-4 {
        position: absolute;
        transform: translate(-440px, 240px);
      }
    }
    .cert-img {
      margin-right: 5px;
    }
    b {
      font-weight: unset;
    }
    .cert-text {
      text-align: start;
      .text-width {
        width: 90%;
      }
    }
  }

  .cellphone-section {
    margin-block: 75px;
    width: 1200px;
    position: relative;
    .cell-body {
      .title {
        font-size: 45px;
        font-weight: 700;
      }
      .subtitle {
        margin-left: 55px;
        margin-block: 40px;
      }
      .back-lines {
        position: absolute;
        z-index: -1;
        .line-1 {
          transform: translate(-70px, -50px);
        }
        .line-2 {
          transform: translate(130px, 260px);
        }
        .line-3 {
          transform: translate(70px, -230px);
        }
      }
    }
  }

  .benefits-section {
    width: 100%;
    margin-block: 75px;
    padding-right: 100px;
    .all-center {
      padding-left: 50px;
      h2 {
        font-size: 2.3rem;
      }
    }
    .list-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .left-side {
        width: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .list {
          width: fit-content;
          margin-bottom: 20px;
          margin-top: 20px;
          padding-left: 10px;
          display: flex;
          align-items: center;
          text-align: start;
        }
      }
      .benefits-ghosts {
        position: relative;
        z-index: 0;
        display: flex;
        .girl {
          position: absolute;
          width: 400px;
          transform: translate(-160px, -190px);
          z-index: 1;
        }
        .star {
          position: absolute;
          z-index: 2;
          transform: translateX(140px) translateY(80px);
        }
        .back {
          position: absolute;
          transform: translateX(80px) translateY(-220px);
          z-index: -1;
        }
      }
    }
  }

  .cost-section {
    position: relative;
    margin-block: 75px;
    width: 100%;
    .chica-img {
      position: absolute;
      left: 0;
      width: 250px;
    }
    .red-font {
      font-size: 30px;
    }
    .big-font {
      font-size: 40px;
    }
    .btn {
      padding-inline: 70px;
      font-size: 25px;
    }
    .manos {
      position: absolute;
      right: 0;
      width: 300px;
    }
  }

  .rewards-section {
    margin-block: 75px;
    width: 100%;
    position: relative;
    .side-images {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      transform: translateY(-50px);
      z-index: -1;
    }
    .card-container {
      position: relative;
      z-index: 1;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      .points {
        &:hover {
          background: linear-gradient(
            to bottom right,
            #ff8900,
            #d244d1,
            #962dec
          );
        }
      }
      .time {
        &:hover {
          background: linear-gradient(to bottom right, #00da5f, #3d86b8);
        }
      }
      .awards {
        &:hover {
          background: linear-gradient(to bottom right, #019fff, #9603ed);
        }
      }
      .reward-card {
        background-color: #ffffff;
        position: relative;
        max-width: 310px;
        min-width: 310px;
        min-height: 450px;
        border-radius: 55px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
        margin: 30px;
        .normal-card {
          transition: 0.2s ease;
          display: unset;
          .icons {
            position: relative;
            padding-top: 150px;
            .title-img {
              transform: translateY(-50px);
              position: absolute;
            }
          }
        }
        .hover-card {
          transition: 0.2s ease;
          color: #ffffff;
          display: none;
          .yellow {
            color: #ffb413;
          }
        }
        .blue {
          color: #3965f8;
        }
        .teal {
          color: #11c378;
        }
        &:hover {
          .normal-card {
            transition: 0.2s ease;
            display: none;
          }
          .hover-card {
            transition: 0.2s ease;
            display: unset;
          }
        }
      }
    }
  }

  .testimonio-section {
    padding-block: 50px;
    width: 100%;
    .experiences-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-inline: 20px;
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
        padding: 15px;
        gap: 15px;
      }
      .experiences.resp {
        display: none;
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
      }
      .experiences.resp {
        display: none;
      }
    }
  }

  .inspo-section {
    overflow: hidden;
    width: 90%;
    margin-block: 75px;
    .inspo-swiper {
      display: unset;
      .w-est {
        width: 1100px;
      }
      .swiper-item {
        width: 280px;
        height: 230px;
      }
    }
    .inspo-swiper.res {
      display: none;
    }
  }

  .dudas-section {
    width: 100%;
    margin-block: 75px;
    .dudas-img {
      position: relative;
      .watsap-button {
        position: absolute;
        cursor: pointer;
        width: 250px;
        transform: translateX(180px) translateY(-100px);
        border: none;
        padding-block: 10px;
        padding-inline: 25px;
        border-radius: 50px;
        color: #ffffff;
        background-color: #28af25;
      }
    }
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
  .responsive-unset {
    width: unset;
  }

  .rotate-img {
    -webkit-transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
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

  .faq-section {
    width: 90%;
    margin-block: 75px;
    margin-inline: 15px;
    .faq {
      .q-container {
        min-width: 250px;
        width: 1200px;
        cursor: pointer;
        overflow: hidden;
        margin-block: 15px;
        border-radius: 24px;
        background-color: #edf3f8;
        .q {
          margin-bottom: 3px;
          display: flex;
          justify-content: space-between;
          .title {
            margin-top: 15px;
            margin-left: 15px;
            font-weight: 700;
            font-size: 25px;
          }
          .icon {
            width: 25px;
            height: 25px;
            background-color: #3f1168;
            border-radius: 100%;
            color: #ffffff;
            margin-right: 15px;
            align-self: center;
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
        max-height: 70px;
        transition: 0.5s ease;
      }
      .q-container.max {
        max-height: 300px;
        transition: 0.5s ease;
      }
    }
  }

  .footer-footer {
    width: 100%;
    padding-block: 50px;
    background-color: #edf3f8;
    color: #ffffff;
    .inside-footer {
      border-radius: 14px;
      background-color: #3f1168;
      width: 1200px;
      display: flex;
      justify-content: space-between;
      .info {
        text-align: start;
        margin: 35px;
        p {
          font-size: large;
        }
      }
      .img {
        margin: 15px;
        border-radius: 14px;
      }
    }
  }
  @media (max-width: 1350px) {
    .cost-section {
      .chica-img {
        width: 250px;
      }
      .manos {
        width: 250px;
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 1100px) {
    .intro-section {
      .gonvarplus {
        width: 350px;
      }
      .background-images {
        display: none;
      }
    }
    .courses-section {
      .group-buttons {
        width: 100%;
        .center {
          gap: 10px;
          button {
            margin-inline: 10px;
          }
        }
      }
      h5 {
        margin-inline: 15px;
      }
    }
    .ubi-section {
      .back-ghosts {
        display: none;
      }
      .ubiImg {
        width: 380px;
      }
    }
    .instructores-section {
      .instructores {
        flex-direction: column;
      }
    }
    .difficulties-section {
      .dif-lines {
        flex-direction: column;
        align-items: center;
        .behind {
          display: none;
        }
        .level {
          width: 200px;
        }
      }
    }
    .teaching-section {
      .teach-lines.all-center {
        flex-direction: column;
      }
    }
    .certificado-section {
      width: 100%;
      .back-lines {
        display: none;
      }
      .all-center {
        flex-direction: column;
        .cert-img {
          width: 500px;
        }
        .cert-text {
          width: 450px;
          .w-75 {
            width: unset !important;
          }
        }
      }
    }
    .cellphone-section {
      width: 100%;
      .cell-body {
        text-align: center !important;
        margin: 5px;
        .text-center {
          margin-block: 25px;
        }
        .back-lines {
          display: none;
        }
      }
      img {
        display: none;
      }
    }

    .benefits-section {
      .title {
        h2 {
          text-align: center !important;
        }
      }
      .list-container {
        flex-direction: column;
        width: unset;
        .left-side {
          width: unset;
        }
        .benefits-ghosts {
          .back {
            transform: translate(0px, 0px);
          }
          .girl {
            position: unset;
            transform: translate(0px, 0px);
          }
          .star {
            transform: translate(300px, 270px);
          }
        }
      }
    }

    .cost-section {
      .chica-img {
        display: none;
      }
      .manos {
        display: none;
      }
    }

    .rewards-section {
      .card-container {
        flex-wrap: wrap;
      }
    }

    .testimonio-section {
      .experiences-container {
        .experiences {
          max-width: 300px;
          display: none;
        }
        .experiences.resp {
          display: flex;
        }
      }
    }

    .dudas-section {
      .all-center {
        flex-direction: column;
        .text-end {
          text-align: center !important;
        }
        .dudas-img {
          .point {
            width: 450px;
          }
          .watsap-button.all-center {
            flex-direction: row;
          }
          .watsap-button {
            transform: translate(100px, -90px);
          }
        }
      }
    }

    .faq-section {
      .faq {
        .all-center {
          .q-container {
            width: 850px;
            .q {
              .title {
                text-align: start;
                width: 85%;
                font-size: 20px;
              }
            }
            .border-top {
              margin-top: 20px;
            }
          }
          .q-container.min {
            max-height: 75px;
          }
          .q-container.max {
            max-height: 800px;
          }
        }
      }
    }

    .footer-footer {
      .inside-footer {
        width: 650px;
      }
      .img {
        display: none;
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 650px) {
    .intro-section {
      .gonvarplus {
        width: 350px;
      }
    }
    .courses-section {
      .group-buttons {
        width: 100%;
        .center {
          gap: 10px;
          button {
            margin-inline: 10px;
          }
        }
      }
      h5 {
        margin-inline: 15px;
      }
    }
    .ubi-section {
      .back-ghosts {
        display: none;
      }
      .ubiImg {
        width: 380px;
      }
    }
    .instructores-section {
      .instructores {
        width: 450px;
      }
    }

    .teaching-section {
      .teach-lines.all-center {
        flex-direction: column;
      }
    }
    .cellphone-section {
      width: 100%;
      .cell-body {
        text-align: center !important;
        margin: 5px;
        .text-center {
          margin-block: 25px;
        }
        .back-lines {
          display: none;
        }
      }
      img {
        display: none;
      }
    }

    .benefits-section {
      .title {
        h2 {
          text-align: center !important;
        }
      }
      .benefits-ghosts {
        display: none;
      }
    }

    .cost-section {
      .chica-img {
        display: none;
      }
      .manos {
        display: none;
      }
    }

    .rewards-section {
      .side-images {
        display: none;
      }
      .card-container {
        flex-direction: column;
      }
    }

    .testimonio-section {
      .testimonio-container {
        display: none;
      }
      .testimonio-container.res {
        display: flex;
      }
    }

    .inspo-section {
      .inspo-swiper {
        display: none;
      }
      .inspo-swiper.res {
        display: unset;
      }
    }

    .dudas-section {
      .all-center {
        flex-direction: column;
        .text-end {
          text-align: center !important;
        }
        .dudas-img {
          .point {
            width: 450px;
          }
          .watsap-button.all-center {
            flex-direction: row;
          }
          .watsap-button {
            transform: translate(100px, -90px);
          }
        }
      }
    }

    .faq-section {
      .faq {
        .all-center {
          .q-container {
            width: 450px;
            .q {
              .title {
                text-align: start;
                width: 85%;
              }
            }
            .border-top {
              margin-top: 20px;
            }
          }
          .q-container.min {
            max-height: 75px;
          }
          .q-container.max {
            max-height: 800px;
          }
        }
      }
    }

    .footer-footer {
      .inside-footer {
        width: 450px;
        .img {
          display: none;
        }
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 390px) {
    width: 380px;
    overflow-x: hidden;
    .big-title {
      font-size: 45px;
    }
    .intro-section {
      .gonvarplus {
        width: 350px;
      }
    }
    .courses-section {
      .group-buttons {
        width: 100%;
        .center {
          gap: 10px;
          button {
            margin-inline: 10px;
          }
        }
      }
      h5 {
        margin-inline: 15px;
      }
    }
    .ubi-section {
      .back-ghosts {
        display: none;
      }
      .ubiImg {
        width: 380px;
      }
    }
    .instructores-section {
      .instructores {
        width: 350px;
      }
    }
    .difficulties-section {
      .dif-lines {
        flex-direction: column;
        align-items: center;

        width: 350px;
        .behind {
          display: none;
        }
        .level {
          width: 170px;
          margin-block: 10px;
        }
      }
    }
    .teaching-section {
      .teach-lines.all-center {
        flex-direction: column;
      }
    }
    .certificado-section {
      width: 100%;
      .back-lines {
        display: none;
      }
      .all-center {
        flex-direction: column;
        .cert-img {
          width: 350px;
        }
        .cert-text {
          width: 350px;
          .w-75 {
            width: unset !important;
          }
        }
      }
    }
    .cellphone-section {
      width: 100%;
      .cell-body {
        text-align: center !important;
        margin: 5px;
        .text-center {
          margin-block: 25px;
        }
        .back-lines {
          display: none;
        }
      }
      img {
        display: none;
      }
    }

    .benefits-section {
      .title {
        h2 {
          text-align: center !important;
        }
      }
      .benefits-ghosts {
        display: none;
      }
    }

    .cost-section {
      .chica-img {
        display: none;
      }
      .manos {
        display: none;
      }
    }

    .rewards-section {
      .side-images {
        display: none;
      }
      .card-container {
        width: 100%;
        flex-direction: column;
      }
    }

    .testimonio-section {
      .testimonio-container {
        display: none;
      }
      .testimonio-container.res {
        display: flex;
      }
    }

    .email-send {
      display: flex;
      .email-input {
        width: 80%;
      }
    }

    .dudas-section {
      .all-center {
        flex-direction: column;
        .text-end {
          text-align: center !important;
        }
        .dudas-img {
          .point {
            width: 350px;
          }
          .watsap-button.all-center {
            flex-direction: row;
          }
          .watsap-button {
            transform: translate(50px, -70px);
          }
        }
      }
    }

    .faq-section {
      .faq {
        .all-center {
          .q-container {
            width: 350px;
            .q {
              .title {
                text-align: start;
                width: 85%;
              }
              .title.special {
                font-size: 16px;
              }
            }
            .border-top {
              margin-top: 20px;
            }
          }
          .q-container.min {
            max-height: 75px;
          }
          .q-container.max {
            max-height: 800px;
          }
        }
      }
    }

    .footer-footer {
      .inside-footer {
        width: 350px;
        .img {
          display: none;
        }
      }
    }
  }
`;
