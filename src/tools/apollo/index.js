import React, { useContext } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError as OnError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { CTX } from '../context'

export default function apolloClient (props) {
  const context = useContext(CTX)
  const { token, _logout } = context

  // const urn = 'devcloud4.digihcs.com:14298/graphqllun3'
  const urn = 'devcloud4.digihcs.com:14308/graphqllun3'

  const httpLink = new HttpLink({
    uri: `http://${urn}`
  })

  const wsLink = new WebSocketLink({
    uri: `ws://${urn}`,
    options: {
      reconnect: true,
      connectionParams: () => ({
        'access-token': token || ''
      })
    }
  })

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
				definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const errorLink = new OnError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, code }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${code}`
        )
        if (code === 'UNAUTHENTICATED') {
          _logout()
        }
      })
    }
    if (networkError) {
      console.log(
        `[Network error ${operation.operationName}]: ${networkError.message}`
      )
    }
  })

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'access-token': token || ''
      }
    }
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, link]),
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
