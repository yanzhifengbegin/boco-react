import { TEST_1 } from "../actions/test/action-types";
import { handleAction } from "redux-actions";

const defaultState = {
  count: 1,
};

export default handleAction(
  TEST_1,
  (state, action) => {
    return {
      count: action.payload,
    };
  },
  defaultState
);
