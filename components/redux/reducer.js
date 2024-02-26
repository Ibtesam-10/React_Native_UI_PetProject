import { ADD, REMOVE } from "./constants";
const initialState=[];
 
export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD:
            return [
                ...state,
                action.data
            ]
            case REMOVE:
               let result = state.filter(item=>{
                return item.name!=action.data
             })
             return [...result] 
            default:
                return state
    }

}    