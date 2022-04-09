const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.preparation_time) {
        errors.preparation_time = 'Required'
    }

    if (values.type !== 'pizza' && values.type !== 'soup' && values.type !== 'sandwich') {
        errors.type = 'Required'
    }

    if (!values.no_of_slices) {
        errors.no_of_slices = 'Required'
    } else if (values.no_of_slices > 99) {
        errors.no_of_slices = "Oh! Too many slices..."
    } else if (values.no_of_slices < 0) {
        errors.no_of_slices = "The number of pieces must be positive."
    } 

    if (!values.diameter) {
        errors.diameter = 'Required'
    } else if (values.diameter > 60.0) {
        errors.diameter = "Oh! Too much bread..."
    } else if (values.diameter < 10.0 && values.diameter >= 0) {
        errors.diameter = "Pizza can not be that small"
    } else if (values.diameter < 0) {
        errors.diameter = "Diameter must be positive number"
    }

    if (!values.spiciness_scale) {
        errors.spiciness_scale = 'Required'
    }

    if (!values.slices_of_bread) {
        errors.slices_of_bread = 'Required'
    } else if (values.slices_of_bread > 99) {
        errors.slices_of_bread = "Oh! Too much bread..."
    } else if (values.slices_of_bread < 0) {
        errors.slices_of_bread = "The quantity of the bread may not be negative"
    }

    return errors
}

export default validate;