import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/api-servise';
// import LoadMoreBtn from './js/load-more-btn';


const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
// const loadMoreBtn = new LoadMoreBtn();
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener(`submit`, onSearch);
refs.loadMoreBtn.addEventListener(`click`, onLoadMore);

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (newsApiService.query === ``) {
        return alert(`Введите что-то нормальное`)
    }
    
        newsApiService.resetPage();
    newsApiService.fetchArticles().then(articles => {
        clearGallery();
        appendArticlesMarkup(articles);
    });
}


function onLoadMore() {
    newsApiService.fetchArticles().then(appendArticlesMarkup);
    
}

function appendArticlesMarkup(articles) {
    // const markup = data.hits.map(articles => renderCard(articles)).join('');
    refs.galleryList.insertAdjacentHTML(`beforeend`, markup);
}

function clearGallery() {
    refs.galleryList.innerHTML = ``;
}
