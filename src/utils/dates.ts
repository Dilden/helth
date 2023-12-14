export const thePast= (theDate: Date): Boolean => {
    const oldDate: Number = new Date(theDate).setHours(0, 0, 0, 0);
    const currentDate: Number = new Date().setHours(0, 0, 0, 0);

    if (oldDate < currentDate) {
        return true;
    }
    return false;
};
