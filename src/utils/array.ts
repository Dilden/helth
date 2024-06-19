export const swap = (array: any[], indexA: number, indexB: number) => {
	[array[indexA], array[indexB]] = [array[indexB], array[indexA]];
	return array;
};
