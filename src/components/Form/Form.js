import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from "../../validation/validate";
import styles from './Form.module.scss'
import TextField from 'material-ui/TextField';
import {TimePicker} from "@material-ui/pickers";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Button} from "@mui/material";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#1976d2',
            }
        },
        MuiButton: {
            textPrimary: {
                color:  '#1976d2',
            }
        },
        MuiPickersClockPointer: {
            thumb: {
                border: '14px solid #1976d2',
            },
            pointer: {
                backgroundColor: '#1976d2',
            }
        },
        MuiFormLabel: {
            root: {
                color: 'rgba(0, 0, 0, 0.30)',
                "&$focused": {
                    color: '#51d1e1',
                }
            },
        },
        MuiInput: {
            underline: {
                "&:after": {
                    borderBottom: '2px solid #51d1e1',
                },
                "&:before": {
                    borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)',
                }
            }
        },
        Mui: {
            focused: {
                color: '#51d1e1',
            }
        }
    },
});

const Input = styled(MuiInput)`
  width: 36px;
`;

function InputSlider() {
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

const renderTextField = (
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

const renderDurationField = (
    { input: { value, ...inputProps}, meta: { touched, error}, ...custom}
) => {

    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
    };
    return (
        <ThemeProvider theme={materialTheme}>
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

const renderSelectField = (
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


const submit = (values) => {
    console.log((`You submitted:\n\n${JSON.stringify(values, null, 2)}`))
}

let  Form = ({ dishType, handleSubmit, pristine, reset, submitting}) => {
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <div>
                    <Field
                        name="name"
                        type="text"
                        component={renderTextField}
                        label="Dish name"
                    />
                </div>
            </div>
            <div>
                <div>
                    <Field
                        name="preparation_time"
                        component={renderDurationField}
                    />
                </div>
            </div>
            <div>
                <div>
                    <Field name="type" component={renderSelectField} label="Choose dish type">
                        <MenuItem value="pizza" primaryText="Pizza"/>
                        <MenuItem value="soup" primaryText="Soup"/>
                        <MenuItem value="sandwich" primaryText="Sandwich"/>
                    </Field>
                </div>
            </div>
            {dishType === 'pizza' &&
            <div>
                <div>
                    <Field
                        name="no_of_slices"
                        type="number"
                        step="1"
                        component={renderTextField}
                        label="Number of slices"
                    />
                </div>
                <div>
                    <Field
                        name="diameter"
                        type="number"
                        step="0.1"
                        component={renderTextField}
                        label="Diameter"
                    />
                </div>
            </div>}
            {dishType === 'soup' &&
            <div>
                <label className={styles.spicinessScale}>Spiciness scale:</label>
                <div>
                    <Field
                        name="spiciness_scale "
                        component={InputSlider}
                    />
                </div>
            </div>}
            {dishType === 'sandwich' &&
            <div>
                <div>
                    <Field
                        name="slices_of_bread"
                        type="number"
                        step="1"
                        component={renderTextField}
                        label="Slices of bread"
                    />
                </div>
            </div>}
            <div>
                <Button type="submit" disabled={submitting} variant="contained" >
                    Submit
                </Button>
                <Button variant="outlined" type="button" disabled={pristine || submitting} onClick={reset} >
                    Clear Values
                </Button>
            </div>
        </form>
    );
}

Form =  reduxForm({
    form: 'dishesForm',
    validate
})(Form);

const selector = formValueSelector('dishesForm');
Form = connect(state => {
    const dishType = selector(state, 'type');
    return {
      dishType
    };
})(Form)

export default Form;

//#1976d2