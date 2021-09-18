
import React, {useRef} from 'react';
import classes from './Input.module.css';

// 使用React.forwardRef() 只是因为custom elements 不知道ref是什么 这边可以用了而已
const Input = React.forwardRef((props, ref) => {
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input 
                id={props.input.id}
                // type={props.type}>
                ref={ref}
                {...props.Input} /> {/*所有input的变量都穿进去 */}
            
        </div>
    );
});

export default Input;