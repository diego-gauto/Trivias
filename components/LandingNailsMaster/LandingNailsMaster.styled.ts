import styled from 'styled-components';

export const SuscriptionContain = styled.div`
	margin: 5px;
	width: 100%;
	color: #3f1168;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	.yellow {
		color: #ff9c00;
	}
	.light-p {
		color: #952cee;
	}
	.fechas {
		margin-bottom: 100px;
	}
	.section {
		width: 100%;
		position: relative;
		margin-top: 75px;
		margin-bottom: 75px;
		.left-img {
			z-index: -1;
			position: absolute;
			left: 0;
		}
		.right-img-1 {
			z-index: -1;
			position: absolute;
			right: 0;
			transform: translateY(-300px);
		}
		.right-img-2 {
			z-index: -1;
			position: absolute;
			right: 0;
		}
	}
	.stars {
		height: 40px;
	}

	.space {
		margin-top: 25px;
		margin-bottom: 25px;
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
		padding-top: 75px;
		padding-bottom: 75px;
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
			.text {
				text-align: start;
				h2 {
					.subtitle {
						font-size: x-large;
						font-weight: unset;
					}
				}
				.uñas {
					max-width: 800px;
					display: flex;
					.uñas-q {
						margin-bottom: 15px;
						flex-direction: column;
						margin: 10px;
						.uñas-q-container {
							transition: 0.3s ease;
							margin: 10px;
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
			width: 450px;
			height: 450px;
			justify-content: center;
			p {
				align-self: center;
			}
		}
		.info-video {
			margin: 10px;
			text-align: start;
			align-self: center;
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
				width: 1200px;
				.course-detail {
					margin: 20px;
					display: flex;
					.icon {
						margin-right: 30px;
						width: 30px;
						height: 30px;
					}
					p {
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
					h2 {
						margin-block: 30px;
					}
					p {
						font-style: italic;
						font-weight: 700;
					}
					.red {
						color: #ff1616;
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
				transform: translateX(-100px);
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
							font-size: x-large;
							font-style: italic;
							font-weight: 700;
							color: #ffffff;
							border-radius: 28px;
							background-color: #3f1168;
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
				width: 950px;
				gap: 15px;
				.card {
					border: none;
					background-color: transparent;
					max-width: 280px;
				}
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
			margin-block: 15px;
			display: flex;
			justify-content: center;
			gap: 15px;
			.side {
				width: 550px;
				.subject {
					text-align: start;
					margin: 20px;
					.num {
						transform: translateX(-25px);
					}
					.title {
						transform: translateX(-20px);
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
		h2 {
			font-weight: 700;
		}
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
		p {
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
					margin-bottom: 10px;
					display: flex;
					justify-content: space-between;
					.title {
						margin-top: 15px;
						margin-left: 15px;
						font-weight: 800;
						font-size: large;
						width: 80%;
						text-align: start;
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

	@media (max-width: 550px) {
		.section {
			.left-img {
				display: none;
			}
			.right-img-1 {
				display: none;
			}
			.right-img-2 {
				display: none;
			}
		}
		.info {
			.info-top {
				flex-direction: column;
				.text {
					.title {
						margin: 15px;
					}
					.uñas {
						.uñas-q {
							margin: 5px;
							.uñas-q-container {
								width: 90%;
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
		}

		.arita-section {
			.image-quote {
				width: unset;
				.image {
					position: absolute;
					bottom: 0;
					height: 350px;
					transform: translateX(-60px);
				}
			}
			.text {
				width: 400px;
				transform: translate(0px, 0px);
				.p-pink {
					width: 300px;
				}
				.sangria {
					width: 250px;
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
					width: 450px;
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
			.left-side {
				width: 450px;
				.p-pink {
					font-size: 50px;
				}
			}
			.right-side {
				.float-bottom {
					width: 100%;
					position: relative;
					transform: translate(40px, 70px);
				}
			}
		}

		.rewards-section {
			.rewards-container {
				width: unset;
				flex-direction: column;
				.points-rewards {
					.display-row {
						flex-direction: column;
					}
				}
			}
		}

		.experiences-section {
			.experiences-container {
				.experiences {
					display: none;
				}
				.experiences.resp {
					display: flex;
				}
			}
		}

		.subject-section {
			.subject-container {
				.side {
					width: 215px;
				}
			}
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
					width: 450px;
				}
				.q-container.min {
					max-height: 68px;
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
`;
