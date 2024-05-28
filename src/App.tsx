import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'
import View from "./components/View";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/mimic-fi/v3-mainnet',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <ChakraProvider>
      <View />
    </ChakraProvider>
  </ApolloProvider>
);

export default App;
