import styled from '@emotion/styled';
import {UpgradeProps} from '../../../types.ts';

export const UpgradePrice = styled.span`
	float: right;
`

export const UpgradeButton = styled.button<UpgradeProps>`
	@media screen and (max-width: 430px) {
		font-size: 93%;
		text-align: start;
	}
	display: flex;
	flex-direction: row;
	cursor: pointer;
	justify-content: space-between;
	width: 100%;
	color: #FEFEFE;
	font-family: 'Press Start 2P', system-ui;

	&:hover {
		color: #5d5d5d;
	}

	${props => props.isDark === true && `
		color: #5d5d5d;
		&:hover {
			color: #797979;
		}
  `}
	${props => props.isUpgradePurchased && `
		color: #5d5d5d;
		
		${props.isDark === true && `
			color: #b0b0b0;
  		`}
  `}
`