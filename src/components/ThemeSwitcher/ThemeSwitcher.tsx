import {useEffect} from 'react';
import {ThemeSwitcherProps} from '../../types.ts';
import {ThemeSwitcherWrapper} from './ThemeSwitcher.styles.ts';

export const ThemeSwitcher = ({isDark, setIsDark}: ThemeSwitcherProps) => {

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	}, [isDark]);

	useEffect(() => {
		localStorage.setItem('isDark', isDark.toString());
		setIsDark(isDark);
	}, [isDark, setIsDark]);

	return (
		<ThemeSwitcherWrapper>
			<div className={isDark ? 'inactiveSwitch' : ''}
								 onClick={() => setIsDark(false)}>
				<span>light</span>
			</div>
			<span style={{margin: '0px 4px 0px 4px'}}>/</span>
			<div className={!isDark ? 'inactiveSwitch' : ''}
								 onClick={() => setIsDark(true)}>
				<span>dark</span>
			</div>
		</ThemeSwitcherWrapper>
	);
};
