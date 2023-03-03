import { createStore } from "redux";
import rootReducer from "./reducer";

//3.tao store
const store = createStore(rootReducer);
export default store;
