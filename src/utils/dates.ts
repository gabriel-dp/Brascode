export function formatDateToDDMMYYYY(strDate: string): string {
	const date = new Date(strDate);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString();

	return `${day}/${month}/${year}`;
}

export function calculateAge(strDate: string): number {
	const date = new Date(strDate);
	const birthYear = date.getFullYear();
	const birthMonth = date.getMonth();
	const birthDay = date.getDate();

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();

	let age = currentYear - birthYear;

	// Check if the birthday for the current year has occurred or not
	if (currentMonth < birthMonth || (currentMonth == birthMonth && currentDay < birthDay)) {
		age--;
	}

	return age;
}

