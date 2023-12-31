import { configureStore } from "@reduxjs/toolkit";//stores our reducers and state
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

//persist our store i.e to save the information
//avoid loging again and again when we refresh the page
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';//help us make asynchronous operations


//reducers
const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer, 
});

const persistConfig = {
    key: 'root',
    storage,
    blackList: [appApi.reducerPath]
};

//persist store
const persistedReducer = persistReducer(persistConfig, reducer);

//creating the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
})

export default store;