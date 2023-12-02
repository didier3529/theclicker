import styled from '@emotion/styled';

export const ClickerButton = styled.button`
	width: 300px;
	height: 300px;
	border-radius: 20px;
	background-size: cover;
	background-image: url('src/assets/deli_karimova.jpg');
	display: flex;
	justify-content: center;

	&:hover {
		transition: all 1.5s ease;
		border: 2px solid #a9a4cc;
		transform: scale(1.03);
		box-shadow: 0px 0px 30px #a9a4cc;
	}
`;