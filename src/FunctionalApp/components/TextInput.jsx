export const TextInput = ({ label, inputProps }) => {

return (
    <>
        {label && <label>{label}:</label>}
        <input 
            type="text"
            {...inputProps}
        />
    </>
);
}