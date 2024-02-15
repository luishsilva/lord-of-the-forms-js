import { Component } from "react";

export class TextInput extends Component {

  render() {
    const { label, inputProps } = this.props;

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
}
