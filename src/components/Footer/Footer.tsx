import {ThemeSwitcher} from './ThemeSwitcher/ThemeSwitcher.tsx';
import {FooterProps} from '../../types.ts';
import {FooterWrapper} from './Footer.styles.ts';
import {SwitchButton} from '../../App.styles.ts';

export const Footer = ({isDark, setIsDark, setShowModal, showModal, displayName, isAnonymous, handlePlayAnonymously}: FooterProps) => {
	return (
		<FooterWrapper>
			{!showModal && isAnonymous && (
				<SwitchButton style={{margin: "1em"}} type="button" isDark={isDark} onClick={handlePlayAnonymously}>Sign up | Sign in</SwitchButton>
			)}
			{displayName && (
				<span className="inactiveSwitch" style={{fontSize: '0.7em'}}>user: {displayName}</span>
			)}
			<ThemeSwitcher isDark={isDark} setIsDark={setIsDark} setShowModal={setShowModal} showModal={showModal}/>
			<a href={'https://github.com/mi1sh/boykisser-clicker'} target='_blank' className='inactiveSwitch'>github</a>
		</FooterWrapper>
	);
};
