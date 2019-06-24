export const toDateTimeValue = (number) => {
	return number < 10 ? "0" + number : number;
};

export const formatDate = (dateString) => {
	const date = new Date(dateString);
	return `${toDateTimeValue(date.getDate())}.${toDateTimeValue(date.getMonth() + 1)}.${date.getFullYear()} - ${toDateTimeValue(date.getHours())}:${toDateTimeValue(date.getMinutes())}`;
};