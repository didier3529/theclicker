import {Button, ControlAreaWrapper, UpgradeList} from './ControlArea.styles.ts';
import {ControlAreaProps} from '../../types.ts';
import {Modal} from '../Modal/Modal.tsx';
import {useState} from 'react';
import {UpgradeItem} from './UpgradeItem/UpgradeItem.tsx';

export const ControlArea = ({setClickCount, isDark}: ControlAreaProps) => {
	const [modalType, setModalType] = useState<string | null>(null);

	const handleNewGame = () => {
		setModalType(null);
		setClickCount(0);
	};

	return modalType ? (
		<Modal modalIsOpen={true} setModalIsOpen={() => setModalType(null)}>
			{modalType === 'newGame' && (
				<>
					<h2>Are u sure?</h2>
					<div>
						<Button isDark={isDark} style={{marginRight: '1em'}} onClick={() => handleNewGame()}>
							Yep
						</Button>
						<Button isDark={isDark} onClick={() => setModalType(null)}>
							Nope
						</Button>
					</div>
				</>
			)}
			{modalType === 'upgrades' && (
				<>
					<h2>Upgrades:</h2>
					<UpgradeList>
						<UpgradeItem text={'Passive click lvl.1'} price={1000} isDark={isDark}/>
						<UpgradeItem text={'Passive click lvl.2'} price={10000} isDark={isDark}/>
						<UpgradeItem text={'Passive click lvl.3'} price={100000} isDark={isDark}/>

						<UpgradeItem text={'X2 click'} price={100000} isDark={isDark}/>
						<UpgradeItem text={'X3 click'} price={1000000} isDark={isDark}/>
					</UpgradeList>
				</>
			)}
		</Modal>
	) : (
		<ControlAreaWrapper>
			<Button isDark={isDark} onClick={() => setModalType('upgrades')}>Upgrades</Button>
			<Button isDark={isDark} onClick={() => setModalType('newGame')}>New game</Button>
		</ControlAreaWrapper>
	);
};
