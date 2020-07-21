import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import test from "./test";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    // rest of other reducers
    test,
  });

export default createRootReducer;
