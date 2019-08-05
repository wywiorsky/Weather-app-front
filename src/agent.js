import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_URL;
const API_PHOTOS = 'https://api.pexels.com';



const tokenPlugin = req => {
  req.set('Authorization', `563492ad6f91700001000001a696d44a79244c57a05fc9a07801ad1c`);
}


const responseBody = res => res.body;


const weather = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
};

const photos = {
  get: url =>
    superagent.get(`${API_PHOTOS}${url}`).use(tokenPlugin).then(responseBody),
};


const Weather = {
  get: ({ lat, lng }) =>
    weather.get(`/api/weather?lat=${lat}&lng=${lng}`),
};

const Photos = {
  get: (location) =>
    photos.get(`/v1/search?query=${location}&per_page=1&page=1`),
};

const Stats = {
  get: () =>
    weather.get(`/api/stats`),
};

const History = {
  get: (page) =>
    weather.get(`/api/history?page=${page}`),
};

export default {
  Weather, Photos, Stats, History
};
