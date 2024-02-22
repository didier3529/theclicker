import {ClickerButton} from './CardButton.styles.ts';
import React, {SetStateAction} from 'react';

type CardButtonProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>;
	clickCount: number;
}

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