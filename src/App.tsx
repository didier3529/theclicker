import React, {useState} from 'react';
import {Wrapper} from './App.styles.ts'; // стили
import {ClickerArea} from './components/ClickerArea/ClickerArea.tsx';
import {ControlArea} from './components/ControlArea/ControlArea.tsx';
import {Footer} from './components/Footer/Footer.tsx';

const App: React.FC = () => {
	const [clickCount, setClickCount] = useState<number>(() => {
		const savedClickCount = localStorage.getItem('clickCount');
		return savedClickCount ? parseInt(savedClickCount, 10) : 0;
	});
	const [isDark, setIsDark] = useState(() => {
		const savedIsDark = localStorage.getItem('isDark');
		return savedIsDark ? savedIsDark === 'true' : false;
	});
	const initialUpgrades = localStorage.getItem('upgrades');
	const [upgrades, setUpgrades] = useState(initialUpgrades ? JSON.parse(initialUpgrades) : {
		passiveClick: 0,
		x2PerClick: false,
		x3PerClick: false,
	});

	return (
		<>
			<Wrapper>
				<ClickerArea clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades}/>
			</Wrapper>
			<Wrapper>
				<ControlArea isDark={isDark} setClickCount={setClickCount} clickCount={clickCount} upgrades={upgrades} setUpgrades={setUpgrades}/>
			</Wrapper>
			<Footer isDark={isDark} setIsDark={setIsDark}/>
		</>
	);
};

export default App;