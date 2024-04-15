import {Button, ControlAreaWrapper, UpgradeList} from './ControlArea.styles.ts';
import {AvailableUpgradesProps, ControlAreaProps} from '../../types.ts';
import {Modal} from '../Modal/Modal.tsx';
import {useEffect, useRef, useState} from 'react';
import {UpgradeItem} from './UpgradeItem/UpgradeItem.tsx';
import {auth, db} from '../../firebase.ts';

export const ControlArea = ({setClickCount, isDark, clickCount, upgrades, setUpgrades, isAuthenticated, authClickCount, updateClickCount, setAuthClickCount, authUpgrades, setAuthUpgrades, saveAuthUpgrades, isAnonymous}: ControlAreaProps) => {
	const initialAvailableUpgrades = localStorage.getItem('availableUpgrades');
	// @ts-ignore
	const [authAvailableUpgrades, setAuthAvailableUpgrades] = useState<AvailableUpgradesProps>({
		passiveClick: 1,
		x2PerClick: false,
		x3PerClick: false,
	});
	const [availableUpgrades, setAvailableUpgrades] = useState<AvailableUpgradesProps>(initialAvailableUpgrades ? JSON.parse(initialAvailableUpgrades) : {
		passiveClick: 1,
		x2PerClick: false,
		x3PerClick: false,
	});
	const [modalType, setModalType] = useState<string | null>(null);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const currentUpgrades = isAuthenticated ? authUpgrades : upgrades;
	let count = isAuthenticated ? authClickCount : clickCount;

	useEffect(() => {
		if (isAnonymous) {
			const storedUpgrades = localStorage.getItem('upgrades');
			if (storedUpgrades) {
				setAvailableUpgrades(JSON.parse(storedUpgrades));
			}
		}
	}, [isAnonymous]);

	useEffect(() => {
		localStorage.setItem('availableUpgrades', JSON.stringify(availableUpgrades));
	}, [availableUpgrades])

	useEffect(() => {
		if (!isAuthenticated) {
			localStorage.setItem('upgrades', JSON.stringify(upgrades));
		}
	}, [upgrades]);

	useEffect(() => {
		if (currentUpgrades.passiveClick > 0 ) {
			intervalRef.current = setInterval(() => {
				updateClickCount(count += 1, isAuthenticated);
				console.log('click');
			}, 3000 / currentUpgrades.passiveClick);

			return () => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
					console.log('interval cleared');
				}
			};
		}
	}, [currentUpgrades.passiveClick, auth.currentUser, isAnonymous]);

	useEffect(() => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			// Загрузка authUpgrades из Firebase для аутентифицированных пользователей
			const userRef = db.ref('users/' + userId);
			userRef.once('value', snapshot => {
				const userData = snapshot.val();
				if (userData && userData.authUpgrades) {
					setAuthUpgrades(userData.authUpgrades);
					setAuthAvailableUpgrades(userData.authUpgrades);
				}
			});
		}
	}, [auth.currentUser]);

	const handleNewGame = () => {
		if (isAuthenticated) {
			setAuthClickCount(0);
		}
		setModalType(null);
		setClickCount(0);
	};

	const updateAvailableUpgrades = (upgradeName: string) => {
		const setCurrentUpgrades = isAuthenticated ? setAuthAvailableUpgrades : setAvailableUpgrades;
		if (upgradeName.startsWith('Passive click lvl.')) {
			const match = upgradeName.match(/lvl\.(\d+)/);
			if (match && match[1]) {
				const level = parseInt(match[1], 10);
				console.log(level);
				if (level === 1) {
					setCurrentUpgrades(prev => ({...prev, passiveClick: 2}));
				} else if (level === 2) {
					setCurrentUpgrades(prev => ({...prev, passiveClick: 3}));
				}
			}
		} else if (upgradeName === 'X2 per click') {
			setCurrentUpgrades(prev => ({...prev, x3PerClick: true}));
		}
		const userId = auth.currentUser?.uid;
		if (userId) {
			const userRef = db.ref('users/' + userId);
			userRef.once('value', snapshot => {
				const userData = snapshot.val();
				if (userData && userData.upgrades) {
					setCurrentUpgrades(userData.upgrades);
					if (auth.currentUser) {
						saveAuthUpgrades(authAvailableUpgrades);
					}
				}
			});
		}
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
						<UpgradeItem saveAuthUpgrades={saveAuthUpgrades} setAuthUpgrades={setAuthUpgrades} authUpgrades={authUpgrades} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} key={0} text={'Passive click lvl.1'} price={1000} isDark={isDark}
									 clickCount={clickCount} upgrades={upgrades}
									 setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}
									 updateAvailableUpgrades={updateAvailableUpgrades}/>
						<UpgradeItem saveAuthUpgrades={saveAuthUpgrades} setAuthUpgrades={setAuthUpgrades} authUpgrades={authUpgrades} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} key={1} text={'Passive click lvl.2'} price={10000} isDark={isDark}
									 clickCount={clickCount} upgrades={upgrades}
									 setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}
									 updateAvailableUpgrades={updateAvailableUpgrades}/>
						<UpgradeItem saveAuthUpgrades={saveAuthUpgrades} setAuthUpgrades={setAuthUpgrades} authUpgrades={authUpgrades} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} key={2} text={'Passive click lvl.3'} price={100000} isDark={isDark}
									 clickCount={clickCount} upgrades={upgrades}
									 setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}
									 updateAvailableUpgrades={updateAvailableUpgrades}/>

						<UpgradeItem saveAuthUpgrades={saveAuthUpgrades} setAuthUpgrades={setAuthUpgrades} authUpgrades={authUpgrades} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} key={3} text={'X2 per click'} price={100000} isDark={isDark}
									 clickCount={clickCount} upgrades={upgrades}
									 setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}
									 updateAvailableUpgrades={updateAvailableUpgrades}/>
						<UpgradeItem saveAuthUpgrades={saveAuthUpgrades} setAuthUpgrades={setAuthUpgrades} authUpgrades={authUpgrades} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} key={4} text={'X3 per click'} price={1000000} isDark={isDark}
									 clickCount={clickCount} upgrades={upgrades}
									 setUpgrades={setUpgrades} intervalId={intervalId} setIntervalId={setIntervalId}
									 updateAvailableUpgrades={updateAvailableUpgrades}/>
					</UpgradeList>
					<Button style={{padding: '0.2em', width: '4.5em', fontSize: '1.2em', margin: 'auto'}} isDark={isDark}
							onClick={() => setModalType(null)}>
						{`<-Back`}
					</Button>
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
