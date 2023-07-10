import styled from 'styled-components';

export const SuscriptionContain = styled.div`
	position: relative;
	text-align: center;
	color: #3f1168;
	border: 1px solid black;
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
	.miniLogo {
		width: 75px;
	}
	.subtitle {
		font-size: large;
	}
	.spacing {
		margin-top: 100px;
		margin-bottom: 100px;
		.list {
			margin-bottom: 20px;
			margin-top: 20px;
			padding-left: 50px;
			display: flex;
			align-items: center;
		}
	}
	div {
		width: 100%;
		margin-top: 50px;
		margin-bottom: 50px;
	}
	.background-images {
		background-size: cover;
	}
	.right-img {
		transform: translateX(-400px);
		z-index: -1;
		position: absolute;
		display: flex;
		justify-content: flex-end;
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

	.email-send {
		padding: 8px;
		width: fit-content;
		position: relative;
		border: none;
		border-radius: 14px;
		background-color: #edf3f8;
		.email-input {
			width: 450px;
			background-color: transparent;
			border: none;
			outline: none;
		}
		.email-button {
			border: none;
			border-radius: 10px;
			color: #ffffff;
			background-color: #d244d1;
		}
	}

	.faq {
		.faq-bold {
			font-size: large;
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
		display: inline-flex;
		justify-content: center;
		width: 70%;
		.reward-card {
			position: relative;
			width: 310px;
			border-radius: 55px;
			box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
			margin: 20px;
			.blue {
				color: #3965f8;
			}
			.teal {
				color: #11c378;
			}
			.title-img {
				position: absolute;
			}
		}
	}

	.group-buttons {
		margin-top: 25px;
		margin-bottom: 25px;
		width: 100%;
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
`;
