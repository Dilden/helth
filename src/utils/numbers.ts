export const toTwoDecimals = (toRound: number): number => {
	return Math.round(toRound * 100) / 100;
};
