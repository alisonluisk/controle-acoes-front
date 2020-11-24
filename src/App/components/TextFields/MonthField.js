import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import MomentUtils from '@date-io/moment';

class MonthField extends Component {

    render() {
        const { classes, ...props } = this.props;
        return (
            <React.Fragment>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                        {...props}
                        views={["month", "year"]}
                        clearable="true" 
                        autoOk="true"
                        variant="inline"
                        invalidDateMessage="Data inválida"
                        minDateMessage="Data muito antiga"
                        format="MM/YYYY"
                        inputVariant="outlined"
                        size="small"
                        FormHelperTextProps={{
                            className: this.props.classes.helperText
                        }}
                        style={Object.assign(this.props.style ? this.props.style : {}, { paddingBottom: 15, paddingRight: 10 })}
                    />
                </MuiPickersUtilsProvider>
            </React.Fragment>
        );
    }
}

const styles = {
    helperText: {
        margin: '5px 5px 0px 5px',
        fontSize: 10,
        position: 'absolute',
        bottom: 0,
        right: 5,
    }
};

export default withStyles(styles)(MonthField);
