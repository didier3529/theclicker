import styled from '@emotion/styled';

type ButtonProps = {
	children: string;
	isDark: boolean;
	onClick: () => void;
};

export const Button = styled.button<ButtonProps>`
	border: 1.5px solid #5d5d5d;
	color: #FEFEFE;
	background-color: #5d5d5d;
	border-radius: 5px;
	margin: 1.5em 0em 0em 0em;
	font-family: 'Hack', serif;
	font-size: 1.4em;
	padding: 6px;

	&:hover {
		background-color: #FEFEFE;
		color: #5d5d5d;
		transition: all 0.1s ease-in-out;
		transform: scale(1.1);
	}

	&:active {
		transform: scale(1.2);
	}

	${props => props.isDark === true && `
		background-color: #FEFEFE;
		color: #5d5d5d;
		border-color: #FEFEFE;
		&:hover {
			background-color: #5d5d5d;
			color: #FEFEFE;
		}
  `}
`
