import {Button} from './ControlArea.styles.ts';
import {ClickerProps} from '../../types.ts';

export const ControlArea = ({setClickCount}: ClickerProps) => {
	const handleNewGame = () => {
		setClickCount(0);
	}

	return (
		<>
			<Button onClick={() => handleNewGame()}>New game</Button>
		</>
	);
};
