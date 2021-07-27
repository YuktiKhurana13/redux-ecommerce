import { createStore , applyMiddleware , compose , combineReducers } from "redux";
import thunk from 'redux-thunk';
import {productReducers} from './reducers/productReducers';
import logger from "redux-logger";

const initialState={};

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const Store=createStore(combineReducers({
    products:productReducers
}),
initialState,
composeEnhancer(applyMiddleware(thunk),applyMiddleware(logger)),
);

export default Store;