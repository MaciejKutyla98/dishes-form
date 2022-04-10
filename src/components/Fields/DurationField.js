import {ThemeProvider} from "@material-ui/styles";
import {tickerTheme} from "../../utils/TimeTickerTheme";
import {TimePicker} from "@material-ui/pickers";
import React from "react";

export const renderDurationField = ({
        input: { value, ...inputProps},
        meta: { touched, error},
        ...custom
    }) => {
    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date) : inputProps.onChange(null);
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

export const formatTime = (hh, mm, ss) => {
    let hours, minutes, seconds;
    if(hh < 10){
        hours = `0${hh}`
    } else {
        hours = hh;
    }
    if(mm < 10){
        minutes = `0${mm}`
    } else {
        minutes = mm;
    }
    if(ss < 10){
        seconds = `0${ss}`
    } else {
        seconds = ss;
    }
    return `${hours}:${minutes}:${seconds}`
}
