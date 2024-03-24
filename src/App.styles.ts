// @ts-ignore
import styled from '@emotion/styled';

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

export const Input = styled.input`
	-webkit-text-size-adjust: 100%;
	padding: 10px;
	border-radius: 5px;
	border: 1.5px solid #5d5d5d;
	font-family: 'Press Start 2P', system-ui;
	width: 22em;
	touch-action: manipulation;
	

	&:focus {
		outline: #5d5d5d double 0.2em;
		box-shadow: 0 0 10px #f8f4ef;
	}
`

export const Form = styled.form`
	padding-top: 30%;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
`




