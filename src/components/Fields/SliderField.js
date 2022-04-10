import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export const InputSlider = ({
        input,
        type,
        label,
        meta: { touched, error },
        ...custom
    }) => {
    const [value, setValue] = React.useState(1);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 250 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        step={1}
                        min={1}
                        max={10}
                        defaultValue = '1'
                        onChange={handleSliderChange}
                        sx={{
                            color: '#d32f2f',
                        }}
                        {...input}
                        {...custom}
                        type={type}
                    />
                </Grid>
                <Grid item>
                    <LocalFireDepartmentIcon color='error'/>
                </Grid>
            </Grid>
        </Box>
    );
}




