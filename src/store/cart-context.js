import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},  // update context
    removeItem: (id) => {}, // update context
    clearCart: () => {},
});

export default CartContext;