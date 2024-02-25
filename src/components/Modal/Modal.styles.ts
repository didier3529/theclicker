import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 100%;
`

export const ModalContent = styled.div`
	position: relative;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	flex-direction: column;
	text-align: center;
	width: 15%;
	max-width: 600px;
	border-radius: 20px;
	background-color: #fefefe;
	padding: 0px 10px 10px 10px;
	transition: transform 0.3s;
	&:after {
		width: calc(100% / 3 - 13px);
		content: '';
		display: table;
	}
`
