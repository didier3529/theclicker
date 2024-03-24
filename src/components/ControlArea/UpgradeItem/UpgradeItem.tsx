import {UpgradeButton, UpgradePrice} from './UpgradeItem.styles.ts';
import {UpgradeProps} from '../../../types.ts';

export const UpgradeItem = ({isDark, text, price, clickCount, setClickCount, upgrades, setUpgrades, intervalId, setIntervalId, updateAvailableUpgrades}: UpgradeProps) => {

	const isUpgradePurchased = (upgradeName: string) => {
		if (upgradeName.startsWith('Passive click lvl.')) {
			const match = upgradeName.match(/lvl\.(\d+)/);
			if (match && match[1]) {
				const level = parseInt(match[1], 10);
				return upgrades.passiveClick >= level;
			}
		} else if (upgradeName === 'X2 per click') {
			return upgrades.x2PerClick;
		} else if (upgradeName === 'X3 per click') {
			return upgrades.x3PerClick;
		}
		return false;
	};

	const handlePurchase = (upgradeName: string) => {
		if (clickCount >= price && !isUpgradePurchased(upgradeName)) {
			console.log('Покупаем улучшение');
			setClickCount(clickCount - price);
			if (upgradeName.startsWith('Passive click lvl.')) {
				const match = upgradeName.match(/lvl\.(\d+)/);
				if (match && match[1]) {
					const level = parseInt(match[1]);
					if(!isNaN(level)) {
						console.log('Уровень улучшения обновлён');
						setUpgrades(prev => ({...prev, passiveClick: level}))
					} else {
						console.log('Не удалось извлечь уровень улучшения');
					}
				} else {
					console.log('Не удалось извлечь уровень улучшения');
				}
			} else if (upgradeName === 'X2 per click') {
				console.log('Уровень улучшения обновлён');
				setUpgrades(prev => ({...prev, x2PerClick: true, x3PerClick: false}));
			} else if (upgradeName === 'X3 per click') {
				console.log('Уровень улучшения обновлён');
				setUpgrades(prev => ({...prev, x2PerClick: false, x3PerClick: true}));
			}
			updateAvailableUpgrades(upgradeName);
		} else if (clickCount < price) {
			console.log('u ar poor poop');
		}
	}

	const isThisUpgradePurchased = isUpgradePurchased(text);

	return (
		<li>
			<UpgradeButton disabled={isThisUpgradePurchased} onClick={() => handlePurchase(text)} text={text} price={price} clickCount={clickCount} isDark={isDark} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId} isUpgradePurchased={isThisUpgradePurchased} updateAvailableUpgrades={updateAvailableUpgrades}>
				<div>{text}</div>
				<UpgradePrice>{price}</UpgradePrice>
			</UpgradeButton>
			<hr/>
		</li>
	);
};
