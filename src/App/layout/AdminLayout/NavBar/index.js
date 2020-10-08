import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import DEMO from "../../../../store/constant";
import * as actionTypes from "../../../../store/actions/Theme/theme.actions";
import icone from "src/assets/images/bg-images/ibolsaIcone.png";

class NavBar extends Component {
    render() {
        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }

        return (
            <React.Fragment>
                <header className={headerClass.join(' ')}>
                    <div className="m-header">
                        <a className={toggleClass.join(' ')} id="mobile-collapse1" href={DEMO.BLANK_LINK} onClick={this.props.onToggleNavigation}><span/></a>
                        <a href={DEMO.BLANK_LINK} className="b-brand">
                        <img
                    src={icone}
                    alt="Bem vindo"
                    width="50px"
                />
                            <span className="b-title">iBolsa</span>
                        </a>
                    </div>
                    <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}><i className="feather icon-more-horizontal"/></a>
                    <div className="collapse navbar-collapse">
                        <NavLeft/>
                        <NavRight rtlLayout={this.props.rtlLayout} />
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtlLayout: state.theme.rtlLayout,
        headerBackColor: state.theme.headerBackColor,
        headerFixedLayout: state.theme.headerFixedLayout,
        collapseMenu: state.theme.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);
