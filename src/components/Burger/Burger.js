import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformendIngredients = Object.keys(props.ingredients)
        .map(
            (igkey)=>{
                return [...Array(props.ingredients[igkey])].map((_,i)=>{
                    return <BurgerIngredient key={igkey+i} type={igkey}/>
                })
            }
        ).reduce((arr, el)=>{
            return arr.concat(el)
        },[])
    if(transformendIngredients.length === 0){
        transformendIngredients = <p>Please Start Adding Ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformendIngredients}
            <BurgerIngredient type="bread-buttom"/>
        </div>
    );
}

export default burger;
