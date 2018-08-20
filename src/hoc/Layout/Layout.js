import React, {Component} from 'react';

import Aux from '../Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }
    sideDrawerClose = () => {
        this.setState({showSideDrawer : false})
    }

    sideDrawerToggle = () => {
        this.setState((prevState) =>{
           return{showSideDrawer : !prevState.showSideDrawer};
        })
    }
    render(){
        return (
            <Aux>
               <Toolbar clicked={this.sideDrawerToggle}/>
               <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClose}/>
                 <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layout;