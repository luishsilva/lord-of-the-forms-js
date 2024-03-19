import React, { Component } from "react";
import { TextInput } from "./TextInput"
import { validateNumericInput } from "../../utils/validations"

export class PhoneInput extends Component {

    state = {
        refs: [React.createRef(), React.createRef(), React.createRef(), React.createRef(),],
    }

    onPhoneChange = (index) => (e) => {
        const inputType = e.nativeEvent.inputType;
        const value = validateNumericInput(e.target.value);
        const lengths = [2, 2, 2, 1];
        const currentMaxLength = lengths[index];
        const nextRef = this.state.refs[index + 1];
        const prevRef = this.state.refs[index > 0 ? index - 1 : index];
        const shouldGoToNextRef = currentMaxLength === value.length;
        const shouldGoToPrevRef = value.length === 0;

        const newRefs = [...this.state.refs];
        newRefs[index].current.value = value.slice(0, currentMaxLength);
        // Update the state with the new array of refs
        this.setState({ refs: newRefs }, () => {
            // After updating state, get the phone value and call setStateMethod
            const phoneValue = this.state.refs.map((ref) => ref.current.value);
            this.props.updatePhoneState(phoneValue);
        });
        
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
    
    render () {

        return (
        <>
            <label htmlFor="phone">Phone:</label>
            <div id="phone-input-wrap">
                <TextInput 
                    value={this.state.refs[0].current?.value}
                    inputProps={{
                    id: "phone-input-0",
                    placeholder:"55",
                    name: "phone-input-0",
                    onChange: this.onPhoneChange(0),
                    ref: this.state.refs[0]
                    }}
                />
                -
                <TextInput 
                    value={this.state.refs[1].current?.value}
                    inputProps={{
                    id: "phone-input-1",
                    placeholder:"55",
                    name: "phone-input-1",
                    onChange: this.onPhoneChange(1),
                    ref: this.state.refs[1]
                    }}
                />
                -
                <TextInput 
                    value={this.state.refs[2].current?.value}
                    inputProps={{
                    id: "phone-input-2",
                    placeholder:"55",
                    name: "phone-input-2",
                    onChange: this.onPhoneChange(2),
                    ref: this.state.refs[2]
                    }}
                />
                -
                <TextInput 
                    value={this.state.refs[3].current?.value}
                    inputProps={{
                    id: "phone-input-3",
                    placeholder:"55",
                    name: "phone-input-3",
                    onChange: this.onPhoneChange(3),
                    ref: this.state.refs[3]
                    }}
                />
            </div>
        </>
    )}
}