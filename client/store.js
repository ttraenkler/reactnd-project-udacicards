import { createStore, combineReducers } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { reducer } from "./reducer";

const config = {
  key: "root",
  storage
};

const combinedReducers = combineReducers({ decks: reducer });
const reducers = persistReducer(config, combinedReducers);
export const store = createStore(reducers, devToolsEnhancer());
export const persistor = persistStore(store);

// const store = createStore(reducer, devToolsEnhancer());
