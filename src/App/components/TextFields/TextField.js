import React, { Component } from "react";
import MaterialTextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

class TextField extends Component {

    render () {
        const { classes, ...props } = this.props;
        return (
            <React.Fragment>
                <MaterialTextField 
                    {...props}
                    variant="outlined"
                    size="small"
                    FormHelperTextProps={{
                        className: this.props.classes.helperText
                    }}
                    style={Object.assign(this.props.style ? this.props.style : {}, {paddingBottom: 15, paddingRight: 10})}
                />
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
        right: 5
    }
};

export default withStyles(styles)(TextField);
