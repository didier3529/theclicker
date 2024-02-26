import {ClickerButton} from './CardButton.styles.ts'; // стили
import {ClickerAreaProps} from '../../types.ts'; // типы

export const CardButton = ({clickCount, setClickCount}: ClickerAreaProps) => {

	const handleButtonClick = () => {
		setClickCount(clickCount + 1);
	};

	return (
		<>
			<ClickerButton onClick={handleButtonClick}/>
		</>
	);
};