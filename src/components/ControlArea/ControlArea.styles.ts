import styled from '@emotion/styled';
import {ButtonProps} from '../../types.ts';

export const UpgradeList = styled.ul`
	width: 100%;
	padding: 0;
`

export const ModalContentWrapper = styled.div`
	display: flex;
	align-items: flex-start; 
`;

export const UpgradeListWrapper = styled.div`
	flex: 0 0 auto; 
	margin-right: 20px; 
	width: 100%;
`;

export const ControlAreaWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	transition: transform 0.3s;
	max-width: 16em;
	width: 50%;
`

export const Button = styled.button<ButtonProps>`
	border: 1.5px solid #5d5d5d;
	color: #FEFEFE;
	background-color: #5d5d5d;
	border-radius: 5px;
	margin: 1.5em 0em 0em 0em;
	font-family: 'hack', sans-serif;
	font-size: 1.2em;
	padding: 6px;

	&:hover {
		background-color: #FEFEFE;
		color: #c0c0bf;
		transition: all 0.1s ease-in-out;
		transform: scale(1.1);
	}

	&:active {
		transform: scale(1.2);
	}

	${props => props.isDark === false && `
		background-color: #FEFEFE;
		color: #5d5d5d;
		border-color: #FEFEFE;
		&:hover {
			background-color: #5d5d5d;
			color: #FEFEFE;
		}
  `}
`
