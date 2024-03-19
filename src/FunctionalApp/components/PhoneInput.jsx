import { useRef, useState } from "react";
import { TextInput } from "./TextInput"
import { validateNumericInput } from '../../utils/validations'

export const PhoneInput = ({ updatePhoneState }) => {
    const [stateRefs, setStateRefs] = useState({
        refs: [useRef(), useRef(), useRef(), useRef()]
    });

    const onPhoneChange = (index) => (e) => {
        const inputType = e.nativeEvent.inputType;
        const value = validateNumericInput(e.target.value);
        const lengths = [2, 2, 2, 1];
        const currentMaxLength = lengths[index];
        const nextRef = stateRefs.refs[index + 1];
        const prevRef = stateRefs.refs[index > 0 ? index - 1 : index];
        const shouldGoToNextRef = currentMaxLength === value.length;
        const shouldGoToPrevRef = value.length === 0;

        const newRefs = [...stateRefs.refs];
        newRefs[index].current.value = value.slice(0, currentMaxLength);
        setStateRefs(() => {
            return { refs: newRefs };
        });

        const phoneValue = stateRefs.refs.map((ref) => ref.current?.value);
        updatePhoneState('phone', phoneValue)

        if (shouldGoToNextRef) {
            if (nextRef !== undefined) {
            nextRef.current?.focus();
            }
        }

        if (shouldGoToPrevRef  && inputType === 'deleteContentBackward') {
            if (prevRef !== undefined) {
            prevRef.current?.focus();
            }
        }
    }
    
    return (
        <>
            <label htmlFor="phone">Phone:</label>
            <div id="phone-input-wrap">
                <TextInput 
                    value={stateRefs.refs[0].current?.value}
                    inputProps={{
                    id: "phone-input-0",
                    placeholder:"55",
                    name: "phone-input-0",
                    onChange: onPhoneChange(0),
                    ref: stateRefs.refs[0]
                    }}
                />
                -
                <TextInput 
                    value={stateRefs.refs[1].current?.value}
                    inputProps={{
                    id: "phone-input-1",
                    placeholder:"55",
                    name: "phone-input-1",
                    onChange: onPhoneChange(1),
                    ref: stateRefs.refs[1]
                    }}
                />
                -
                <TextInput 
                    value={stateRefs.refs[2].current?.value}
                    inputProps={{
                    id: "phone-input-2",
                    placeholder:"55",
                    name: "phone-input-2",
                    onChange: onPhoneChange(2),
                    ref: stateRefs.refs[2]
                    }}
                />
                -
                <TextInput 
                    value={stateRefs.refs[3].current?.value}
                    inputProps={{
                    id: "phone-input-3",
                    placeholder:"55",
                    name: "phone-input-3",
                    onChange: onPhoneChange(3),
                    ref: stateRefs.refs[3]
                    }}
                />
            </div>
        </>
    );
}