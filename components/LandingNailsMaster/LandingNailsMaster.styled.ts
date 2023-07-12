import styled from 'styled-components';

export const SuscriptionContain = styled.div`
	width: 100%;
	color: #3f1168;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	.light-p {
		color: #952cee;
	}
	.fechas {
		margin-bottom: 100px;
	}
	.section {
		margin-top: 75px;
		margin-bottom: 75px;
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
		&.left-right {
			background-image: linear-gradient(to right, #9e2fea, #c940d7);
		}
		&.up-down {
			background-image: linear-gradient(to top, #9e2fea, #c940d7);
		}
	}

	.info {
		margin-top: 75px;
		margin-bottom: 75px;
		.info-top {
			display: flex;
			justify-content: center;
			.text {
				text-align: start;
				h1 {
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
							margin: 10px;
							overflow: hidden;
							max-height: 55px;
							cursor: pointer;
							width: 100%;
							padding: 10px;
							border: none;
							border-radius: 14px;
							background-color: #edf3f8;
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
							transition: 0.2s ease;
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
			.card {
				width: 310px;
			}
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
