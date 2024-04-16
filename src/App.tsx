import React, {useEffect, useState} from 'react';
import {AppWrapper, Form, Input, LogoWrapper, SwitchButton, Wrapper} from './App.styles.ts'; // стили
import {ClickerArea} from './components/ClickerArea/ClickerArea.tsx';
import {ControlArea} from './components/ControlArea/ControlArea.tsx';
import {Footer} from './components/Footer/Footer.tsx';
import {Modal} from './components/Modal/Modal.tsx';
import {Button} from './components/ControlArea/ControlArea.styles.ts';
import {auth, db} from './firebase.ts';
import {toast} from 'react-toastify';
import CustomToastContainer from './components/CustomToastContainer/CustomToastContainer.tsx';
import { AvailableUpgradesProps } from './types.ts';
import {RatingTable} from './components/RatingTable/RatingTable.tsx';
import {FooterAppWrapper} from './components/Footer/Footer.styles.ts';

const App: React.FC = () => {
	const [ratingTableData, setRatingTableData] = useState<any[]>([]);
	const [isMobile, setIsMobile] = useState(false);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [isRegistering, setIsRegistering] = useState(true);
	const [showModal, setShowModal] = useState(isAuthenticated ? false : true);
	const [authClickCount, setAuthClickCount] = useState<number>(0);
	const [clickCount, setClickCount] = useState<number>(() => {
		const isAuthenticated = auth.currentUser !== null;
		if (!isAuthenticated) {
			const storedClickCount = localStorage.getItem('clickCount');
			return storedClickCount ? parseInt(storedClickCount, 10) : 0;
		}
		return 0;
	});
	const [isDark, setIsDark] = useState(() => {
		const savedIsDark = localStorage.getItem('isDark');
		return savedIsDark ? savedIsDark === 'true' : false;
	});
	const initialUpgrades = localStorage.getItem('upgrades');
	const [authUpgrades, setAuthUpgrades] = useState<AvailableUpgradesProps>({
		passiveClick: 0,
		x2PerClick: false,
		x3PerClick: false,
	});
	const [upgrades, setUpgrades] = useState(initialUpgrades ? JSON.parse(initialUpgrades) : {
		passiveClick: 0,
		x2PerClick: false,
		x3PerClick: false
	});

	useEffect(() => {
		const usersRef = db.ref('users/');
		usersRef.once('value', (snapshot) => {
			const userData = snapshot.val();
			const users = [];
			for (const userId in userData) {
				if (Object.hasOwnProperty.call(userData, userId)) {
					const username = userData[userId].displayName;
					const userClick = userData[userId].clickCount || 0;
					users.push({ username, userClick });
				}
			}
			users.sort((a, b) => b.userClick - a.userClick);
			setRatingTableData(users);
		});
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			const userRef = db.ref('users/' + userId);
			userRef.once('value', snapshot => {
				const userData = snapshot.val();
				if (userData && userData.authUpgrades) {
					const mergedUpgrades = { ...authUpgrades, ...userData.authUpgrades };
					setAuthUpgrades(mergedUpgrades);
					console.log(mergedUpgrades);
				}
			});
		}
	}, [auth.currentUser]);

	const userId = auth.currentUser?.uid;
	useEffect(() => {
		const userRef = db.ref('users/' + userId);
		const handleData = (snapshot: { val: () => any; }) => {
			const userData = snapshot.val();
			if (userData && userData.authUpgrades) {
				setAuthUpgrades(userData.authUpgrades);
			}
		};

		return () => {
			userRef.off('value', handleData);
		};
	}, [userId]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				if (user.displayName) {
					setDisplayName(user.displayName);
				} else {
					console.log('Error with displayName');
				}
				setShowModal(false);
				setIsAuthenticated(true);
			} else {
				setDisplayName('');
				setIsAuthenticated(false);
			}
		});
		const userId = auth.currentUser?.uid;
		if (userId) {
			const userRef = db.ref('users/' + userId);
			userRef.once('value', snapshot => {
				const userData = snapshot.val();
				if (userData && userData.authUpgrades) {
					setAuthUpgrades(userData.authUpgrades);
				}
			});
		}

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			const userRef = db.ref('users/' + currentUser?.uid);
			userRef.once('value', snapshot => {
				const userData = snapshot.val();
				if (userData && userData.clickCount) {
					setAuthClickCount(userData.clickCount);
				}
			})
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (auth.currentUser) {
			saveAuthUpgrades(authUpgrades);
			console.log('upgrades update');
		}
	}, [authUpgrades]);

	const updateDisplayName = (newDisplayName: string) => {
		setDisplayName(newDisplayName);
	};

	const handleSignUp = async (email: string, password: string, displayName: string) => {
		try {
			const userCredential = await auth.createUserWithEmailAndPassword(email, password);
			const user = userCredential.user;
			if (user) {
				updateDisplayName(displayName);
				if (displayName.trim() !== '') {
					await user.updateProfile({
						displayName: displayName,
					});
					await user.reload();

					const userId = user.uid;
					await db.ref('users/' + userId).set({
						displayName: displayName,
						email: email,
						clickCount: 0,
						authUpgrades: {
							passiveClick: 0,
							x2PerClick: false,
							x3PerClick: false,
						},
					});
					if (user) {
						toast.success(`Signed in successfully: ${user.displayName}`);
					} else {
						toast.error('Error signing in');
					}
					setShowModal(false);
				} else {
					toast.error('Error: displayName is empty');
					return;
				}
			} else {
				toast.error('Error');
			}
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				toast.error('The email address is already used by another account');
			} else {
				console.error('Error signing up:', error);
			}
		}
	};

	const handleSignIn = async (email: string, password: string) => {
		try {
			const userCredential = await auth.signInWithEmailAndPassword(email, password);
			const user = userCredential.user;

			if (user) {
				console.log(user);
				const userRef = db.ref('users/' + user.uid);
				userRef.once('value', snapshot => {
					const userData = snapshot.val();
					if (userData && userData.clickCount) {
						// Обновление authClickCount в состоянии приложения
						setAuthClickCount(userData.clickCount);
						if (user) {
							// Загрузка улучшений из базы данных Firebase
							const userRef = db.ref('users/' + user.uid);
							userRef.once('value', snapshot => {
								const userData = snapshot.val();
								if (userData && userData.upgrades) {
									setAuthUpgrades(userData.authUpgrades);
								}
							});
						}
					}
				});
				toast.success(`Signed in successfully: ${user.displayName}`);
			} else {
				toast.error('Error signing in');
			}
			setIsAuthenticated(true);
			setShowModal(false);
		} catch (error) {
			console.error('Error signing in:', error);
			toast.error('Invalid email or password');
		}
	};

	// @ts-ignore
	const saveUsername = (username: any, userId: string) => {
		const userRef = db.ref('users/' + userId);
		userRef.update({
			displayName: username
		}).then(() => {
			console.log('Username saved to database:', username);
		}).catch((error) => {
			console.error('Error saving username to database:', error);
		});
	};

	const saveAuthUpgrades = (newAuthUpgrades: AvailableUpgradesProps) => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			const userRef = db.ref('users/' + userId);
			userRef.update({
				authUpgrades: newAuthUpgrades,
			}).then(() => {
				console.log('authUpgrades updated: ', newAuthUpgrades);
			}).catch((error) => {
				console.error('Error updating authUpgrades: ', error);
			});
		}
	}

	const saveClickCount = (newClickCount: number) => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			const userRef = db.ref('users/' + userId);
			userRef.update({
				clickCount: newClickCount
			}).then(() => {
				console.log('Click count updated: ', newClickCount);
			}).catch((error) => {
				console.error('Error updating click count: ', error);
			});
		}
	};

	const updateClickCount = (newClickCount: number, isAuthenticated: boolean) => {
		if (isAuthenticated) {
			setAuthClickCount(newClickCount);
			saveClickCount(newClickCount);
		} else {
			setClickCount(newClickCount);
			localStorage.setItem('clickCount', newClickCount.toString());
		}
	};

	const handlePlayAnonymously = () => {
		if (!isAnonymous) {
			if (clickCount) {
				setClickCount(parseFloat(localStorage.clickCount));
			}
			setIsAuthenticated(false);
			setIsAnonymous(true);
			setShowModal(false);
			toast.success('Play anonymously');
		} else {
			setShowModal(true);
			setIsAnonymous(false);
			console.log('Unplay anonymously');
		}
	};

	const handleSignOut = () => {
		auth.signOut().then(() => {
			setIsAuthenticated(false);
			setAuthClickCount(0);
			setAuthUpgrades({
				passiveClick: 0,
				x2PerClick: false,
				x3PerClick: false,
			})
			setShowModal(true);
			console.log('User signed out');
		}).catch((error) => {
			console.error('Error signing out:', error);
		});
	};

	const handleNameSubmit = ((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isRegistering) {
			handleSignUp(email, password, displayName);
		} else {
			handleSignIn(email, password);
		}
	});

	return (
		<AppWrapper>
			<CustomToastContainer/>
			{showModal ? (
				<>
					<Modal modalIsOpen={showModal} setModalIsOpen={() => setShowModal(false)}
						   onClose={() => setShowModal(false)}>
						<LogoWrapper>
							<img alt="boykisser-tapping" src={'/images/boykisser-tapping.png'}
								 onClick={(event) => event.stopPropagation()}/>
						</LogoWrapper>
							<Form onSubmit={handleNameSubmit}>
								<Wrapper style={{flexDirection: 'row'}}>
									<Wrapper>
										{isRegistering && (
											<Input type="text" name="input" className={'input'} placeholder="Enter ur nickname here"
												   value={displayName} onChange={(event) => setDisplayName(event.target.value)}/>
										)}
										<Input autoComplete="off" type="email" name="input" className={'input'}
											   placeholder="Enter ur email here"
											   value={email} onChange={(event) => setEmail(event.target.value)}/>
										<Input type="password" name="input" className={'input'} placeholder="Enter ur password here"
											   value={password} onChange={(event) => setPassword(event.target.value)}/>
									</Wrapper>
										{!isMobile && (
											<Wrapper>
												<RatingTable ratingTableData={ratingTableData} authClickCount={authClickCount}/>
											</Wrapper>
										)}
								</Wrapper>
								<Button isDark={isDark} type="submit">{isRegistering ? 'Sign Up' : 'Sign In'}</Button>
								<SwitchButton type="button" isDark={isDark}
											  onClick={() => setIsRegistering(!isRegistering)}>Switch
									to {isRegistering ? 'Sign In' : 'Sign Up'}</SwitchButton>
								<SwitchButton style={{margin: '0em'}} type="button" isDark={isDark}
											  onClick={handlePlayAnonymously}>Play anonymously</SwitchButton>
							</Form>
						{isMobile && (
							<Wrapper style={{marginTop: '1.5em'}}>
								<RatingTable ratingTableData={ratingTableData} authClickCount={authClickCount}/>
							</Wrapper>
						)}
					</Modal>
					<FooterAppWrapper isDark={isDark}>
						<Footer handlePlayAnonymously={handlePlayAnonymously} isAnonymous={isAnonymous} displayName={displayName} showModal={showModal}
								setShowModal={setShowModal} isDark={isDark} setIsDark={setIsDark}/>
					</FooterAppWrapper>
				</>
			) : (
				<>
					<Wrapper>
						<ClickerArea authUpgrades={authUpgrades} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} clickCount={clickCount} upgrades={upgrades}/>
					</Wrapper>
					<Wrapper>
						<ControlArea ratingTableData={ratingTableData} isMobile={isMobile} isAnonymous={isAnonymous} saveAuthUpgrades={saveAuthUpgrades} authUpgrades={authUpgrades} setAuthUpgrades={setAuthUpgrades} setAuthClickCount={setAuthClickCount} updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} isDark={isDark} setClickCount={setClickCount} clickCount={clickCount}
									 upgrades={upgrades}
									 setUpgrades={setUpgrades}/>
					</Wrapper>
					{isAuthenticated && (
						<Wrapper>
							<SwitchButton isDark={isDark} onClick={handleSignOut}>Sign Out</SwitchButton>
						</Wrapper>
					)}
					<FooterAppWrapper isDark={isDark}>
						<Footer handlePlayAnonymously={handlePlayAnonymously} isAnonymous={isAnonymous} displayName={displayName} showModal={showModal}
								setShowModal={setShowModal} isDark={isDark} setIsDark={setIsDark}/>
					</FooterAppWrapper>
				</>
			)
			}
		</AppWrapper>
	);
};


export default App;