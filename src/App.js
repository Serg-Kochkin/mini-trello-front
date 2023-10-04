import View from "./components/View";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <View />
    </ApolloProvider>
  );
}

export default App;
