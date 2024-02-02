export const TextInput = ({ label, inputProps }) => (
    <>
        {label && <label>{label}:</label>}
        <input 
            type="text"
            {...inputProps} 
        />
    </>
);