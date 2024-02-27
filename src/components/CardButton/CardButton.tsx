import {ClickerButton} from './CardButton.styles.ts'; // стили
import {CardButtonProps} from '../../types.ts'; // типы

export const CardButton = ({clickCount, setClickCount}: CardButtonProps) => {

	const handleButtonClick = () => {
		setClickCount(clickCount + 1);
	};

	return (
		<>
			<ClickerButton onClick={handleButtonClick}/>
		</>
	);
};