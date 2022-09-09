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
    // add csrftoken to header
    let cookies = document.cookie
    if (cookies !== undefined && cookies !== '') {
        let cookieArray = cookies.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            let keyValue = cookieArray[i];
            let keyValueArr = keyValue.split("=");
            if (keyValueArr.length > 1) {
                let key = keyValueArr[0].replace(" ", "");
                if ("csrftoken" === key) {
                    config.headers['X-CSRFToken'] = keyValueArr[1];
                    break;
                }
            }
        }
    }
    // 添加cda请求标识头
    config.headers['X-CDA-LOGIN-SIGN'] = true;
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
        let sign = response.headers['x-cda-redirect-login-sign'];
        if (sign !== undefined && sign === 'CDA') {
            let loginRedirectUrl = response.data.content;
            window.open(loginRedirectUrl, "_self" )
        } else {
            if (res.code !== '200') {
                // 后期可优化为响应一个MessageBox
                window.alert(res.error)
                return Promise.reject('error')
            } else {
                return response.data
            }
        }
    },
    error => {
        console.log('err: ' + error)
        return Promise.reject(error)
    }
)

export default request;
