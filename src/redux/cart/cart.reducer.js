import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'REMOVE_ITEM_FROM_CART':
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case 'CLEAR_ITEM_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    item => item.id !== action.payload.id
                )
            }
        case 'ADD_ITEM':
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case 'TOGGLE_CART_HIDDEN':
            return {
                ...state,
                hidden: !state.hidden
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}
export default cartReducer