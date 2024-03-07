import {UpgradeButton, UpgradePrice} from './UpgradeItem.styles.ts';
import {UpgradeProps} from '../../../types.ts';

export const UpgradeItem = ({isDark, text, price}: UpgradeProps) => {

	return (
		<li>
			<UpgradeButton isDark={isDark}>
				<div>{text}</div>
				<UpgradePrice>{price}</UpgradePrice>
			</UpgradeButton>
			<hr/>
		</li>
	);
};
