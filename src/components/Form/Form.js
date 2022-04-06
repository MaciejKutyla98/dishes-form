import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

let  Form = (props) => {
    const {
        dishType,
        handleSubmit,
        pristine,
        reset,
        submitting
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Dish name:</label>
                <div>
                    <Field
                        name="name"
                        type="text"
                        placeholder="Dish name"
                        component="input"
                    />
                </div>
            </div>
            <div>
                <label>Preparation time:</label>
                <div>
                    <Field
                        name="preparation_time"
                        type="number"
                        placeholder="Preparation time"
                        component="input"
                    />
                </div>
            </div>
            <div>
                <label>Dish type</label>
                <div>
                    <Field name="type" component="select">
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
                        component="input"
                        type="number"
                        min="1"
                        placeholder="Number of slices"
                    />
                </div>
                <label>Diameter</label>
                <div>
                    <Field
                        name="diameter"
                        component="input"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Diameter"
                    />
                </div>
            </div>}
            {dishType === 'soup' &&
            <div>
                <label>Spiciness scale:</label>
                <div>
                    <Field
                        name="spiciness_scale "
                        component="input"
                        type="range"
                        placeholder="Spiciness scale"
                        min="1"
                        max="10"
                        step="1"
                    />
                </div>
            </div>}
            {dishType === 'sandwich' &&
            <div>
                <label>Slices of bread</label>
                <div>
                    <Field
                        name="slices_of_bread"
                        component="input"
                        type="number"
                        min="0"
                        placeholder="Number of slices"
                    />
                </div>
            </div>}
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    );
}

Form =  reduxForm({
    form: 'dishesForm'
})(Form);

const selector = formValueSelector('dishesForm');
Form = connect(state => {
    const dishType = selector(state, 'type');
    return {
      dishType
    };
})(Form)

export default Form;