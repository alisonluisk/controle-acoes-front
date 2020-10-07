import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import config from "../../../../config";
import navigation from "../../../../menu-items";
import DEMO from "../../../../store/constant";
import './breadcrumb.scss';

import IconButton from '@material-ui/core/IconButton';

class Breadcrumb extends Component {
  state = {
    main: [],
    item: [],
  };

  componentDidMount() {
    navigation.items.map((item, index) => {
      if (item.type && item.type === "group") {
        this.getCollapse(item, index);
      }
      return false;
    });
  }

  componentWillReceiveProps = () => {
    navigation.items.map((item, index) => {
      if (item.type && item.type === "group") {
        this.getCollapse(item);
      }
      return false;
    });
  };

  getCollapse = (item) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          this.getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === config.basename + collapse.url) {
            this.setState({ item: collapse, main: item });
          }
        }
        return false;
      });
    }
  };

  render() {
    let main, item;
    let breadcrumb = "";
    let title = "Bem-vindo";
    if (this.state.main && this.state.main.type === "collapse") {
      main = (
        <li className="breadcrumb-item">
          <a href={DEMO.BLANK_LINK}>{this.state.main.title}</a>
        </li>
      );
    }

    if (this.state.item && this.state.item.type === "item") {
      title = this.state.item.title;
      item = (
        <li className="breadcrumb-item">
          <a href={DEMO.BLANK_LINK}>{title}</a>
        </li>
      );

      if (this.state.item.breadcrumbs !== false) {
        breadcrumb = (
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
                    {main}
                    {item}
                  </ul>
                </Col>
                <Col md="1" xs="2" className="text-align-right">
                    {this.props.buttons}
                    {
                      this.props.newResource ? (
                        <IconButton color="primary" aria-label="upload picture" title="Novo cadastro" component="span" onClick={this.props.newResource}>
                          <i className="feather icon-plus-square" style={{fontSize: 20}}/>
                        </IconButton>
                      ) : []
                    }
                </Col>
              </Row>
            </div>
          </div>
        );
      }
    }

    document.title = 'iBolsa | ' + title;

    return <React.Fragment>{breadcrumb}</React.Fragment>;
  }
}

export default Breadcrumb;
