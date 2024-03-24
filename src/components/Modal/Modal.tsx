import {ModalContent} from './Modal.styles.ts';
import {Transition} from 'react-transition-group';
import {Wrapper} from '../../App.styles.ts';
import {ModalProps} from '../../types.ts';

export const Modal = ({modalIsOpen, children}: ModalProps) => {
	const handleModalClick = (event: any) => {
		event.stopPropagation();
	};

	return (
		<>
			<Transition in={modalIsOpen} timeout={350} unmountOnExit={true}>
				{(state) => (
					<Wrapper style={{transition: 'opacity 0.3s'}} className={`modal-${state}`}>
						<ModalContent onClick={handleModalClick}>
							{children}
						</ModalContent>
					</Wrapper>
				)}
			</Transition>
		</>
	);
};

