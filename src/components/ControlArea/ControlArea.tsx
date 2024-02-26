import {Button} from './ControlArea.styles.ts';
import {ControlAreaProps} from '../../types.ts';
import {Modal} from '../Modal/Modal.tsx';
import {useState} from 'react';

export const ControlArea = ({setClickCount, isDark}: ControlAreaProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleNewGame = () => {
		setModalIsOpen(false);
		setClickCount(0);
	}

	return modalIsOpen ? (
		<>
			<Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
				<h2>Are u sure?</h2>
				<div>
					<Button isDark={isDark} style={{marginRight: '1em'}} onClick={() => handleNewGame()}>
						Yep
					</Button>
					<Button isDark={isDark} onClick={() => setModalIsOpen(false)}>
						Nope
					</Button>
				</div>
			</Modal>
		</>
	) : (
		<>
			<Button isDark={isDark} onClick={() => setModalIsOpen(true)}>New game</Button>
		</>
	);
};
