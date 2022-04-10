import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from "../../validation/validate";
import styles from './Form.module.scss'
import MenuItem from 'material-ui/MenuItem';
import {Button} from "@mui/material";
import {InputSlider, renderDurationField, renderSelectField, renderTextField} from "./Fields";
import dishes from '../../assets/dishes.png'

const submit = (values) => {
    console.log((`You submitted:\n\n${JSON.stringify(values, null, 2)}`))
}

let  Form = ({ dishType, handleSubmit, pristine, reset, submitting}) => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.imgContainer}>
                <img src={dishes} alt="male" className={styles.dishesImg}/>
            </div>
            <form onSubmit={handleSubmit(submit)} >
                <div>
                    <div className={styles.formField}>
                        <Field
                            name="name"
                            type="text"
                            component={renderTextField}
                            label="Dish name"
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.formField}>
                        <Field
                            name="preparation_time"
                            component={renderDurationField}
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.formField}>
                        <Field name="type" component={renderSelectField} label="Choose dish type">
                            <MenuItem value="pizza" primaryText="Pizza"/>
                            <MenuItem value="soup" primaryText="Soup"/>
                            <MenuItem value="sandwich" primaryText="Sandwich"/>
                        </Field>
                    </div>
                </div>
                {dishType === 'pizza' &&
                <div>
                    <div className={styles.formField}>
                        <Field
                            name="no_of_slices"
                            type="number"
                            step="1"
                            component={renderTextField}
                            label="Number of slices"
                        />
                    </div>
                    <div className={styles.formField}>
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
                <div className={styles.formField}>
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
                    <div className={styles.formField}>
                        <Field
                            name="slices_of_bread"
                            type="number"
                            step="1"
                            component={renderTextField}
                            label="Slices of bread"
                        />
                    </div>
                </div>}
                <div className={styles.buttonsContainer}>
                    <div className={styles.formButton}>
                        <Button type="submit" disabled={submitting} variant="contained" >
                            Submit
                        </Button>
                    </div>
                    <div className={styles.formButton}>
                        <Button variant="outlined" type="button" disabled={pristine || submitting} onClick={reset} >
                            Clear Values
                        </Button>
                    </div>
                </div>
            </form>
        </div>

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
