import React, {SetStateAction} from 'react';

export type ButtonProps = {
	children: string;
	isDark: boolean;
	onClick: () => void;
};

export type UpgradeProps = {
	children?: React.ReactNode;
	text?: string;
	price?: number;
	isDark: boolean;
}

export type ControlAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	isDark: boolean,
}

export type ClickerAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	clickCount: number,
}

export type FooterProps = {
	isDark: boolean;
	setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

export type CardButtonProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	clickCount: number,
}

export type ModalProps = {
	modalIsOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}