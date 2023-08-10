import styled, { css } from 'styled-components';

export const NotificationContainer = styled.div<{ not: boolean }>`
	position: absolute;
	margin: 10px;
	cursor: auto;
	transition: 0.4s ease-in-out;
	background-color: #dad3e5;
	height: 0;
	opacity: 0;
	top: 46px;
	right: -545px;
	box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.2);
	padding-top: 20px;
	border-radius: 10px 10px 10px 10px;
	width: 400px;
	z-index: 20;
	gap: 10px;
	color: #d244d1;
	display: flex;
	flex-direction: column;
	max-height: 0;
	${(props) =>
		props.not &&
		css`
			max-height: 340px;
			height: 350px;
			transition: 0.4s ease-in-out;
			opacity: 1;
			right: -145px;
			::-webkit-scrollbar {
				background: white;
				border-radius: 10px;
				width: 10px;
			}
			::-webkit-scrollbar-thumb {
				width: 10px;
				background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
				border-radius: 10px;
			}
		`}
	p,
  h1 {
		margin: 0;
	}
	.close-circle {
		border-radius: 100%;
		border: 1px solid #3f1168;
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		.icon {
			width: 10px;
			height: 10px;
		}
	}
	.title {
		font-size: 18px;
		font-weight: 800;
	}
	.title-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 20px;
		min-height: 22px;
	}
	.read-all-tag {
		font-size: 12px;
		color: #d244d1;
		cursor: pointer;
		font-weight: 800;
	}
	.all-notifications {
		display: flex;
		flex-direction: column;
		max-height: 250px;
		min-height: 250px;
		overflow: auto;
		::-webkit-scrollbar {
			background: white;
			border-radius: 10px;
			width: 10px;
		}
		::-webkit-scrollbar-thumb {
			width: 10px;
			background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
			border-radius: 10px;
		}
		.empty-notifications {
			height: 100%;
			background-color: white;
			justify-content: center;
			display: flex;
			align-items: center;
			font-size: 20px;
			font-weight: 600;
		}
	}
`;
export const NotificationData = styled.div<{
	status: boolean;
	newStatus: boolean;
}>`
	.hr-line {
		color: #3f1168;
		margin: 0;
	}
	.notification-data {
		display: flex;
		padding: 15px;
		gap: 20px;
		cursor: pointer;
		background-color: #ece8f0;
		${(props) =>
			(props.status || props.newStatus) &&
			css`
				background-color: white;
			`};
		&:hover {
			background-color: #c4aade;
		}
		.like-and-comment {
			position: relative;
		}
		.notification-image {
			align-self: center;
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
		.corner {
			position: absolute;
			bottom: 0;
			left: 60%;
		}
		.notification-texts {
			display: flex;
			flex-direction: column;
			p {
				margin: 0;
			}
			.notification-info {
				color: #d244d1;
				font-size: 12px;
				font-weight: 500;
				span {
					color: #3f1168;
					font-size: 14px;
					font-weight: 800;
				}
			}
			.date-text {
				font-size: 10px;
				font-weight: 600;
				color: #868686;
			}
			.comment-icon {
				color: #e68a0d;
			}
			.like-icon {
				color: red;
			}
		}
	}
`;
