import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./Reducers/ProductReducers.js";
import { cartReducer } from "./Reducers/CartReducers.js";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : []

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    },
};

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
