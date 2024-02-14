export const capitalize = () => {
    // todo: build this function
    // `capitalize("jOn")` should output `"Jon"`
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