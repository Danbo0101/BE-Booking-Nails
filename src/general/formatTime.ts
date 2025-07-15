const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const hourPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minPart = mins > 0 ? `${mins} min` : '';

    if (hourPart && minPart) {
        return `${hourPart} ${minPart}`;
    }

    return hourPart || minPart || '0 min';
}

export default formatTime;
