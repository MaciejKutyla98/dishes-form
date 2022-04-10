import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TextField from "material-ui/TextField";
import {ThemeProvider} from "@material-ui/styles";
import {TimePicker} from "@material-ui/pickers";
import SelectField from "material-ui/SelectField";
import {Input, tickerTheme} from "../MuiThemes/TimeTickerTheme";

export const InputSlider = () => {
    const [value, setValue] = React.useState(5);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 1) {
            setValue(1);
        } else if (value > 10) {
            setValue(10);
        }
    };

    return (
        <Box sx={{ width: 250 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: 10,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        step={1}
                        min={1}
                        max={10}
                        onChange={handleSliderChange}
                        sx={{
                            color: '#d32f2f',
                        }}
                    />
                </Grid>
                <Grid item>
                    <LocalFireDepartmentIcon color='error'/>
                </Grid>
            </Grid>
        </Box>
    );
}

export const renderTextField = (
    { input, type, step, label, meta: { touched, error }, ...custom },
) => (
    <TextField
        type={type}
        step={step}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

export const renderDurationField = (
    { input: { value, ...inputProps}, meta: { touched, error}, ...custom}
) => {
    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
    };
    return (
        <ThemeProvider theme={tickerTheme}>
            <TimePicker
                ampm={false}
                openTo="hours"
                views={["hours", "minutes", "seconds"]}
                format="HH:mm:ss"
                label="Preparation time"
                value={value ? new Date(value) : null}
                initialFocusedDate={new Date(0, 0, 0, 0)}
                error={touched && error}
                onChange={onChange}
                {...custom}
            />
        </ThemeProvider>
    );
}

export const renderSelectField = (
    { input, label, meta: { touched, error }, children, ...custom },
) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
    />
);

