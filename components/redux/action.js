import { ADD, REMOVE,USER_LIST } from "./constants";

export function add(item){
    return {
        type: ADD,
        data:item
    }
    
}

export function remove(item){
    return {    
        type: REMOVE,
        data:item
    }
    
}

export function getUserList(item){
    return {    
        type: USER_LIST,
        data:item
    }
    
}