import React, { Component, Fragment } from 'react'
import { ApolloConsumer } from 'react-apollo';

import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { Mutation } from "react-apollo";

const CREATE_LINK = gql`
  mutation relayCreateLink($input: RelayCreateLinkInput!) {
    relayCreateLink(input: $input) {
		link {
			id
			url
			description
		}
    }
  }
`;

class AddLink extends Component {

    state = {
        url: '',
        description: ''
    }

    constructor() {
        super();
    }
    // onDogFetched = dog => this.setState(() => ({ dog }));

    render() {

        return (
            <Fragment>
                <input onBlur={({target: { value: url }}) => {
                    this.setState({url})
                }} />
                <input onBlur={({target: { value: description }}) => {
                    this.setState({description})
                }} />
                <Mutation mutation={CREATE_LINK}>
                    {(relayCreateLink, { data }) => (
                        <button
                            onClick={() => {
                                const { url, description } = this.state;
                                relayCreateLink({ variables: { input: {url, description} } })
                                this.setState({
                                    url: '',
                                    description: ''
                                })
                            }}>
                            Add link
                      </button>
                    )}
                </Mutation>
            </Fragment>
        )
    }
}


export default AddLink;