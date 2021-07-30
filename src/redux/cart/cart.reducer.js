import CartActionTypes from "./cart.types";
import { addItemToCart,removeItemFromCart } from "./cart.utils";
const INTIAL_STATE={
    hidden:true,
    cartItems:[]
}

const cartReducer=(state=INTIAL_STATE,action)=>{
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{...state,hidden:!state.hidden}
            // you have return new object then only that components is render
        case CartActionTypes.ADD_ITEMS:
            return{
                ...state,
                cartItems:addItemToCart(state.cartItems,action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FORM_CART:
            return{
                ...state,
                cartItems:state.cartItems.filter((cartItem)=>cartItem.id !== action.payload.id )
            }
        case CartActionTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems:removeItemFromCart(state.cartItems,action.payload)
            }
        default:
            return state
    }
}

export default cartReducer