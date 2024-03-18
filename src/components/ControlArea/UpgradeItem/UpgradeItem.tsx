import {UpgradeButton, UpgradePrice} from './UpgradeItem.styles.ts';
import {UpgradeProps} from '../../../types.ts';
import {useEffect, useMemo} from 'react';

export const UpgradeItem = ({isDark, text, price, clickCount, setClickCount, upgrades, setUpgrades, intervalId, setIntervalId}: UpgradeProps) => {

	const interval = useMemo(() => {
		console.log('set interval');
		if (upgrades.passiveClick > 0) {
			return setInterval(() => {
				setClickCount(prev => prev + 1);
			}, 3000 / upgrades.passiveClick);
		}
		return null;
	}, [upgrades.passiveClick, setClickCount]);

	useEffect(() => {
		console.log('useEffect');
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		}
	}, [interval]);

	const handlePurchase = (upgradeName: string) => {
		if (clickCount >= price) {
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
				setUpgrades(prev => ({...prev, x2PerClick: true}));
			} else if (upgradeName === 'X3 per click') {
				console.log('Уровень улучшения обновлён');
				setUpgrades(prev => ({...prev, x3PerClick: true}));
			}
		} else {
			console.log('u ar poor poop');
		}
	}

	return (
		<li>
			<UpgradeButton onClick={() => handlePurchase(text)} text={text} price={price} clickCount={clickCount} isDark={isDark} setClickCount={setClickCount} upgrades={upgrades} setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}>
				<div>{text}</div>
				<UpgradePrice>{price}</UpgradePrice>
			</UpgradeButton>
			<hr/>
		</li>
	);
};
