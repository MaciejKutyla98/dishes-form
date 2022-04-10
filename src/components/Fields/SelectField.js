import SelectField from "material-ui/SelectField";
import React from "react";

export const renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
    }) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
    />
);

