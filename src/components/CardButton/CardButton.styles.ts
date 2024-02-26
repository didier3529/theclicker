import styled from '@emotion/styled';

export const ClickerButton = styled.button`
	width: 20em;
	height: 22em;
	background-image: url('../../../public/static/images/boykisser.png');
	background-size: 22em;
	background-position: bottom;
	background-repeat: no-repeat;
	margin-top: 4em;
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