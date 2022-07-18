import axios from 'axios'

// 创建axios实例
const request = axios.create({
    timeout: 15000
})

// post请求默认请求头
request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// request拦截器
request.interceptors.request.use(config => {
    // 如果后期需要添加token 可在此处统一添加请求头
    /*if (store.getters.token) {
        config.headers['Authorization'] = getToken()
    }*/
    return config
}, error => {
    console.log('err: ' + error)
    return Promise.reject(error)
})

// response拦截器
request.interceptors.response.use(
    response => {
        // code为非200时抛错
        const res = response.data
        if (res.code !== 200) {
            // 后期可优化为响应一个MessageBox
            window.alert(res.error)
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err: ' + error)
        return Promise.reject(error)
    }
)

export default request;
