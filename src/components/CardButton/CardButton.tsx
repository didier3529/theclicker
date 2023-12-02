import {ClickerButton} from './CardButton.styles.ts';
import React, {useState} from 'react';

export const CardButton: React.FC = () => {
	const [clickCount, setClickCount] = useState<number>(0);

	const handleButtonClick = () => {
		setClickCount(clickCount + 1);
	};

	return (
		<>
				<ClickerButton onClick={handleButtonClick}/>
				<p style={{display: 'flex'}}>count: {clickCount}</p>
		</>
	);
};