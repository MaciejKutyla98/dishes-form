import Form from "./components/Form/Form";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {getMuiTheme} from "material-ui/styles";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.scss'

function App() {
  return (
    <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form />
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
