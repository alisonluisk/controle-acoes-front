import { Component } from "react";

class FormikComponent extends Component {
    change = (name, e) => {
      e.persist();
      this.props.handleChange(e);
      this.props.setFieldTouched(name, true, false);
    };

    changeNumber = (name, e) => {
      e.persist();
      this.props.setFieldValue(name, e.target.value.replace(/\D/g, ''), true);
      this.props.setFieldTouched(name, true, false);
    }

    blur = (name, e) => {
      this.props.setFieldTouched(name, true, true);
    };

    changeAutoComplete = (e, value, name) => {
      console.log(name, value?.codigo || "")
      this.props.setFieldValue(name, value?.codigo || "");
      this.props.setFieldTouched(name, true, false);
    };

}

export default FormikComponent;
