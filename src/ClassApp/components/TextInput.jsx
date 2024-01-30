export const TextInput = ({ label, inputProps }) => (
    <div className="input-wrap">
        <label>{label}:</label>
        <input 
            type="text"
            {...inputProps} 
        />
    </div>
);