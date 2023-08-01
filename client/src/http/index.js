import axios from "axios";

const $defaultHost = axios.create({
    baseURL: ''
})

const $host = axios.create({
    baseURL: ''
})
const authInterceptor = config => {
    config.headers.authorization = 'OAuth y0_AgAAAAAhJA1SAApFDgAAAADpIrtscLwwRUU2Sp-eWYC0geRQ3gMeppI'
    return config
}
$host.interceptors.request.use(authInterceptor)
export {
    $host,
    $defaultHost
}