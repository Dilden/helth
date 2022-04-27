export const thePast = (theDate) => {
    const oldDate = new Date(theDate).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (oldDate < currentDate) {
        return true;
    }
    return false;
};
