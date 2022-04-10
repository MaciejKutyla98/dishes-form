import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import validate from "../../validation/validate";
import styles from "./Form.module.scss";
import MenuItem from "material-ui/MenuItem";
import { Button } from "@mui/material";
import dishes from "../../assets/dishes.png";
import { renderTextField } from "../Fields/TextField";
import { formatTime, renderDurationField } from "../Fields/DurationField";
import { renderSelectField } from "../Fields/SelectField";
import { InputSlider } from "../Fields/SliderField";

const url = "https://frosty-wood-6558.getsandbox.com:443/dishes";

async function sendForm(url, data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

let Form = ({
                dishType,
                spicinessValue,
                handleSubmit,
                pristine,
                reset,
                submitting,
            }) => {
    if (spicinessValue === undefined) spicinessValue = 1;

    const submit = (values) => {
        if (dishType === "soup") {
            values.spiciness_scale = parseInt(spicinessValue);
        } else if (dishType === 'pizza') {
            values.no_of_slices= parseInt(values.no_of_slices)
            values.diameter= parseFloat(values.diameter)
        } else if (dishType === 'sandwich') {
            values.slices_of_bread= parseInt(values.slices_of_bread)
        }
        values.preparation_time = formatTime(
            values.preparation_time.getHours(),
            values.preparation_time.getMinutes(),
            values.preparation_time.getSeconds()
        );

        sendForm(url, {
            ...values,
        }).then(reset());
        console.log((`You submitted:\n\n${JSON.stringify(values, null, 2)}`))
    };
    return (
        <div className={styles.formContainer}>
            <div className={styles.imgContainer}>
                <img src={dishes} alt="male" className={styles.dishesImg} />
            </div>
            <form onSubmit={handleSubmit(submit)}>
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
                        <Field name="preparation_time" component={renderDurationField} />
                    </div>
                </div>
                <div>
                    <div className={styles.formField}>
                        <Field
                            name="type"
                            component={renderSelectField}
                            label="Choose dish type"
                        >
                            <MenuItem value="pizza" primaryText="Pizza" />
                            <MenuItem value="soup" primaryText="Soup" />
                            <MenuItem value="sandwich" primaryText="Sandwich" />
                        </Field>
                    </div>
                </div>
                {dishType === "pizza" && (
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
                    </div>
                )}
                {dishType === "soup" && (
                    <div className={styles.formField}>
                        <label className={styles.spicinessScale}>Spiciness scale:</label>
                        <div>
                            <Field name="spiciness_scale" component={InputSlider} />
                        </div>
                    </div>
                )}
                {dishType === "sandwich" && (
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
                    </div>
                )}
                <div className={styles.buttonsContainer}>
                    <div className={styles.formButton}>
                        <Button type="submit" disabled={submitting} variant="contained">
                            Submit
                        </Button>
                    </div>
                    <div className={styles.formButton}>
                        <Button
                            variant="outlined"
                            type="button"
                            disabled={pristine || submitting}
                            onClick={reset}
                        >
                            Clear Values
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

Form = reduxForm({
    form: "dishesForm",
    validate,
})(Form);

const selector = formValueSelector("dishesForm");
Form = connect((state) => ({
    dishType: selector(state, "type"),
    spicinessValue: selector(state, "spiciness_scale"),
}))(Form);

export default Form;
