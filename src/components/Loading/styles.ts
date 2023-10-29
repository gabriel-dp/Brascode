import { MdSportsSoccer } from "react-icons/md";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create a styled component for the loading spinner
export const Spinner = styled(MdSportsSoccer)`
	font-size: 2.5rem;
	color: ${(props) => props.theme.primary};
	animation: ${spin} 1.5s ease-in-out infinite;
	margin: auto;
`;

