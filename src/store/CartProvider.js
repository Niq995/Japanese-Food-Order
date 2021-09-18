
import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

//               (old state snapshot, action is dispatched by me)
const cartReducer = (state, action) => {
    console.log("action ", action);
    console.log("state ", state);
    
    if(action.type === 'ADD'){
        // 可以直接将 新item 加到 array里面 但是我想要group same item together
        // 新建一个array .concat() 方法不会动原来的arrray 而是新建一个
        // action.item 里面有所有的item 信息 name amount price
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        // findIndex() 会给所有的state里面的都运行一下 return true 只有这个action里的item存在
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItem;
        let updatedItems;

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItem = action.item;
            updatedItems = state.items.concat(updatedItem);
        }

        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
    
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }
    // return new state 
    return defaultCartState;
}

function CartProvider(props){
    // [state snapshot, function to dispatch 传送 action to reducer]
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    
    const addItemToCartHandler = (item) =>{
        // 里面是一个action object 
        dispatchCartAction({
            type: 'ADD', // to identify action
            item: item,  // 把传入的item放到item这个object里面
        });
    }

    const removeItemToCartHandler = (id) =>{
        dispatchCartAction({
            type: 'REMOVE',
            id: id,
        });
    }

    const clearCartHandler = () =>{
        dispatchCartAction({
            type: 'CLEAR',
        });
    }
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler,
    }
   
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );  
}

export default CartProvider;