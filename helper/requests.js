import ApolloClient from "apollo-client";
import fetch from "node-fetch";
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import introspectionQueryResultData from './fragmentTypes.js'

import { onError } from 'apollo-link-error';


const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});
const cache = new InMemoryCache({fragmentMatcher});

function getHttpLink() {
    const env = process.env.NODE_ENV;  //命令行build项目传入（package.json中scripts中build脚本 build:weapp:dev: "NODE_ENV=qa taro build --type weapp"），或者直接指定
    const config = {
        development: 'https://dev.session.mobi/graphql',
        qa: 'https://qa.session.mobi/graphql',
        production: 'https://www.session.mobi/graphql'
    };
    return config[env] || config.development
}

const httpLink = new HttpLink({
    uri: getHttpLink(),
    headers: {
        "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTU4Njg0MTU0OCwiZXhwIjoyMTkxNjQxNTQ4fQ.BuXsQjSO6O2vZ_XaH3SzSShkgpD004jn21-EDMlBq2I"
    },
    fetch
});

export const client = new ApolloClient({
    cache: cache,
    link: httpLink,
});
