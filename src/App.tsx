import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {animate, useMotionValue, useTransform} from 'framer-motion';
import {CardButton} from './components/CardButton/CardButton.tsx';
// стили
import {AppWrapper, CardWrapper, ClickerContainer, MotionGrid, RotationWrapper} from './App.styles.ts';

const App: React.FC = () => {
	const [clickCount, setClickCount] = useState<number>(0);

	// позиция курсора
	const mouseX = useMotionValue(
		typeof window !== 'undefined' ? window.innerWidth / 2 : 0
	);
	const mouseY = useMotionValue(
		typeof window !== 'undefined' ? window.innerHeight / 2 : 0
	);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// анимация по X и Y
			animate(mouseX, e.clientX);
			animate(mouseY, e.clientY);
		};
		if (typeof window === 'undefined') return;
		window.addEventListener('mousemove', handleMouseMove);
		// очистка
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const cardRef = useRef<HTMLDivElement>(null);

	const dampen = 30;
	const rotateX = useTransform<number, number>(mouseY, (newMouseY) => {
		if (!cardRef.current) return 0;
		const rect = cardRef.current.getBoundingClientRect();
		const newRotateX = newMouseY - rect.top - rect.height / 2;
		return -newRotateX / dampen;
	});
	const rotateY = useTransform(mouseX, (newMouseX) => {
		if (!cardRef.current) return 0;
		const rect = cardRef.current.getBoundingClientRect();
		const newRotateY = newMouseX - rect.left - rect.width / 2;
		return newRotateY / dampen;
	});

	return (
		<AppWrapper>
			<ClickerContainer>
				<RotationWrapper style={{rotateX, rotateY}}>
					<MotionGrid/>
					<CardWrapper ref={cardRef}>
						<CardButton setClickCount={setClickCount} clickCount={clickCount}/>
					</CardWrapper>
				</RotationWrapper>
			</ClickerContainer>
			<p style={{display: 'flex', fontSize: '1.5em'}}>count: {clickCount}</p>
			<hr style={{width: '40em', color: '#9d9d9d'}}/>
		</AppWrapper>
	);
};

export default App;