import {useEffect} from 'react';
import {FooterProps} from '../../../types.ts';
import {ThemeSwitcherWrapper} from './ThemeSwitcher.styles.ts';

export const ThemeSwitcher = ({isDark, setIsDark}: FooterProps) => {

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
	}, [isDark]);

	useEffect(() => {
		localStorage.setItem('isDark', isDark.toString());
	}, [isDark, setIsDark]);

	return (
		<ThemeSwitcherWrapper>
			<div className={isDark ? 'inactiveSwitch' : ''}
								 onClick={() => setIsDark(false)}>
				<span>dark</span>
			</div>
			<span style={{margin: '0px 4px 0px 4px'}}>/</span>
			<div className={!isDark ? 'inactiveSwitch' : ''}
								 onClick={() => setIsDark(true)}>
				<span>light</span>
			</div>
		</ThemeSwitcherWrapper>
	);
};
