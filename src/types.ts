import React, {SetStateAction} from 'react';

export type ButtonProps = {
	children: string;
	isDark: boolean;
	onClick: () => void;
};

export type UpgradeProps = {
	text: string;
	price: number;
	isDark: boolean;
	clickCount: number;
	setClickCount: React.Dispatch<SetStateAction<number>>,
	setUpgrades: React.Dispatch<SetStateAction<{ passiveClick: number, x2PerClick: boolean, x3PerClick: boolean }>>
	onClick?: ({clickCount, price, setClickCount}: UpgradeProps) => void;
	upgrades: { passiveClick: number, x2PerClick: boolean, x3PerClick: boolean };
	intervalId: NodeJS.Timeout | null;
	setIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>;
	isUpgradePurchased?: any;
}

export type ControlAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	isDark: boolean,
	clickCount: number,
	upgrades: { passiveClick: number, x2PerClick: boolean, x3PerClick: boolean };
	setUpgrades: React.Dispatch<SetStateAction<{ passiveClick: number, x2PerClick: boolean, x3PerClick: boolean }>>
}

export type ClickerAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	clickCount: number,
	upgrades: { passiveClick: number, x2PerClick: boolean, x3PerClick: boolean };
}

export type FooterProps = {
	isDark: boolean;
	setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

export type CardButtonProps = {
	handleButtonClick: () => void;
}

export type ModalProps = {
	modalIsOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}