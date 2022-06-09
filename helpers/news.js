import {articles_url, keywords, sortBy, _api_key } from "../private/rest_config.js";

//https://newsapi.org/v2/everything?q=%22US%20gasoline%22&apiKey=1a48fe2f7a854deb83660e6289a4df5c

export async function getArticles() {
    try {
        let articles = await fetch(`${articles_url}${keywords}${sortBy}`, {
            headers: {
                'X-API-KEY': _api_key
            }
        });
        
        let result = await articles.json();
        articles = null;

        return result.articles;
    } 
    catch(error) {
        throw error;
    }
}