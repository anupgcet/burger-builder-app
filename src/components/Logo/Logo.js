import React from 'react';

import classes from './Logo.css';
import burgerlogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo} style={{height : props.height}}>
        <img src={burgerlogo} alt="MyBurger"/>
        </div>

)

export default logo;