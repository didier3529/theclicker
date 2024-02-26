import React, {SetStateAction} from 'react';

export type ControlAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	isDark: boolean,
}

export type ClickerAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	clickCount: number,
}

export type ThemeSwitcherProps = {
	isDark: boolean;
	setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}