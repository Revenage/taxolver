import React from 'react'

import gql from "graphql-tag";
import { graphql, Query } from 'react-apollo';

const GET_LINKS = gql`
query LinksQuery {
  links {
    id
    url
    description
  }
}
`;

function List() {
    return (
        <Query query={GET_LINKS} pollInterval={500}>
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                
                return (
                    <ul>
                        {data.links.map(({ id, url }) => (
                            <li key={id}>{url}</li>
                        ))}
                    </ul>
                )
            }}
        </Query>
    )
  }

export default List;