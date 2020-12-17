const axios = require('axios').default

const apiClient = axios.create({
    baseURL: `http://localhost:8081/`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getRecommendations(city) {
        return apiClient.get(city)
    }
}