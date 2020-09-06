import axios from 'axios';

const URL = 'http://localhost:8000/api/'

const state = {
    articles: []
};

const getters = {
    allArticles: state => state.articles
};

const actions = {

}