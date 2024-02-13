export const capitalize = () => {
    // todo: build this function
    // `capitalize("jOn")` should output `"Jon"`
}

export const formatPhoneNumber = (value) => {
    // todo: build this function
    // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
    const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})$/;
    return value.replace(regex, '$1-$2-$3-$4');
}