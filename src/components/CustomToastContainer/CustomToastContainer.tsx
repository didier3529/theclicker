import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer: React.FC = () => {
	// Функция, которая возвращает соответствующий класс в зависимости от типа уведомления
	const getClassName = (type: string) => {
		switch (type) {
			case 'success':
				return 'custom-toast custom-toast-success';
			case 'error':
				return 'custom-toast custom-toast-error';
			default:
				return 'custom-toast';
		}
	};

	// Переопределяем функцию toastClassName, чтобы задать правильный класс в зависимости от типа уведомления
	const toastClassName = (type: string) => {
		return getClassName(type);
	};

	return (
		<ToastContainer
			position="top-right"
			autoClose={2500}
			closeOnClick
			// @ts-ignore
			toastClassName={({ type }) => toastClassName(type)}
		/>
	);
};

export default CustomToastContainer;