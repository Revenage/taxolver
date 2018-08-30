import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const URL = "http://localhost:8000/graphql/"
const TOKEN = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZXhwIjoxNTI1MDk0Mjk0LCJvcmlnX2lhdCI6MTUyNTA5Mzk5NH0.XloRqO3ogQKkg8as1B8Kv4aJv6ysrXsvRCsOSDvwgTA'

const httpLink = createHttpLink({
    uri: URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = TOKEN //localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token //? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();
