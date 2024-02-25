import {Button} from './ControlArea.styles.ts';
import {ClickerProps} from '../../types.ts';
import {Modal} from '../Modal/Modal.tsx';
import {useState} from 'react';

export const ControlArea = ({setClickCount}: ClickerProps) => {
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
					<Button style={{marginRight: '1em'}} onClick={() => handleNewGame()}>
						Yep
					</Button>
					<Button onClick={() => setModalIsOpen(false)}>
						Nope
					</Button>
				</div>
			</Modal>
		</>
	) : (
		<>
			<Button onClick={() => setModalIsOpen(true)}>New game</Button>
		</>
	);
};
