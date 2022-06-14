import axios from 'axios';
import { news_api_key } from '../private/newsAPIkey';

const NewsServer = axios.create({ 
    baseURL: `https://newsapi.org/v2/everything?q=%22US%20gasoline%22&apiKey=${news_api_key}`,
}); 

NewsServer.interceptors.request.use(
    async (config) => {
        //sets header to get JSON data from News API
        config.headers.Accept = 'application/json';
        //console.log(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export const getNews = async (callback) => {
    const response = await NewsServer.get(
    //`q="US gasoline"&apiKey=${news_api_key}`
    );
    callback(response.data);
};

export default NewsServer;