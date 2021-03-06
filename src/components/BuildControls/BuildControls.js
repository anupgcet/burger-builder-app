import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Meat', type:'meat'}
];

const buildControls = (props) =>{
   return( 
   <div className={classes.BuildControls}>
     <p>Current Price : <strong>{props.price}&#x20B9; </strong></p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.addedIngredient(ctrl.type)}
            removed={() => props.removedIngredient(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            quantity={props.ingredients[ctrl.type]}
            ></BuildControl>
        ))}
        <button className={classes.OrderButton}
        onClick={props.ordered} 
        disabled={!props.purchasable}>Order Now</button>
    </div>)
}

export default buildControls;