import { TextInput } from "./TextInput"

export const PhoneInput = ( {state, handlePhoneInputChange }) => (
    <>
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
            <TextInput 
                value={state.refs[0].current?.value}
                inputProps={{
                id: "phone-input-0",
                placeholder:"55",
                name: "phone-input-0",
                onChange: handlePhoneInputChange(0),
                ref: state.refs[0]
                }}
            />
            -
            <TextInput 
                value={state.refs[1].current?.value}
                inputProps={{
                id: "phone-input-1",
                placeholder:"55",
                name: "phone-input-1",
                onChange: handlePhoneInputChange(1),
                ref: state.refs[1]
                }}
            />
            -
            <TextInput 
                value={state.refs[2].current?.value}
                inputProps={{
                id: "phone-input-2",
                placeholder:"55",
                name: "phone-input-2",
                onChange: handlePhoneInputChange(2),
                ref: state.refs[2]
                }}
            />
            -
            <TextInput 
                value={state.refs[3].current?.value}
                inputProps={{
                id: "phone-input-3",
                placeholder:"55",
                name: "phone-input-3",
                onChange: handlePhoneInputChange(3),
                ref: state.refs[3]
                }}
            />
        </div>
    </>
)