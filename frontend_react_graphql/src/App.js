import 'bootstrap/dist/css/bootstrap.min.css';
import UserBox from './components/UserBox';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <UserBox />
    </ApolloProvider>
  );
}

export default App;
