import styled from '@emotion/styled';

export const ModalContent = styled.div`
	position: relative;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	flex-direction: column;
	text-align: center;
	width: 50%;
	max-width: 600px;
	border-radius: 20px;
	padding: 0px 10px 10px 10px;
	transition: transform 0.3s;
	&:after {
		width: calc(100% / 3 - 13px);
		content: '';
		display: table;
	}
`
