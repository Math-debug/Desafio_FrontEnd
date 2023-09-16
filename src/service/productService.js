import { server } from '../plugins/api'

const ENDPOINT = '/product'

export const findAll = ()=>{
    return server.get(ENDPOINT)
}

export const findById = (id)=>{
    return server.get(ENDPOINT + '/' + id)
}

export const removeById = (id)=>{
    return server.delete(ENDPOINT + '/' + id)
}

export const saveOrUpdate = (obj)=>{
    return server.post(ENDPOINT, obj)
}
