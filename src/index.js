import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/api-servise';



const refs = getRefs();

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener(`submit`, onSearch);
// refs.loadMoreBtn.addEventListener(`click`, onLoadMore);

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (newsApiService.query === ``) {
        return alert(`Введите что-то нормальное`)
    }
    newsApiService.resetPage();
    clearGallery();
    newsApiService.fetchArticles().then(articles => {
        appendArticlesMarkup(articles);
        newsApiService.incrementPage();
    });
}


// function onLoadMore() {
//     newsApiService.fetchArticles().then(appendArticlesMarkup);
    
// }

function appendArticlesMarkup(articles) {
    // const markup = data.hits.map(articles => renderCard(articles)).join('');
    refs.galleryList.insertAdjacentHTML(`beforeend`, markup);
}

function clearGallery() {
    refs.galleryList.innerHTML = ``;
}

function getRefs() {
    return {
      searchForm: document.querySelector('#search-form'),
      galleryList: document.querySelector('.gallery'),
      loadmore: document.querySelector('#loadmore'),
    };
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`...`);
            newsApiService.fetchArticles().then(articles => {
              appendArticlesMarkup(articles);
              newsApiService.incrementPage();
            });
        }
    });
};

const options = {}

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.loadmore);