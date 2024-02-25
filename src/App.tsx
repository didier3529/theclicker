import React, {useState} from 'react';
import {Wrapper} from './App.styles.ts'; // стили
import {ClickerArea} from './components/ClickerArea/ClickerArea.tsx';
import {ControlArea} from './components/ControlArea/ControlArea.tsx';

const App: React.FC = () => {
	const [clickCount, setClickCount] = useState<number>(() => {
		const savedClickCount = localStorage.getItem('clickCount');
		return savedClickCount ? parseInt(savedClickCount, 10) : 0;
	});

	return (
		<>
			<div style={{height: '100%'}}>
				<Wrapper>
					<ClickerArea clickCount={clickCount} setClickCount={setClickCount}/>
				</Wrapper>
				<Wrapper>
					<ControlArea setClickCount={setClickCount} clickCount={clickCount}/>
				</Wrapper>
			</div>
		</>
	);
};

export default App;