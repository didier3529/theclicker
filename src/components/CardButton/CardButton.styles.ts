import styled from '@emotion/styled';

export const ClickerButton = styled.button`
	width: 18em;
	height: 18em;
	background-size: cover;
	background-image: url('src/assets/boykisser.jpg');
	//border-radius: 20px;
	//display: flex;
	//justify-content: center;

	&:hover {
		transition: all 0.1s linear;
		border: none;
		transform: scale(1.08);
		//border: 2px solid #9d9d9d;
		//box-shadow: 0px 0px 30px #9d9d9d;
	}
`;