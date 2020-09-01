import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import DEMO from "src/store/constant";
import 'src/App/layout/AdminLayout/Breadcrumb/breadcrumb.scss';
import IconButton from '@material-ui/core/IconButton';

class BreadcrumbForm extends Component {

    render () {
        const { title, idx, viewPath } = this.props;
        return (
          <React.Fragment>
            <div className="page-header">
              <div className="page-block">
                <Row className="align-items-center">
                  <Col md="11" xs="10">
                    <div className="page-header-title">
                        <h5 className="m-b-10">{title}</h5>
                    </div>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="feather icon-home" />
                        </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <a href={viewPath && viewPath.url ? viewPath.url : '/'}>
                            {viewPath && viewPath.title ? viewPath.title : 'View'}
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href={DEMO.BLANK_LINK}>{idx}</a>
                        </li>
                    </ul>
                  </Col>
                  <Col md="1" xs="2" className="text-align-right">
                      {this.props.buttons}
                      {
                      this.props.saveResource ? (
                          <IconButton 
                            color="primary" 
                            aria-label="upload picture" 
                            title="Salvar" 
                            component="span" 
                            type="submit"
                            onClick={this.props.saveResource}
                            disabled={this.props.disabled ? this.props.disabled : false }
                          >
                            <i className="feather icon-save" style={{fontSize: 20}}/>
                          </IconButton>
                      ) : []
                      }
                  </Col>
                </Row>
              </div>
            </div>
          </React.Fragment>
        );
    }
}

const styles = {
    root: {
        
    }
};

export default withStyles(styles)(BreadcrumbForm);
