import { SearchContainer, SearchInput } from "./styles";

interface SearchBarPropsI {
	placeholder: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searchbar(props: SearchBarPropsI) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setValue(event.target.value);
	};

	return (
		<SearchContainer>
			<SearchInput value={props.value} onChange={(event) => handleInputChange(event)} placeholder={props.placeholder} />
		</SearchContainer>
	);
}

