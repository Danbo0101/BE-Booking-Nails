const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' USD';
}

export default formatPrice;