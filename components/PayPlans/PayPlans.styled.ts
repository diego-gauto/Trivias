import styled from 'styled-components';

export const PayStyles = styled.div`
	p,
	h1,
	h2,
	h3 {
		font-weight: bolder;
		color: #3f1168;
	}
	p {
		i {
			font-weight: 500 !important;
		}
	}
	.colors {
		.back {
			background-color: #ece7f2;
		}
		.break {
			background-color: #dad3e5;
		}
		.yellow {
			color: #ff9f00;
		}
		.purple-pink {
			color: #d244d1;
		}
		.purple {
			color: #3f1168;
		}
	}

	.no-bold {
		font-weight: unset;
	}
	.middle {
		display: flex;
		justify-content: center;
		width: 90%;
	}

	.faq {
		.faq-bold {
			font-size: large;
		}
	}
`;
