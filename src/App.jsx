import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import PlayerList from './components/PlayerList';
import AddPlayer from './components/addPlayer';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div className="App">
              <h1>Babryz Rocket League List</h1>
              <PlayerList />
              <AddPlayer />

          </div>
      </ApolloProvider>
    );
  }
  
}

export default App;
