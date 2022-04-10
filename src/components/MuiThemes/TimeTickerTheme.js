import {createMuiTheme} from "@material-ui/core";
import {styled} from "@mui/material/styles";
import MuiInput from "@mui/material/Input";

export const tickerTheme = createMuiTheme({
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

export const Input = styled(MuiInput)`
  width: 36px;
`;