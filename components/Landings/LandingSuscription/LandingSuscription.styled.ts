import styled from 'styled-components';

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
  .watsap-button-ultimate {
    background-color: #28af25;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-inline: 20px;
    border-radius: 50px;
    width: 200px;
    color: white;
    line-height: normal;
    img {
      width: 25px;
      height: 25px;
      margin-right: 0.5rem;
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
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .big-title {
    font-size: 65px;
  }

  .intro-section {
    width: 100%;
    margin-bottom: 0;
    position: relative;
    .gonvarplus {
      margin-top: 60px;
      margin-bottom: 10px;
    }
    .plusgonvar {
      width: 70px;
      height: 70px;
    }
    .background-images-responsive {
      display: none;
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
        top: 460px;
        .left-woman {
          position: absolute;
          left: -80px;
          width: 30%;
          max-width: 550px;
        }
        .right-woman {
          position: absolute;
          right: -80px;
          width: 22%;
          max-width: 390px;
          top: -15px;
        }
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
    }
  }

  .courses-section {
    width: 100%;
    margin-top: 0px;
    background-color: #3f1168;
    color: white;
    padding-block: 40px;
    .special-course {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      text-align: center;
      padding-inline: 30px;
      img {
        width: 50%;
        border-radius: 30px;
      }
      p {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }
      .title {
        font-size: 1.6rem;
      }
    }
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
          width: 220px;
          white-space: nowrap;
          font-style: italic;
          margin-inline: 10px;
          border: none;
          border-radius: 16px;
          color: white;
          text-align: center;
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
      margin-inline: 15px;
      gap: 20px;
      .res {
        display: none;
      }
      .no-res {
        display: flex;
      }
      .next {
        transform: translateY(-35px);
        cursor: pointer;
        .icon {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .ubi-section {
    padding-block: 75px;
    padding-inline: 35px;
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
    padding-block: 75px;
    width: 100%;
    background-color: #3f1168;
    color: white;
    button {
      padding-block: 5px;
      font-size: 18px;
      line-height: 22px;
    }
    h3 {
      padding-inline: 20px;
      font-size: 20px;
    }
    .instructores {
      margin-block: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .duo-containers {
        display: flex;
        img {
          width: 160px;
        }
      }
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
          font-size: 18px;
        }
      }
    }
  }

  .difficulties-section {
    width: 100%;
    padding-block: 75px;
    padding-inline: 25px;
    .dif-lines {
      padding-block: 50px;
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
    padding-block: 75px;
    padding-inline: 20px;
    width: 100%;
    background-color: #3f1168;
    color: white;
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
          background-color: rgba(255, 255, 255, 0.9);
          transform: translateY(50px);
          bottom: 0;
          .bold {
            color: #3f1168;
            font-size: 1.8rem;
          }
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
    padding-block: 75px;
    position: relative;
    background-color: #3f1168;
    color: white;
    padding-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    .cellphone-section-container {
      display: flex;
      flex-direction: row;
      max-width: 1200px;
      .cell-body {
        padding-left: 15px;
        padding-right: 20px;
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
    padding-block: 75px;
    padding-inline: 25px;
    width: 100%;
    background-color: #3f1168;
    color: white;
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

  .testimonio-section {
    padding-block: 50px;
    width: 100%;
    background-color: #3f1168;
    color: white;
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
    padding-block: 75px;
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
    padding-block: 75px;
  }

  .dudas-img {
    position: relative;
  }

  .watsap-button-only {
    position: absolute;
    cursor: pointer;
    width: 250px;
    border: none;
    padding-block: 10px;
    padding-inline: 25px;
    border-radius: 50px;
    color: #ffffff;
    background-color: #28af25;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

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
    .courses-section {
      .course-container {
        margin-inline: 8px;
        gap: 20px;
        .res {
          display: flex;
        }
        .no-res {
          display: none;
        }
      }
    }
  }
  @media (max-width: 1100px) {
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  @media (max-width: 1100px) {
    .intro-section {
      position: relative;
      .gonvarplus {
        width: 350px;
      }
      .plusgonvar {
        width: 40px;
        height: 40px;
      }
      .background-images-responsive {
        display: unset;
        width: 100%;
        .image-resp {
          position: absolute;
          bottom: -180px;
        }
        .resp-left {
          min-width: 60px;
          left: 0px;
          top: 52%;
        }
        .image-right {
          right: 0px;
          top: 52%;
          position: absolute;
          bottom: -180px;
          .white-line {
            width: 100%;
            background-color: white;
            height: 4px;
            position: absolute;
          }
        }
        .resp-right {
          min-width: 120px;
        }
      }
      .background-images {
        display: none;
        .image-contain {
          transform: unset;
          top: 200px;
        }
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
        .behind {
          display: none;
        }
        .level {
          width: 130px;
          margin-inline: 5px;
        }
        .bigger {
          width: 103px;
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
          width: 550px;
          .w-75 {
            width: unset !important;
          }
        }
      }
    }
    .cellphone-section {
      width: 100%;
      padding-right: 15px;
      .cell-body {
        text-align: center !important;
        margin: 5px;
        padding-left: 15px;
        padding-right: 10px;
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
  @media (min-width: 650px) {
    .watsap-button-ultimate {
      width: 230px;
      color: white;
      line-height: 1.5;
      img {
        width: 40px;
        height: 40px;
        margin-right: 0.5rem;
      }
    }
  }

  @media (max-width: 650px) {
    .upside-lines {
      display: none;
    }
    .resp-left {
      display: none;
    }
    .image-right {
      display: none;
    }
    .intro-section {
      .gonvarplus {
        width: 280px;
        margin-block: 0px;
        margin-top: 40px;
        margin-bottom: 20px;
      }
      h3,
      h4 {
        font-size: 20px;
        padding-inline: 20px;
      }
      button {
        padding-block: 8px;
        padding-inline: 25px;
        font-size: 14px;
      }
    }
    .courses-section {
      .special-course {
        img {
          width: 80%;
        }
      }
      .thumbnail {
        width: 270px;
        height: 150px;
      }
      .space {
        .bold {
          font-size: 18px;
          font-weight: 500;
        }
        .h1 {
          font-size: 21px;
        }
      }
      .btn {
        padding-block: 8px;
        font-size: 16px;
      }
      .group-buttons {
        width: 100%;
        .center {
          gap: 10px;
        }
      }
      h5 {
        margin-inline: 15px;
        font-size: 14px;
      }
    }
    .ubi-section {
      padding-block: 40px;
      padding-inline: 0;
      .back-ghosts {
        display: none;
      }
      .ubiImg {
        width: 380px;
      }
      .big-title {
        margin-block: 20px;
        font-size: 2rem;
      }
      .fs-3 {
        font-size: 18px !important;
        .fs-2 {
          font-size: 18px !important;
          font-weight: 600;
        }
      }
    }
    .instructores-section {
      padding-block: 20px;
      padding-block: 20px;
      .btn {
        padding: unset;
        padding-block: 5px;
        padding-inline: 30px;
        font-size: 14px;
        line-height: 18px;
      }
      h3 {
        font-size: 16px;
        padding-inline: unset;
      }
      .instructores {
        .inst-cont {
          img {
            width: 130px;
          }
          p {
            .arita {
              font-size: 18px;
            }
            b {
              font-size: 18px;
            }
            .p-pink {
              font-size: 18px;
            }
          }
        }
        .left-img {
          margin-top: 8px;
        }
        .resp-img {
          img {
            width: 123px;
          }
        }
      }
      .big-title {
        margin-block: 20px;
        font-size: 1.7rem;
      }
    }
    .difficulties-section {
      margin-block: 40px;
      .h1 {
        font-size: 21px;
      }
      h2 {
        padding-inline: 20px;
      }
      h4 {
        margin-top: 40px;
        font-weight: 500;
        font-size: 18px;
        padding-inline: 20px;
      }
      .resp-difficulty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        .container-difficulty {
          display: flex;
          gap: 15px;
          padding-inline: 20px;
          align-items: center;
          img {
            width: 100px;
          }
          .easy {
            width: 130px;
            margin-top: 20px;
          }
          .extra-margin {
            width: 120px;
            margin-top: 40px;
          }
        }
      }
    }
    .teaching-section {
      padding-block: 40px;
      padding-inline: 15px;
      h3 {
        .p-pink {
          font-weight: 600;
        }
      }
      .big-title {
        font-size: 50px;
        font-weight: 600;
      }
      .teach-lines.all-center {
        flex-direction: column;
      }
      .line-desc {
        h3 {
          font-style: italic;
        }
      }
    }
    .certificado-section {
      margin-block: 50px;
      .all-center {
        padding-inline: 30px;
      }
      .big-title {
        font-size: 45px;
      }
      .text-width {
        font-size: 20px;
        width: 100% !important;
      }
      .cert-text {
        order: 1;
        width: unset !important;
      }
      .resp-text {
        order: 3;
        text-align: start;
        margin-top: 20px;
      }
      img {
        order: 2;
        width: 350px !important;
      }
    }
    .cellphone-section {
      width: 100%;
      margin-block: 25px;
      padding-right: 15px;
      .title {
        font-size: 1.6rem !important;
        .p-pink {
          font-weight: 600;
        }
      }
      .cell-body {
        text-align: center !important;
        margin: 5px;
        padding-left: 15px;
        padding-right: 10px;
        .text-center {
          margin-block: 25px;
        }
        .back-lines {
          display: none;
        }
      }
      .subtitle {
        margin-left: 0px !important;
        display: flex;
        gap: 20px;
        padding-inline: 20px;
        img {
          order: 1;
          max-width: 130px;
          margin-left: 0px !important;
        }
        h3 {
          order: 2;
          text-align: end;
          font-size: 16px;
          min-width: 200px;
          button {
            font-weight: 500;
            margin-top: 20px;
            font-size: 11px;
            line-height: 15px;
            padding-inline: 25px;
            padding-block: 4px;
            white-space: nowrap;
          }
        }
      }
      img {
        display: unset;
      }
    }

    .benefits-section {
      margin-block: 25px;
      padding-inline: 20px;
      .title {
        padding-left: 0px;
        img {
          margin: 0px !important;
          width: 50px;
        }
        h2 {
          padding-left: 20px;
          text-align: start !important;
          font-size: 1.6rem;
        }
      }
      .list-container {
        .left-side {
          order: 2;
          .list {
            padding-left: 0px;
            img {
              width: 40px;
              height: 40px;
            }
            h5 {
              font-size: 0.9rem;
            }
          }
        }
        .benefits-ghosts {
          order: 1;
          margin-top: 20px;
          .back {
            right: -20px;
            transform: unset;
            width: 150px;
          }
          .girl {
            width: 320px;
          }
          .star {
            transform: translate(240px, 205px);
            width: 50px;
          }
        }
      }
    }

    .cost-section {
      padding-block: 25px;
      display: flex;
      flex-direction: column;
      .chica-img {
        display: unset;
        position: unset;
        margin-left: 0px !important;
        margin-bottom: 20px;
      }
      .manos {
        display: none;
      }
      .red {
        font-size: 22px;
      }
      .p-pink {
        font-size: 30px;
        margin-top: 20px;
      }
      .green {
        margin-top: 20px;
        font-size: 26px;
        font-weight: 600 !important;
      }
      .btn {
        margin-top: 20px !important;
        font-size: 0.9rem !important;
        line-height: 1.1rem;
        padding-block: 5px;
        padding-inline: 25px;
        font-weight: 600;
      }
    }

    .testimonio-section {
      .big-title {
        font-size: 44px;
        font-weight: 800;
      }
      .swiper-wrapper {
        padding-block: 20px;
      }
      .experiences-container {
        margin-inline: 0px;
        .next {
          margin-inline: 15px;
          border: none;
          .icon {
            width: 30px;
            height: 30px;
          }
        }
      }
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

    .watsap-button-only {
      padding-block: 6px;
      padding-inline: 20px;
      width: 200px;
      img {
        width: 35px;
        margin-right: 0.5rem !important;
      }
    }

    .dudas-section {
      margin-block: 35px;
      .all-center {
        flex-direction: column;
        .text-end {
          text-align: center !important;
          .p-pink {
            text-align: end !important;
          }
        }
        .dudas-img {
          .point {
            width: 450px;
          }
          .watsap-button.all-center {
            flex-direction: row;
          }
          .watsap-button {
            transform: translate(120px, -90px);
            padding-block: 6px;
            padding-inline: 10px;
            width: 200px;
            img {
              width: 25px;
              margin-right: 0.5rem !important;
            }
            p {
              margin-top: 0 !important;
              margin-bottom: 0 !important;
              font-size: 16px !important;
              line-height: 18px;
              text-align: start;
            }
          }
        }
      }
    }

    .faq-section {
      background-color: #ece7f2;
      margin-block: 0px;
      margin-inline: 0px;
      padding-block: 45px;
      padding-inline: 15px;
      width: 100%;
      .big-title {
        font-size: 50px;
      }
      .faq {
        .all-center {
          .q-container {
            width: 450px;
            background-color: transparent;
            .q {
              .title {
                text-align: start;
                width: 85%;
                font-size: 22px !important;
                margin-block: 10px !important;
                font-weight: 700 !important;
              }
            }
            .border-top {
              margin-top: 20px;
            }
          }
          .q-container.min {
            max-height: 75px;
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
  @media (max-width: 400px) {
    .upside-lines {
      display: none;
    }

    .intro-section {
      .gonvarplus {
        width: 250px;
      }
      .plusgonvar {
        width: 32px;
        height: 32px;
      }
    }
    .courses-section {
      .all-center {
        .center {
          gap: 8px;
        }
      }
      .space {
        .responsive-unset {
          .thumbnail {
            width: 320px;
            height: 170px;
          }
        }
      }
    }
    .difficulties-section {
      .resp-difficulty {
        .container-difficulty {
          img {
            width: 80px;
          }
          .easy {
            margin-top: 16px;
            width: 105px;
          }
          .extra-margin {
            width: 96px;
            margin-top: 35px;
          }
        }
      }
    }
    .teaching-section {
      .bold {
        padding-inline: 20px;
      }
      .title-size {
        font-size: 20px !important;
      }
      .teach-lines {
        gap: 60px;
      }
      h3 {
        font-size: 18px !important;
      }
      img {
        width: 150px;
      }
      .line-desc {
        h2 {
          font-size: 20px;
        }
        h3 {
          font-size: 14px !important;
        }
      }
    }
    .certificado-section {
      .big-title {
        font-size: 35px;
      }
      .all-center {
        padding-inline: 10px;
      }
      .cert-img {
        width: 300px !important;
      }
      .text-width {
        font-size: 17px;
        line-height: 24px;
      }
    }
    .cellphone-section {
      padding-right: 15px;
      .text-end {
        padding-inline: 20px;
      }
      .title {
        font-size: 1.2rem !important;
        padding-inline: 20px;
      }
      .subtitle {
        img {
          max-width: 110px;
        }
        h3 {
          font-size: 14px;
        }
      }
    }
    .benefits-section {
      .title {
        h2 {
          font-size: 1.2rem;
        }
      }
      .list-container {
        .left-side {
          margin-top: 20px;
          .list {
            margin-top: 10px;
            margin-bottom: 10px;
            h5 {
              font-size: 0.8rem;
            }
          }
        }
        .benefits-ghosts {
          .girl {
            width: 250px;
          }
          .star {
            transform: translate(185px, 165px);
            width: 40px;
          }
          .back {
            width: 120px;
            right: -10px;
          }
        }
      }
    }
    .testimonio-section {
      .big-title {
        font-size: 40px;
      }
      .experiences-container {
        .next {
          padding: 5px;
          margin-inline: 3px;
        }
      }
    }
    .faq-section {
      .big-title {
        font-size: 35px;
        margin-bottom: 30px;
      }
      .faq {
        .all-center {
          .q-container.min {
            max-height: 60px !important;
            margin-block: 5px;
          }
          .q-container.max {
            max-height: 800px;
          }
          .q-container {
            .q {
              .title {
                margin-left: 5px;
                width: 85%;
                font-size: 16px !important;
              }
            }
          }
        }
      }
    }
  }
`;
