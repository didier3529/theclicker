import {UpgradeButton, UpgradePrice} from './UpgradeItem.styles.ts';
import {UpgradeProps} from '../../../types.ts';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
export const UpgradeItem = ({isDark, text, price, clickCount, upgrades, setUpgrades, intervalId, setIntervalId, updateAvailableUpgrades, isAuthenticated, authClickCount, updateClickCount, authUpgrades, setAuthUpgrades, saveAuthUpgrades}: UpgradeProps) => {

	const currentUpgrades = isAuthenticated ? authUpgrades : upgrades;

	useEffect(() => {
		localStorage.setItem('upgrades', JSON.stringify(currentUpgrades));
	}, [currentUpgrades]);

	const isUpgradePurchased = (upgradeName: string) => {
		const currentUpgrades = isAuthenticated ? authUpgrades : upgrades;
		if (upgradeName.startsWith('Passive click lvl.')) {
			const match = upgradeName.match(/lvl\.(\d+)/);
			if (match && match[1]) {
				const level = parseInt(match[1], 10);
				return currentUpgrades.passiveClick >= level;
			}
		} else if (upgradeName === 'X2 per click') {
			return currentUpgrades.x2PerClick;
		} else if (upgradeName === 'X3 per click') {
			return currentUpgrades.x3PerClick;
		}
		return false;
	};

	const handlePurchase = async (upgradeName: string) => {
		const setCurrentUpgrades = isAuthenticated ? setAuthUpgrades : setUpgrades;
		const count = isAuthenticated ? authClickCount : clickCount;
		if (count >= price && !isUpgradePurchased(upgradeName)) {
			console.log('Покупаем улучшение');
			updateClickCount(count - price, isAuthenticated);
			if (upgradeName.startsWith('Passive click lvl.')) {
				const match = upgradeName.match(/lvl\.(\d+)/);
				if (match && match[1]) {
					const level = parseInt(match[1]);
					console.log(level);
					if (!isNaN(level)) {
						if (isAuthenticated) {
							setAuthUpgrades(prev => ({
								...prev,
								passiveClick: level
							}));
						} else {
							setUpgrades(prev => ({
								...prev,
								passiveClick: level
								// @ts-ignore
							}))
						}
					} else {
						console.log('Не удалось извлечь уровень улучшения');
					}
				} else {
					console.log('Не удалось извлечь уровень улучшения');
				}
			} else if (upgradeName === 'X2 per click') {
				setCurrentUpgrades(prev => ({
					...prev,
					x2PerClick: true,
					x3PerClick: false
				}));
				console.log('Уровень улучшения обновлён');
			} else if (upgradeName === 'X3 per click') {
				setCurrentUpgrades(prev => ({
					...prev,
					x2PerClick: false,
					x3PerClick: true
				}));
				console.log('Уровень улучшения обновлён');
			}
			updateAvailableUpgrades(upgradeName);
		} else if (count < price) {
			toast.error('u ar poor poop');
		}
	}

	const isThisUpgradePurchased = isUpgradePurchased(text);

	return (
		<li>
			<UpgradeButton saveAuthUpgrades={saveAuthUpgrades} authUpgrades={authUpgrades} setAuthUpgrades={setAuthUpgrades} updateClickCount={updateClickCount} isAuthenticated={isAuthenticated} authClickCount={authClickCount} disabled={isThisUpgradePurchased} onClick={() => handlePurchase(text)} text={text} price={price} clickCount={clickCount} isDark={isDark} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId} isUpgradePurchased={isThisUpgradePurchased} updateAvailableUpgrades={updateAvailableUpgrades}>
				<div>{text}</div>
				<UpgradePrice>{price}</UpgradePrice>
			</UpgradeButton>
			<hr/>
		</li>
	);
};
