import React from 'react';
import {ModalContent} from './Modal.styles.ts';
import {Transition} from 'react-transition-group';
import {Wrapper} from '../../App.styles.ts';

type ModalProps = {
	modalIsOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export const Modal = ({modalIsOpen, setModalIsOpen, children}: ModalProps) => {
	return (
		<>
			<Transition in={modalIsOpen} timeout={350} unmountOnExit={true}>
				{(state) => (
					<Wrapper onClick={() => setModalIsOpen(false)} style={{transition: 'opacity 0.3s'}} className={`modal-${state}`}>
						<ModalContent>
							{children}
						</ModalContent>
					</Wrapper>
				)}
			</Transition>
		</>
	);
};

