import axios from "axios"
import qs from "qs"

import * as config from "./config"

const axiosClient = axios.create({
    baseURL:config.REACT_URL_API,
    headers:{
        "content-type":"application/json",
    },
    withCredentials:true,
    paramsSerializer:params=>qs.stringify(params,{
        skipNulls: true, 
        allowDots: true,
    })
})


axiosClient.interceptors.request.use(async(config)=>{
    //handle token
    return config
})

axiosClient.interceptors.response.use((response)=>{
    if(response&&response.data){
        return response.data
    }  

    return response
},(error)=>{
     //handle error
    throw error
})


export default axiosClient