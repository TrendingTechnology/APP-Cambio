import axios  from "axios";
//https://economia.awesomeapi.com.br/json/

// > PARA BUSCAR TODAS AS MOEDAS DISPONIVEIS : ALL/EUR.....

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json/'   
})

export default api;