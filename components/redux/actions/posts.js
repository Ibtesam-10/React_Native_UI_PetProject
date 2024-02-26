import axios from "axios"
import { DELETE_POSTS, POSTS } from "../../config/url"
import { apiDelete, apiGet } from "../../utils/utils"

export function getPosts(data){
     return apiGet(POSTS)

}   

export function deletePosts(id){
    return apiDelete(DELETE_POSTS+'${id}')

}   