const isValidPhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    const cleaned = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
    if (cleaned.length !== 10) {
        return "Invalid phone number format";
    }
    else {
        const areaCode = cleaned.slice(0, 3);
        const centralOffice = cleaned.slice(3, 6);
        const lineNumber = cleaned.slice(6);

        return `(${areaCode}) ${centralOffice}-${lineNumber}`;
    }



}

export default isValidPhone;
