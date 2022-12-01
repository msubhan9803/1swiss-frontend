import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from 'redux/reducers/rootReducer.js';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['formReducer', 'subscriptionFormReducer']
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;