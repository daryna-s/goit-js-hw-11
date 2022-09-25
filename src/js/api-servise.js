import axios from 'axios';
const API_KEY = '30148618-cb32e0aec2d1b32c973ff6349';
const BASE_URL = 'https://pixabay.com/api/';
    
export default class NewsApiService {

    constructor() {
        this.searchQuery = ``;
        this.page = 1;
    }
    async fetchArticles() {
        const options = {
            method: 'get',
            url: BASE_URL,
            params: {
                key: API_KEY,
                q: `${this.searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: `${this.page}`,
                per_page: 40,
            },
        };
        try {
        const response = await axios(options);
  
        const data = response.data;
        
        this.incrementPage();
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}