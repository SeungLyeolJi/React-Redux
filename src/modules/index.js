import { combineReducers } from "redux";
import list from "./list";
import search from "./search";

export default combineReducers({
    list,
    search,
})