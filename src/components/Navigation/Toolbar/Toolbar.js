import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigation from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const toolbar =(props)=>(
 <header className={classes.Toolbar}>
     <DrawerToggle clicked={props.clicked}></DrawerToggle>
     <div className={classes.Logo}>
     <Logo/>
     </div>
     <nav className={classes.DesktopOnly}>
         <Navigation/>
         </nav>
     </header>
);

export default toolbar;

