import styled from '@emotion/styled';
import {motion} from 'framer-motion';

const SIZE = 60;

export const ClickerContainer = styled.div`
	@media screen and (max-width: 450px) {
		width: 80%;
	}
	position: relative;
	width: 50%;
	height: 50%;
	overflow: hidden;
	perspective: 1000px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`

export const RotationWrapper = styled(motion.div)`
	
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform-style: preserve-3d;
`;

export const CardWrapper = styled(motion.div)`
	//border-radius: 20px;
	backdrop-filter: blur(3px) brightness(120%);
	
	&:active {
		transition: all 0.03s linear;
		transform: scale(1.05);
	}
`;

export const MotionGrid = styled.div`
	position: absolute;
	width: 10%;
	height: 10%;
	background-size: ${SIZE}px ${SIZE}px;
	background-position: center;
	transform: translateZ(-500px);
`;
