import axios from "axios"
import md5 from "md5"

const timeStamp = Number(new Date())
const publicKey = 'fa01007bef988d42fe49d7854dacedff'
const privateKey = '12dee85ce3fea1d79a2ede3bb5fa7a1d440e7fb5'
const hash = md5(timeStamp + privateKey + publicKey)
const limit = 100 // Max: 100

export const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params: {
        ts: timeStamp,
        apikey: publicKey,
        hash,
        limit
    }
})