// @ts-ignore
import styled from '@emotion/styled';
import {ButtonProps} from './types.ts';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
	&.modal-entering, .modal-entered {
		opacity: 1;
	}
	&.modal-entering .modal-content, .modal-entered .modal-content {
		transform: translateY(0);
	}
	&.modal-exiting, .modal-exited {
		opacity: 0;
	}
	&.modal-exiting .modal-content, .modal-exited .modal-content {
		transform: translateY(-50px);
	}
`;

export const LogoWrapper = styled.div`
	@media screen and (max-width: 600px) {
		margin-top: 4em;
	}
	margin-top: 9em;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
`

export const AppWrapper = styled.div`
	@media screen and (max-width: 600px) {
		margin-bottom: 25%;
	}
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
`

export const Input = styled.input`
	-webkit-text-size-adjust: 100%;
	padding: 10px;
	margin-top: 0.2em;
	border-radius: 5px;
	font-size: 0.9em;
	border: 1.5px solid #5d5d5d;
	font-family: 'Press Start 2P', system-ui;
	width: 22em;
	touch-action: manipulation;
	

	&:focus {
		outline: #5d5d5d double 0.2em;
		box-shadow: 0 0 10px #f8f4ef;
	}
`

export const SwitchButton = styled.button<ButtonProps>`
	@media screen and (max-width: 430px) {
		font-size: 93%;
		text-align: start;
	}
	margin: 1.5em;
	cursor: pointer;
	color: #FEFEFE;
	font-family: 'Press Start 2P', system-ui;

	&:hover {
		color: #5d5d5d;
	}

	${props => props.isDark === true && `
		color: #5d5d5d;
		&:hover {
			color: #797979;
		}
  `}
}
`

export const Form = styled.form`
	@media screen and (max-width: 450px) {
		padding-top: 3%
	}
	padding-top: 3%;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
`




