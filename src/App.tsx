import React, {useEffect, useState} from 'react';
import {Form, Input, Wrapper} from './App.styles.ts'; // стили
import {ClickerArea} from './components/ClickerArea/ClickerArea.tsx';
import {ControlArea} from './components/ControlArea/ControlArea.tsx';
import {Footer} from './components/Footer/Footer.tsx';
import {Modal} from './components/Modal/Modal.tsx';
import {Button} from './components/ControlArea/ControlArea.styles.ts';

const App: React.FC = () => {
	const [showModal, setShowModal] = useState(true);
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
		const userName = localStorage.getItem('userName');
		console.log('useEffect called', userName);
		if (userName) {
			setShowModal(false);
		}
	}, []);

	const handleNameSubmit = ((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('handleNameSubmit вызван');
		const nameInput = event.currentTarget.elements.namedItem("input") as HTMLInputElement;
		const name = nameInput.value.trim();
		if (name.length > 0) {
			localStorage.setItem('userName', name);
			console.log('Имя пользователя сохранено:', name);
			setShowModal(false);
		} else {
			alert("PLEASE ENTER A NICKNAME >:(")
		}
	});

	return showModal ? (
		<>
			<Modal modalIsOpen={showModal} setModalIsOpen={() => setShowModal(false)}
				   onClose={() => setShowModal(false)}>
				<Form onSubmit={handleNameSubmit}>
					<img alt="boykisser-tapping" src={"/images/boykisser-tapping.png"} onClick={(event) => event.stopPropagation()}/>
					<Input type="text" name="input" className={'input'} placeholder="Enter ur nickname here"
						   onClick={(event) => event.stopPropagation()}/>
					<Button isDark={isDark} type="submit" onClick={(event) => event && event.stopPropagation()}>Save</Button>
				</Form>
			</Modal>
			<Footer isDark={isDark} setIsDark={setIsDark}/>
		</>
	) : (
		<>
			<Wrapper>
				<ClickerArea clickCount={clickCount} setClickCount={setClickCount} upgrades={upgrades}/>
			</Wrapper>
			<Wrapper>
				<ControlArea isDark={isDark} setClickCount={setClickCount} clickCount={clickCount} upgrades={upgrades}
							 setUpgrades={setUpgrades}/>
			</Wrapper>
			<Footer isDark={isDark} setIsDark={setIsDark}/>
		</>
	);
};

export default App;