import React, {Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log("[OrdeSummary] will update");
    }

render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igkey => {
        return  (<li key={igkey}>
            <span style={{textTransform: 'captilize'}}>{igkey}</span> : {this.props.ingredients[igkey]}
            </li>
            )
    });
    return (
        <Aux>
            <h3> Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Cost:{this.props.price}&#x20B9;</strong></p>
            <p>Continue to Checkout...</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}
}

export default OrderSummary;