import {ClickerButton} from './CardButton.styles.ts'; // стили
import {CardButtonProps} from '../../types.ts'; // типы

export const CardButton = ({handleButtonClick}: CardButtonProps) => {

	return (
		<>
			<ClickerButton onClick={handleButtonClick}/>
		</>
	);
};