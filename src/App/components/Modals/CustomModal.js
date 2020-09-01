import React from "react";
import { Modal } from "@material-ui/core";
import { Card } from "react-bootstrap";
import { withStyles } from "@material-ui/styles";

class CustomModal extends React.Component {
  render() {
    let className = "theme-bg2 ";
    className += this.props.classes.header;
    return (
      <Modal
        animation={this.props.animation}
        open={this.props.open}
        {...this.props}
        disableBackdropClick={true}
        onClose={this.props.onClose}
        className={this.props.classes.modal}
      >
        <Card style={{ width: this.props.width }}>
          <Card.Header className={className}>
            {" "}
            <b>{this.props.title}</b>
            <i
              className="feather icon-x"
              style={{ cursor: "pointer", paddingTop: "5px" }}
              onClick={this.props.onClose}
            />
          </Card.Header>
          {this.props.children}
        </Card>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: "22px !important",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default withStyles(styles)(CustomModal);
