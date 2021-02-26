import Axios from 'axios'

const BASE_IP = '192.168.31.152:8080'

export const WSclient = new WebSocket(`ws://${BASE_IP}/chat`);

export const AxiosInstance = Axios.create({
    baseURL: `http://` + BASE_IP,
})
