import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from "../../validation/validate";
import styles from './Form.module.scss'

const renderField = ({
    input,
    type,
    placeholder,
    min,
    max,
    step,
    meta: {touched, error }
}) => (
    <div>
        <div>
            <input
                {...input}
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
            />
            {touched &&
            ((error && <span className={styles.errorMsg}>{error}</span>))}
        </div>
    </div>
)

const renderSelectField = ({ input, meta: { touched, error }, children }) => (
    <div>
        <div>
            <select {...input}>
                {children}
            </select>
            {touched && error && <span className={styles.errorMsg}>{error}</span>}
        </div>
    </div>
)

const submit = (values) => {
    console.log((`You submitted:\n\n${JSON.stringify(values, null, 2)}`))
}
let  Form = (props) => {
    const {
        dishType,
        handleSubmit,
        pristine,
        reset,
        submitting
    } = props;

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label>Dish name:</label>
                <div>
                    <Field
                        name="name"
                        type="text"
                        placeholder="Dish name"
                        component={renderField}
                    />
                </div>
            </div>
            <div>
                <label>Preparation time:</label>
                <div>
                    <Field
                        name="preparation_time"
                        type="time"
                        step="1"
                        placeholder="Preparation time"
                        component={renderField}
                    />
                </div>
            </div>
            <div>
                <label>Dish type</label>
                <div>
                    <Field name="type" component={renderSelectField}>
                        <option />
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="sandwich">Sandwich</option>
                    </Field>
                </div>
            </div>
            {dishType === 'pizza' &&
            <div>
                <label>Number of slices:</label>
                <div>
                    <Field
                        name="no_of_slices"
                        type="number"
                        min="1"
                        placeholder="Number of slices"
                        component={renderField}
                    />
                </div>
                <label>Diameter</label>
                <div>
                    <Field
                        name="diameter"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Diameter"
                        component={renderField}
                    />
                </div>
            </div>}
            {dishType === 'soup' &&
            <div>
                <label>Spiciness scale:</label>
                <div>
                    <Field
                        name="spiciness_scale "
                        type="range"
                        placeholder="Spiciness scale"
                        min="1"
                        max="10"
                        step="1"
                        component={renderField}
                    />
                </div>
            </div>}
            {dishType === 'sandwich' &&
            <div>
                <label>Slices of bread</label>
                <div>
                    <Field
                        name="slices_of_bread"
                        type="number"
                        min="0"
                        placeholder="Number of slices"
                        component={renderField}
                    />
                </div>
            </div>}
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
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