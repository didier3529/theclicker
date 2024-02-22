import styled from '@emotion/styled';

export const Button = styled.button`
	border: 1.5px solid #5d5d5d;
	color: #FEFEFE;
	background-color: #5d5d5d;
	border-radius: 5px;
	margin: 1em 0em 0em 0em;
	font-family: 'Hack', serif;
	font-size: 0.8em;
	padding: 5px;
	&:hover {
		background-color: #FEFEFE;
		color: #5d5d5d;
		transition: all 0.1s ease-in-out;
		transform: scale(1.1);
	}
	&:active {
		transform: scale(1.2);
	}
`
