import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	overflow: auto;
	@font-face {
		font-family: Montserrat;
		src: url(../fonts/Montserrat-VariableFont_wght.ttf);
	}
	.nav-course {
		display: none;
		background: #411369;
		padding-block: 20px;
		justify-content: space-between;
		padding-inline: 40px;
		align-items: center;
		img {
			width: 80px;
		}
		svg {
			color: #ede7f2;
			font-size: 24px;
		}
		@media (max-width: 1124px) {
			display: flex;
		}
	}
	.left-side {
		display: flex;
		flex-direction: column;
		width: 70%;
		@media (max-width: 1124px) {
			width: 100%;
		}
		.video-contain {
			position: relative;
			.next-episode {
				position: absolute;
				right: 20px;
				bottom: 20px;
				z-index: 10;
			}
		}
		.absolute {
			@media (max-width: 1450px) {
				height: auto !important;
			}
			video {
				height: 100% !important;
				object-fit: cover;
			}
		}
	}
	.certificate-container {
		display: flex;
		gap: 20px;
		align-items: center;
		width: 100%;
		p {
			margin: 0;
			color: #fff;
			font-weight: 500;
			font-style: italic;
		}
		button {
			background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
			color: #fff;
			border: none;
			width: 100%;
			padding: 5px 15px;
			p {
				animation-name: scale;
				animation-duration: 1.2s;
				animation-iteration-count: infinite;
				// transform: scale(1.1);
			}
		}
	}
`;
