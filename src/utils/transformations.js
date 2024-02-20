export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const formatPhoneNumber = (value) => {
    if (value) {
        const totalCharacters = value.reduce((total, str) => total + str.length, 0);
        if (totalCharacters === 7){
            const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})$/;
            return value.join('').replace(regex, '$1-$2-$3-$4');
        }
    }
}