import styled from "styled-components";

export const SuscriptionContain = styled.div`
	position: relative;
	text-align: center;
	color: #3f1168;
	width: 100%;
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
	.gonvarplus {
		margin-top: 140px;
		margin-bottom: 100px;
	}

	.subtitle {
		font-size: large;
	}
	.est-w {
		width: 1200px;
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
	.spacing {
		margin-top: 100px;
		margin-bottom: 100px;
		.list {
			width: fit-content;
			margin-bottom: 20px;
			margin-top: 20px;
			padding-left: 50px;
			display: flex;
			align-items: center;
			text-align: start;
		}
	}
	div {
		width: 100%;
		margin-top: 50px;
		margin-bottom: 50px;
	}

	.group-buttons {
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
			margin-top: 25px;
			margin-bottom: 25px;
			display: flex;
			justify-content: center;
		}
	}

	.back-ghosts {
		position: absolute;
		z-index: -1;
		.g-1 {
			transform: translateX(-140px);
		}
		.g-2 {
			transform: translateX(320px) translateY(200px);
		}
		.g-3 {
			transform: translateX(-650px) translateY(250px);
		}
	}
	.intro {
		position: relative;
		max-width: 2000px;
		.background-images {
			//transform: translateY(450px);
			top: 0;
			width: 100%;
			position: absolute;
			z-index: -1;
		}
	}

	.cellphone-section {
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

	.certificado-section {
		width: 1200px;
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
	}

	.testimonio-section {
		width: 1200px;
		.testimonio-container {
			display: flex;
			justify-content: center;
			gap: 25px;
		}
	}

	.right-img {
		width: fit-content;
	}
	.p-pink {
		font-weight: 700;
		color: #d244d1;
	}
	.bold {
		font-weight: 700;
	}
	.bolder {
		font-weight: 800 !important;
	}
	.row {
		margin-top: 50px;
		margin-bottom: 50px;
	}
	.big-title {
		font-size: 65px;
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
	.chica-img {
		width: 450px;
	}
	.side-images {
		display: flex;
		justify-content: space-between;
		position: absolute;
		transform: translateY(-50px);
		z-index: -1;
	}
	.rotate-img {
		-webkit-transform: scaleX(-1);
		-moz-transform: scaleX(-1);
		-o-transform: scaleX(-1);
		transform: scaleX(-1);
	}
	.dif-lines {
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

	.teach-lines {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		.lines {
			position: relative;
			width: 30%;
			.line-desc {
				position: absolute;
				background-color: #ffffff;
				transform: translateY(-90px);
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
			width: 350px;
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

	.faq {
		div {
			margin: 0;
		}
		.q-container {
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

	.card-container {
		position: relative;
		z-index: 1;
		display: inline-flex;
		justify-content: center;
		width: 70%;
		.points {
			&:hover {
				background: linear-gradient(to bottom right, #ff8900, #d244d1, #962dec);
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
			max-width: 350px;
			min-width: 310px;
			min-height: 450px;
			border-radius: 55px;
			box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
			margin: 30px;
			.normal-card {
				transition: 0.2s ease;
				display: unset;
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
			.title-img {
				position: absolute;
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

	.footer-footer {
		margin: 0;
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
`;
