import React, {useEffect, useState} from 'react';
import {Form, Input, SwitchButton, Wrapper} from './App.styles.ts'; // стили
import {ClickerArea} from './components/ClickerArea/ClickerArea.tsx';
import {ControlArea} from './components/ControlArea/ControlArea.tsx';
import {Footer} from './components/Footer/Footer.tsx';
import {Modal} from './components/Modal/Modal.tsx';
import {Button} from './components/ControlArea/ControlArea.styles.ts';
import {auth, db} from './firebase.ts';
import {toast} from 'react-toastify';
import CustomToastContainer from './components/CustomToastContainer/CustomToastContainer.tsx';

const App: React.FC = () => {
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [isRegistering, setIsRegistering] = useState(true);
	const [showModal, setShowModal] = useState(isAuthenticated ? false : true);
	const [authClickCount, setAuthClickCount] = useState<number>(0);
	const [clickCount, setClickCount] = useState<number>(() => {
		const savedClickCount = localStorage.getItem('clickCount');
		return savedClickCount ? parseInt(savedClickCount, 10) : 0;
	});
	const [isDark, setIsDark] = useState(() => {
		const savedIsDark = localStorage.getItem('isDark');
		return savedIsDark ? savedIsDark === 'true' : false;
	});
	const initialUpgrades = localStorage.getItem('upgrades');
	const [upgrades, setUpgrades] = useState(initialUpgrades ? JSON.parse(initialUpgrades) : {
		passiveClick: 0,
		x2PerClick: false,
		x3PerClick: false
	});

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
	}, [isAuthenticated, authClickCount]);

	const updateDisplayName = (newDisplayName: string) => {
		setDisplayName(newDisplayName);
	};

	const handleSignUp = async (email: string, password: string, displayName: string) => {
		try {
			const userCredential = await auth.createUserWithEmailAndPassword(email, password);
			const user = userCredential.user;
			if (user) {
				updateDisplayName(displayName);
				if (displayName.trim() !== '') { // Проверка на пустое значение или пробельные символы
					await user.updateProfile({
						displayName: displayName
					});
					await user.reload(); // Перезагрузка пользователя
					saveUsername(displayName, user.uid);
					toast.success(`Signed up successfully: ${user.displayName}`);
					// Инициализация authClickCount в 0 для нового пользователя
					updateClickCount(0);
					console.log(`User profile updated: ${user.displayName}`);
				} else {
					toast.error('Error: displayName is empty');
					return;
				}
				// Записываем данные пользователя в базу данных Firebase, включая authClickCount
				await db.ref('users/' + user.uid).set({
					displayName: displayName,
					email: email,
					clickCount: 0 // Инициализация authClickCount в 0
				}).then(() => {
					console.log('User profile updated with displayName:', displayName);
					setShowModal(false);
				}).catch((error) => {
					console.error('Error saving user profile to database:', error);
				});
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
				// Загрузка authClickCount из базы данных Firebase
				const userRef = db.ref('users/' + user.uid);
				userRef.once('value', snapshot => {
					const userData = snapshot.val();
					if (userData && userData.clickCount) {
						// Обновление authClickCount в состоянии приложения
						setAuthClickCount(userData.clickCount);
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
	const updateClickCount = (newClickCount: number) => {
		if (isAuthenticated) {
			// Обновляем локальное состояние и сохраняем в базу данных Firebase
			setAuthClickCount(newClickCount);
			saveClickCount(newClickCount);
		} else {
			// Для анонимных пользователей обновляем только локальное состояние
			setClickCount(newClickCount);
			localStorage.setItem('clickCount', newClickCount.toString());
		}
	};

	const handlePlayAnonymously = () => {
		// Логика для анонимной игры
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
			console.log('User signed out');
			setIsAuthenticated(false);
			setShowModal(true);
			// Здесь можно добавить дополнительную логику, например, сброс состояния приложения
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
		<>
			<CustomToastContainer/>
			{showModal ? (
				<>
					<Modal modalIsOpen={showModal} setModalIsOpen={() => setShowModal(false)}
						   onClose={() => setShowModal(false)}>
						<Form onSubmit={handleNameSubmit}>
							<img alt="boykisser-tapping" src={'/images/boykisser-tapping.png'}
								 onClick={(event) => event.stopPropagation()}/>
							{isRegistering && (
								<Input type="text" name="input" className={'input'} placeholder="Enter ur nickname here"
									   value={displayName} onChange={(event) => setDisplayName(event.target.value)}/>
							)}
							<Input autoComplete="off" type="email" name="input" className={'input'}
								   placeholder="Enter ur email here"
								   value={email} onChange={(event) => setEmail(event.target.value)}/>
							<Input type="password" name="input" className={'input'} placeholder="Enter ur password here"
								   value={password} onChange={(event) => setPassword(event.target.value)}/>
							<Button isDark={isDark} type="submit">{isRegistering ? 'Sign Up' : 'Sign In'}</Button>
							<SwitchButton type="button" isDark={isDark}
										  onClick={() => setIsRegistering(!isRegistering)}>Switch
								to {isRegistering ? 'Sign In' : 'Sign Up'}</SwitchButton>
							<SwitchButton style={{margin: '0em'}} type="button" isDark={isDark}
										  onClick={handlePlayAnonymously}>Play anonymously</SwitchButton>
						</Form>
					</Modal>
					<Footer handlePlayAnonymously={handlePlayAnonymously} isAnonymous={isAnonymous} displayName={displayName} showModal={showModal}
							setShowModal={setShowModal} isDark={isDark} setIsDark={setIsDark}/>
				</>
			) : (
				<>
					<Wrapper>
						<ClickerArea updateClickCount={updateClickCount} authClickCount={authClickCount} isAuthenticated={isAuthenticated} clickCount={clickCount} upgrades={upgrades}/>
					</Wrapper>
					<Wrapper>
						<ControlArea isDark={isDark} setClickCount={setClickCount} clickCount={clickCount}
									 upgrades={upgrades}
									 setUpgrades={setUpgrades}/>
					</Wrapper>
					{isAuthenticated && (
						<Wrapper>
							<SwitchButton isDark={isDark} onClick={handleSignOut}>Sign Out</SwitchButton>
						</Wrapper>
					)}
					<Footer handlePlayAnonymously={handlePlayAnonymously} isAnonymous={isAnonymous} displayName={displayName} showModal={showModal}
							setShowModal={setShowModal} isDark={isDark} setIsDark={setIsDark}/>
				</>
			)
			}
		</>
	);
};


export default App;