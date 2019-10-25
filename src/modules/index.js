import { combineReducers } from "redux";
import list from "./list";
import genre from "./genre";
import keywod from "./keyword";

export default combineReducers({
    list,
    genre,
    keywod,
})