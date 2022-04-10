import TextField from "material-ui/TextField";
import React from "react";

export const renderTextField = ({
        input,
        type,
        step,
        label,
        meta: { touched, error },
        ...custom
    }) => (
    <TextField
        type={type}
        step={step}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />);