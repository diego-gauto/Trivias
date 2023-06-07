import styled from 'styled-components';

export const PlanStyles = styled.div`
	.plans {
		--purple-pink: #cb5cc0;
		--blue: #6b77f5;
		--green: #149e62;
		--purple-pink2: #b746cd;
		--purple: #3f1168;
		.colors {
			.back {
				background-color: #ece7f2;
			}
			.break {
				background-color: #dad3e5;
			}
			.purple-pink {
				color: var(--purple-pink);
			}
			.blue {
				color: #6b77f5;
			}
			.green {
				color: #149e62;
			}
			.purple-pink2 {
				color: #b746cd;
			}
			.purple {
				color: #3f1168;
			}
			.Back-p-pink {
				background-color: var(--purple-pink);
			}
			.Back-blue {
				background-color: #6b77f5;
			}
			.Back-green {
				background-color: #149e62;
			}
			.Back-p-pink2 {
				background-color: #b746cd;
			}
		}
		span {
			font-weight: 500;
			color: #3f1168;
			font-size: small;
		}
		.plan-container {
			box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
			border-radius: 14px;
			padding-bottom: 15px;
			.header {
				.top-tab {
					border-radius: 14px 14px 0px 0px;
					width: 100%;
					height: 20px;
				}
				.title {
					img {
						self-align: center;
						height: 100%;
					}
					display: flex;
					justify-content: center;
				}
				.b-p-pink {
					border-bottom: 1px solid #cb5cc0;
				}
				.b-blue {
					border-bottom: 1px solid var(--blue);
				}
				.b-green {
					border-bottom: 1px solid var(--green);
				}
				.b-p-pink2 {
					border-bottom: 1px solid var(--purple-pink2);
				}
				.purple-button {
					border: none;
					border-radius: 24px;
					color: #ffffff;
					background-color: #3f1168;
				}
			}

			.main-body {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.tip {
					cursor: pointer;
					font-size: small;
					padding: 15px;
					border-radius: 14px;
					.just {
						text-align: justify;
					}
					.tip-q {
						align-items: center;
						display: flex;
						justify-content: space-between;
					}
					.tip-icon {
						color: #ffffff;
						min-width: 20px;
						min-height: 20px;
						align-self: center;
						border-radius: 100%;
					}
					.b-p-pink {
						border-top: 1px solid #cb5cc0;
					}
					.b-blue {
						border-top: 1px solid var(--blue);
					}
					.b-green {
						border-top: 1px solid var(--green);
					}
					.b-p-pink2 {
						border-top: 1px solid var(--purple-pink2);
					}
				}
			}
		}
	}
`;
