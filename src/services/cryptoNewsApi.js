import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'cb5681aa47msh5dc55275cca4513p1334ebjsn0ae15d868479',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'

}

const baseUrl =  'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders  }) 


export  const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery : fetchBaseQuery({ baseUrl }),
  endpoints : (builder) => ({
    getCryptoNews : builder.query({
      query : ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    })
  })
});



export const { useGetCryptoNewsQuery } = cryptoNewsApi



/*const axios = require("axios");

const options = {
  method: 'GET',
  url: ,
  params: {textFormat: 'Raw', safeSearch: 'Off'},
  headers: {
    
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
}); */
