import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './../../constants';
const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'//to manage cookies when using fetch()
    }),
    endpoints: (builder) => ({})
});

export {
    api
}