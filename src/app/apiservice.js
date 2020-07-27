import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://financas-spring-api.herokuapp.com',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

class ApiService {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    post(url, objeto) {
        return httpClient.post(`${this.apiUrl}/${url}`, objeto);
    }

    put(url, objeto) {
        return httpClient.put(`${this.apiUrl}/${url}`, objeto);
    }

    delete(url) {
        return httpClient.delete(`${this.apiUrl}/${url}`);
    }

    get(url) {
        return httpClient.get(`${this.apiUrl}/${url}`);
    }
}

export default ApiService;