import {ClickerButton} from './CardButton.styles.ts'; // стили
import {ClickerProps} from '../../types.ts'; // типы

export const CardButton = ({clickCount, setClickCount}: ClickerProps) => {

	const handleButtonClick = () => {
		setClickCount(clickCount + 1);
	};

	return (
		<>
			<ClickerButton onClick={handleButtonClick}/>
		</>
	);
};