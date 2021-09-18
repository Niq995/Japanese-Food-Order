import React, {useContext} from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';


function HeaderCartButton(props){
    // 直接access CartContext object
    // 只要 CartContext 内容改变 这整个组件就会被re-evaluated
    const cartCtx = useContext(CartContext);

    // cartCtx.items.length 不行 因为我们还是想看的是sushi 3份 -》 一条就可以
    // reduce 是js的method                    function, starting value
    // curNumber 其实是accumulated number -> 里面的return会返回的值再存到curNumber 再进行下一个item
    const numOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber + item.amount
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>  
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;