import React, {SetStateAction} from 'react';

export type ButtonProps = {
	children: string | string[];
	isDark: boolean;
	onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | void) => void;
};

export type AvailableUpgradesProps = {
	passiveClick: number;
	x2PerClick: boolean;
	x3PerClick: boolean;
}

export type UpgradeProps = {
	text: string;
	price: number;
	isDark: boolean;
	clickCount: number;
	setUpgrades: React.Dispatch<SetStateAction<{ passiveClick: number, x2PerClick: boolean, x3PerClick: boolean }>>;
	onClick?: ({clickCount, price}: UpgradeProps) => void;
	upgrades: { passiveClick: number, x2PerClick: boolean, x3PerClick: boolean };
	intervalId: NodeJS.Timeout | null;
	setIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>;
	isUpgradePurchased?: boolean;
	updateAvailableUpgrades: (upgrades: string) => void;
	isAuthenticated: boolean;
	authClickCount: number;
	updateClickCount: (arg0: number, arg1: boolean) => void;
	setAuthUpgrades: React.Dispatch<React.SetStateAction<AvailableUpgradesProps>>;
	authUpgrades: AvailableUpgradesProps;
	saveAuthUpgrades: (newAuthUpgrades: AvailableUpgradesProps) => void
}

export type ControlAreaProps = {
	setClickCount: React.Dispatch<SetStateAction<number>>,
	isDark: boolean,
	clickCount: number,
	upgrades: { passiveClick: number, x2PerClick: boolean, x3PerClick: boolean };
	setUpgrades: React.Dispatch<SetStateAction<{ passiveClick: number, x2PerClick: boolean, x3PerClick: boolean }>>;
	isAuthenticated: boolean;
	authClickCount: number;
	updateClickCount: (arg0: number, arg1: boolean) => void;
	setAuthClickCount: React.Dispatch<React.SetStateAction<number>>;
	setAuthUpgrades: React.Dispatch<React.SetStateAction<AvailableUpgradesProps>>;
	authUpgrades: AvailableUpgradesProps;
	saveAuthUpgrades: (newAuthUpgrades: AvailableUpgradesProps) => void;
	isAnonymous: boolean;
}

export type ClickerAreaProps = {
	clickCount: number,
	upgrades: { passiveClick: number, x2PerClick: boolean, x3PerClick: boolean };
	isAuthenticated: boolean;
	authClickCount: number;
	updateClickCount: (arg0: number, arg1: boolean) => void;
	authUpgrades: AvailableUpgradesProps
}

export type FooterProps = {
	showModal: boolean;
	isDark: boolean;
	setIsDark: React.Dispatch<React.SetStateAction<boolean>>,
	setShowModal:  React.Dispatch<React.SetStateAction<boolean>>
	displayName?: string;
	isAnonymous?: boolean;
	handlePlayAnonymously?: () => void;
}

export type CardButtonProps = {
	handleButtonClick: () => void;
}

export type ModalProps = {
	modalIsOpen?: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
	onClose?: () => void;
}