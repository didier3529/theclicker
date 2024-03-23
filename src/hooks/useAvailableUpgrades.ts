import {AvailableUpgradesProps} from '../types.ts';
import {useEffect, useState} from 'react';

export const useAvailableUpgrades = () => {
	const initialAvailableUpgrades = localStorage.getItem('availableUpgrades');
	const [availableUpgrades, setAvailableUpgrades] = useState<AvailableUpgradesProps>(initialAvailableUpgrades ? JSON.parse(initialAvailableUpgrades) : {
		passiveClick: 1,
		x2PerClick: false,
		x3PerClick: false,
	});

	useEffect(() => {
		localStorage.setItem('availableUpgrades', JSON.stringify(availableUpgrades));
	}, [availableUpgrades])

	const updateAvailableUpgrades = (upgradeName: string) => {
		if (upgradeName.startsWith('Passive click lvl.')) {
			const match = upgradeName.match(/lvl\.(\d+)/);
			if (match && match[1]) {
				const level = parseInt(match[1], 10);
				if (level === 1) {
					setAvailableUpgrades(prev => ({...prev, passiveClick: 2}));
				} else if (level === 2) {
					setAvailableUpgrades(prev => ({...prev, passiveClick: 3}));
				}
			}
		}
	};
	return { availableUpgrades, updateAvailableUpgrades };
}