export const thePast = (theDate: Date): Boolean => {
	const oldDate: Number = new Date(theDate).setHours(0, 0, 0, 0);
	const currentDate: Number = new Date().setHours(0, 0, 0, 0);

	if (oldDate < currentDate) {
		return true;
	}
	return false;
};

export const zeroHours = (newDate: Date = new Date()): EpochTimeStamp => {
	return newDate.setHours(0, 0, 0, 0);
};

export const toUtc = (newDate: Date = new Date()): EpochTimeStamp => {
	const temp = newDate.getTime();
	return new Date(temp).setHours(0, 0, 0, 0);
};

export const utcToHuman = (newDate: number): string => {
	const dateObj = new Date(newDate);
	return dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
};

export const dateToPicker = (val: Date = new Date()): string => {
	const month = val.getMonth() + 1;
	const day = val.getDate();

	return (
		val.getFullYear() +
		'-' +
		(month.toString().length === 1 ? '0' : '') +
		month.toString() +
		'-' +
		(day.toString().length === 1 ? '0' : '') +
		day.toString()
	);
};

export const addTimezoneOffset = (timestamp: number): number => {
	const checkDate = new Date(timestamp);

	// current timezone diff in min to ms
	let toAdd = checkDate.getTimezoneOffset() * 60000;

	// if (isDST() && !isDST(checkDate)) {
	// 	toAdd += 3600000; // 1 hr = 3600000 ms
	// }
	// if (!isDST() && isDST(checkDate)) {
	// 	toAdd -= 3600000; // 1 hr = 3600000 ms
	// }
	return timestamp + toAdd;
};

// check if DST
// https://stackoverflow.com/a/30280636/759563
export const isDST = (checkDate = new Date()): boolean => {
	const jan = new Date(checkDate.getFullYear(), 0, 1).getTimezoneOffset();
	const jul = new Date(checkDate.getFullYear(), 6, 1).getTimezoneOffset();
	return Math.max(jan, jul) !== checkDate.getTimezoneOffset();
};
