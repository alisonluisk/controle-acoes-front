import { Component } from "react";

class FormikComponent extends Component {
    change = (name, e) => {
      console.log(name)
      e.persist();
      this.props.handleChange(e);
      this.props.setFieldTouched(name, true, false);
    };

    blur = (name, e) => {
      this.props.setFieldTouched(name, true, true);
    };

    changeAutoComplete = (e, value, name) => {
      this.props.setFieldValue(name, value?.codigo || "");
      this.props.setFieldTouched(name, true, false);
    };

}

export default FormikComponent;
