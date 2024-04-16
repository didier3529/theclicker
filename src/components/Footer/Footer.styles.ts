import styled from '@emotion/styled';
import {FooterAppProps} from '../../types.ts';

export const FooterWrapper = styled.div`
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	bottom: 0;
	justify-content: center;
	width: 100%;
	margin-bottom: 1em;
`

export const FooterAppWrapper = styled.div<FooterAppProps>`
	position: fixed;
	left: 0;
	width: 100%;
	bottom: 0;
	height: auto;
	background-color: ${props => props.isDark ? '#f8f4ef' : '#252728'};
`