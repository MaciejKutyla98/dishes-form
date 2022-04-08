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
    }
    if (!values.diameter) {
        errors.diameter = 'Required'
    }
    if (!values.spiciness_scale) {
        errors.spiciness_scale = 'Required'
    }
    if (!values.slices_of_bread) {
        errors.slices_of_bread = 'Required'
    }

    return errors
}

export default validate;