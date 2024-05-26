import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Workflow from './components/Workflow';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/mimic-fi/v3-mainnet',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Workflow />
  </ApolloProvider>
);

export default App;
