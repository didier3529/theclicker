import {CardButton} from '../CardButton/CardButton.tsx';
import {useEffect, useRef} from 'react';
import {animate, useMotionValue, useTransform} from 'framer-motion';
import {CardWrapper, ClickerContainer, MotionGrid, RotationWrapper} from './ClickerArea.styles.ts';
import {ClickerAreaProps} from '../../types.ts';
import {Wrapper} from '../../App.styles.ts'; // стили

export const ClickerArea = ({ clickCount, setClickCount}: ClickerAreaProps) => {
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

	useEffect(() => {
		localStorage.setItem('clickCount', clickCount.toString());
	}, [clickCount]);

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
		<>
			<ClickerContainer>
				<RotationWrapper style={{rotateX, rotateY}}>
					<MotionGrid/>
					<CardWrapper ref={cardRef}>
						<CardButton setClickCount={setClickCount} clickCount={clickCount}/>
					</CardWrapper>
				</RotationWrapper>
				<Wrapper>
					<p style={{marginBottom: '15px', fontSize: '2em', textAlign: 'center'}}>{clickCount}</p>
					<hr className='hr' style={{padding: '0px', margin: '0px', width: '30vw', minWidth: '400px', border: 'none', color: '#5d5d5d', height: '3px', backgroundColor: '#5d5d5d'}}/>
				</Wrapper>
			</ClickerContainer>
		</>
	);
};
