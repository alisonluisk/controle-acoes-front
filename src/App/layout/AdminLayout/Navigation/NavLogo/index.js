import React from 'react';
import DEMO  from './../../../../../store/constant';
import icone from "src/assets/images/bg-images/ibolsaIcone.png";

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <React.Fragment>
            <div className="navbar-brand header-logo">
                 <a href={DEMO.BLANK_LINK} className="b-brand">
                 <img
                    src={icone}
                    alt="Bem vindo"
                    width="50px"
                />
                    {/* <div className="b-bg">
                        <i className="feather icon-trending-up" />
                    </div> */}
                    <span className="b-title">iBolsa</span>
                 </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </React.Fragment>
    );
};

export default navLogo;
