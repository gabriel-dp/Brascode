import { MdRectangle } from "react-icons/md";
import styled from "styled-components";

export const StatisticsContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	gap: 1rem;

	.title {
		font-size: 1.1rem;
		font-weight: bold;
	}
`;

interface CounterElementI {
	$iconColor?: string;
}

export const CounterElement = styled.div<CounterElementI>`
	width: 8rem;
	aspect-ratio: 1;
	padding: 0.75rem;
	border-radius: 1rem;
	border: 0.15rem solid ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primary};
	text-align: center;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;

	font-weight: bold;
	.data {
		font-size: 2rem;
	}

	.icon {
		color: ${(props) => props.$iconColor};
	}

	.title {
		font-size: 0.75rem;
	}
`;

export const Card = styled(MdRectangle)`
	transform: rotate(90deg);
`;

