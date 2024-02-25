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




