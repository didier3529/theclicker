import {UpgradeButton, UpgradePrice} from './UpgradeItem.styles.ts';
import {UpgradeProps} from '../../../types.ts';

export const UpgradeItem = ({isDark, text, price, clickCount, setClickCount, upgrades, setUpgrades, intervalId, setIntervalId}: UpgradeProps) => {

	const isUpgradePurchased = text.startsWith('Passive click lvl.') ? upgrades.passiveClick >= parseInt(text.match(/lvl\.(\d+)/)?.[1] || '0', 10) : (upgrades as any)[text.replace(' per click', '')];
	const handlePurchase = (upgradeName: string) => {
		if (clickCount >= price && !isUpgradePurchased) {
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
				setUpgrades(prev => ({...prev, x2PerClick: false, x3PerClick: true}));
			} else if (upgradeName === 'X3 per click') {
				console.log('Уровень улучшения обновлён');
				setUpgrades(prev => ({...prev, x2PerClick: true, x3PerClick: false}));
			}
		} else {
			console.log('u ar poor poop');
		}
	}

	return (
		<li>
			<UpgradeButton disabled={isUpgradePurchased} onClick={() => handlePurchase(text)} text={text} price={price} clickCount={clickCount} isDark={isDark} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId} isUpgradePurchased={isUpgradePurchased}>
				<div>{text}</div>
				<UpgradePrice>{price}</UpgradePrice>
			</UpgradeButton>
			<hr/>
		</li>
	);
};
