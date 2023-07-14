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
		margin-block: 100px;
		.gonvarplus {
			margin-block: 90px;
		}
	}

	.courses-section {
		width: 100%;
		margin-block: 50px;
		.group-buttons {
			width: 1200px;
			margin-top: 25px;
			margin-bottom: 25px;
			button {
				font-style: italic;
				margin-inline: 25px;
				border: none;
				border-radius: 16px;
				color: white;
				padding-inline: 30px;
				background-image: linear-gradient(to right bottom, #aa1bc4, #eb7c2d);
			}
			.center {
				gap: 25px;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
			}
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
				transform: translateX(-525px);
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
		.cert-text {
			text-align: start;
		}
	}

	.cellphone-section {
		margin-block: 75px;
		width: 1200px;
		position: relative;
		.cell-body {
			.back-lines {
				position: absolute;
				z-index: -1;
				.line-1 {
					transform: translate(-70px, -120px);
				}
				.line-2 {
					transform: translate(180px, 195px);
				}
				.line-3 {
					transform: translate(100px, -230px);
				}
			}
		}
	}

	.benefits-section {
		width: 100%;
		margin-block: 75px;
		.list {
			width: fit-content;
			margin-bottom: 20px;
			margin-top: 20px;
			padding-left: 10px;
			display: flex;
			align-items: center;
			text-align: start;
		}
		.benefits-ghosts {
			position: relative;
			z-index: 0;
			.girl {
				z-index: 1;
			}
			.star {
				position: absolute;
				transform: translateX(-120px) translateY(320px);
			}
			.back {
				position: absolute;
				transform: translateX(250px) translateY(-30px);
				z-index: -1;
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
			width: 350px;
		}
		.manos {
			position: absolute;
			right: 0;
			width: 350px;
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
			flex-wrap: wrap;
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
		margin-block: 75px;
		.testimonio-container {
			display: flex;
			justify-content: center;
			gap: 25px;
		}
		.testimonio-container.res {
			display: none;
		}
	}

	.inspo-section {
		overflow: hidden;
		width: 90%;
		margin-block: 75px;
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
					margin-bottom: 10px;
					display: flex;
					justify-content: space-between;
					.title {
						margin-top: 15px;
						margin-left: 15px;
						font-weight: 700;
						font-size: large;
					}
					.icon {
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
				max-height: 60px;
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
					width: 550px;
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

		.testimonio-section {
			.testimonio-container {
				display: none;
			}
			.testimonio-container.res {
				display: flex;
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
