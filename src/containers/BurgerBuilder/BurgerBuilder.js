import React, {Component} from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { get } from 'https';

const INGREDIENT_PRICES = {
    salad : 5,
    cheese: 10,
    meat : 20,
    bacon: 15
}

class BurgerBuilder extends Component{
   state = {
        ingredients : null,
       totalPrice : 20,
       purchasable:false,
       purchasing:false,
       loading: false,
       error:false
   }
 componentDidMount(){
     axios.get('https://react-burger-project-ap.firebaseio.com/ingredients.json')
     .then(res => {
         this.setState({ingredients : res.data});
     })
     .catch(error=>{
         this.setState({error : true})
     })
 }
   purchaseHandler = () => {
       this.setState({purchasing: true});
   }
   purchaseCancel = ()=>{
    this.setState({purchasing: false});
   }

   purchaseContinue = () => {
      // alert("please select payment method");
  /*     this.setState({ loading: true});
      const order = {
          ingredients : this.state.ingredients,
          price: this.state.totalPrice,
          customer : {
              name : 'anup',
              adrress:{
                  HomeNo: 'A-303',
                  Flat : 'Krishna Mystiq'
              }
          }
      }
      axios.post('/orders.json', order)
      .then(response=>{
        this.setState({ loading: false, purchasing: false});
      })
      .catch(error =>{
        this.setState({ loading: false, purchasing: false});
      }); */
      const params = [];
      for(let param in this.state.ingredients){
          params.push(encodeURIComponent(param)+'='+encodeURIComponent(this.state.ingredients[param]))
      }

      const searchParam = params.join('&');
      this.props.history.push({
          pathname : '/checkout',
          search : '?'+searchParam
      });
      
   }

   updatePurchaseState = (updateIngredients) => {
       const ingredients = {
           ...updateIngredients
       }
       const sum = Object.keys(ingredients).map(igKey => {
           return ingredients[igKey];
       }).reduce((sum, elem)=>{
           return sum + elem;
       },0);
       this.setState({purchasable: sum>0})
   }
   addIngredient = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updateIngredients = {
           ...this.state.ingredients
       }
       updateIngredients[type] = updatedCount;
       const priceAdd = INGREDIENT_PRICES[type];
       const newPrice = this.state.totalPrice+priceAdd;
       this.setState({totalPrice: newPrice, ingredients: updateIngredients})
       this.updatePurchaseState(updateIngredients);
   }

   removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
        return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredients = {
        ...this.state.ingredients
    }
    updateIngredients[type] = updatedCount;
    const priceDed= INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDed;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    this.updatePurchaseState(updateIngredients);
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                    ingredients={this.state.ingredients}
                    addedIngredient={this.addIngredient}
                    removedIngredient={this.removeIngredient}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
                    </Aux>
            )

            orderSummary=<OrderSummary ingredients={this.state.ingredients} purchaseCancel={this.purchaseCancel}
            purchaseContinue={this.purchaseContinue}
            price={this.state.totalPrice}/>
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);