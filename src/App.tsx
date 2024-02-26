import React, {useState} from 'react';
import {Wrapper} from './App.styles.ts'; // стили
import {ClickerArea} from './components/ClickerArea/ClickerArea.tsx';
import {ControlArea} from './components/ControlArea/ControlArea.tsx';
import {ThemeSwitcher} from './components/ThemeSwitcher/ThemeSwitcher.tsx';

const App: React.FC = () => {
	const [clickCount, setClickCount] = useState<number>(() => {
		const savedClickCount = localStorage.getItem('clickCount');
		return savedClickCount ? parseInt(savedClickCount, 10) : 0;
	});
	const [isDark, setIsDark] = useState(() => {
		const savedIsDark = localStorage.getItem('isDark');
		return savedIsDark ? savedIsDark === 'true' : false;
	});

	return (
		<>
			<Wrapper>
				<ClickerArea clickCount={clickCount} setClickCount={setClickCount}/>
			</Wrapper>
			<Wrapper>
				<ControlArea isDark={isDark} setClickCount={setClickCount}/>
			</Wrapper>
			<ThemeSwitcher isDark={isDark} setIsDark={setIsDark}/>
		</>
	);
};

export default App;