import React from 'react';

import mealsImage from '../../assets/meals4.jpeg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

function Header(props){
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Order Your Food</h1>
                {/* <button>Cart</button> */}
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food!'/>
            </div>
        </React.Fragment>
    );
}

export default Header;