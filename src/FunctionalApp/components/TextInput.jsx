export const TextInput = ({ label, inputProps }) => {

return (
    <>
        {label && <label>{label}:</label>}
        <input 
            type="text"
            {...inputProps}
            //value={inputProps.value !== undefined ? inputProps.value : ''}
        />
    </>
);
}