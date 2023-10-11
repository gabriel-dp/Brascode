import styled from "styled-components";

export const DropdownContainer = styled.div`
	height: 100%;
	width: 100%;

	position: relative;
	display: flex;
	flex-wrap: wrap;
`;

export const DropdownHeader = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 100rem;
	background-color: ${(props) => props.theme.white};
	color: ${(props) => props.theme.text};
	cursor: pointer;

	.icon {
		font-size: 1.25rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-40%);
	}
`;

export const DropdownContent = styled.div`
	max-height: 575%;
	overflow-y: scroll;
	width: 100%;
	border-radius: 0.5rem;
	box-shadow: 0 0 1rem #00000033;

	position: absolute;
	top: 110%;
	padding: 0.25rem;
	background-color: ${(props) => props.theme.white};
`;

export const DropdownItem = styled.div`
	width: 100%;
	border-radius: 0.25rem;
	padding: 0.625rem;
	font-size: 0.85rem;
	transition: all ease 0.25s;
	cursor: pointer;

	p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&.clear {
		color: ${(props) => props.theme.text}77;
	}

	&:hover {
		background-color: ${(props) => props.theme.gray};
	}
`;

