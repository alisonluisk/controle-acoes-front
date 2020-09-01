import React from 'react';
import Modal from "react-animated-modal";

class AnimatedModal extends React.Component {

    render() {
        return (
                <Modal
                    visible={this.props.showModal}
                    closemodal={this.props.modalClosed}
                    type={this.props.animation}
                >
                    {this.props.children}
                </Modal>
        );
    }
}

export default AnimatedModal;