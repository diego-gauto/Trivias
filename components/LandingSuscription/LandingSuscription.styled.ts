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
	.gonvarplus {
		margin-top: 140px;
		margin-bottom: 100px;
	}
	.spacing {
		margin-top: 100px;
		margin-bottom: 100px;
	}
	div {
		width: 100%;
		margin-top: 50px;
		margin-bottom: 50px;
	}
	.background-images {
		width: 100vw;
		position: absolute;
		z-index: -1;
	}
	.p-pink {
		font-weight: 700;
		color: #d244d1;
	}
	.bold {
		font-weight: 700;
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
