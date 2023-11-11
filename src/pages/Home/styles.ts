import styled from "styled-components";

export const HomeContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;

	h2 {
		text-align: center;
		color: ${(props) => props.theme.primary};
	}
`;

export const QuizContainer = styled.div`
	width: min(100%, 30rem);

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;
