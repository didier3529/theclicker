import React, {SetStateAction} from 'react';

export type ClickerProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	clickCount: number,
}