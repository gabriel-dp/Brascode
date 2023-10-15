import { useState } from "react";

import { NavigatorContainer } from "./styles";

interface PageNavigatorI {
	length: number;
	max_per_page: number;
	interval: number;
}

export default function PageNavigator(props: PageNavigatorI): [number, () => JSX.Element] {
	const [page, setPage] = useState(1);

	const getMaxPage = () => {
		return Math.ceil(props.length / props.max_per_page);
	};

	const pageIncrement = () => {
		if (page < getMaxPage()) setPage(page + 1);
	};

	const pageDecrement = () => {
		if (page > 1) setPage(page - 1);
	};

	const handlePageButtonClick = (index: number) => {
		setPage(index);
	};

	// Generates a array with the page indexes based on the actual page and configs passed by props
	const generatePageInterval = (): number[] => {
		let initial = Math.max(1, page - props.interval);
		let final = Math.min(getMaxPage(), page + props.interval);
		if (page - props.interval < 1) {
			final = Math.min(getMaxPage(), final + Math.abs(1 - page - props.interval));
		} else if (page + props.interval > getMaxPage()) {
			initial = Math.max(1, initial - Math.abs(getMaxPage() - page - props.interval));
		}

		return Array.from({ length: final - initial + 1 }, (_, index) => initial + index);
	};

	function PageComponent() {
		// Hides Component if there is only one page to navigate
		if (generatePageInterval().length == 1) {
			return <></>;
		}

		return (
			<NavigatorContainer>
				<button className={page == 1 ? "navigator disabled" : "navigator"} onClick={pageDecrement}>
					{"<"}
				</button>
				{generatePageInterval().map((index) => (
					<button
						key={index}
						className={index == page ? "number actual" : "number"}
						onClick={() => handlePageButtonClick(index)}>
						{index}
					</button>
				))}
				<button className={page == getMaxPage() ? "navigator disabled" : "navigator"} onClick={pageIncrement}>
					{">"}
				</button>
			</NavigatorContainer>
		);
	}

	return [page, PageComponent];
}

