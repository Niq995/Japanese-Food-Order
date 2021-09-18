
import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props){
    // validation on entered amount
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value; // string
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        // call 一个方法指针 不在这个里面 因为我们这里只有entered amount 没有id price
        props.onAddToCart(enteredAmountNumber);

    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: 1,
                }} />
            <button className={classes.button}>Add to Cart</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>



    );
}

export default MealItemForm;


