import { async } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';


const uri = 'https://api.github.com/graphql' // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));
  const token = "07a9beda7173d111da0268f232027e68c0d104a4";
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}`
    },
  }));
  return {
    link: ApolloLink.from([basic,auth, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}